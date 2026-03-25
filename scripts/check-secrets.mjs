import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const mode = process.argv.includes("--staged") ? "staged" : "all";
const providedFiles = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
const blockedEnvFile = /(^|\/)\.env($|\.)/i;
const allowedEnvFile = /(^|\/)\.env\.example$/i;
const resendKeyPattern = /\bre_[A-Za-z0-9_]{20,}\b/;
const hardcodedSecretPattern = /\b(api[_-]?key|secret|token)\b\s*[:=]\s*["'][^"'$\r\n]{12,}["']/i;
const resendEnvAssignmentPattern = /^RESEND_API_KEY\s*=\s*(?!your_resend_api_key_here$).+/m;
const skippedDirs = new Set([".git", ".next", "dist", "node_modules", "out"]);

function collectRepoFiles(rootDir) {
  const entries = readdirSync(rootDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (skippedDirs.has(entry.name)) continue;

    const absolutePath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectRepoFiles(absolutePath));
      continue;
    }

    files.push(absolutePath);
  }

  return files;
}

function getFilesToInspect() {
  if (mode === "staged") {
    return providedFiles.map((filePath) => path.resolve(filePath));
  }

  return collectRepoFiles(process.cwd());
}

function inspectFile(filePath) {
  const normalizedPath = path.relative(process.cwd(), filePath).replace(/\\/g, "/");

  if (blockedEnvFile.test(normalizedPath) && !allowedEnvFile.test(normalizedPath)) {
    if (mode === "staged") {
      return `Refusing to commit env file: ${normalizedPath}`;
    }
    return null;
  }

  let content;
  try {
    const stats = statSync(filePath);
    if (!stats.isFile()) return null;
    content = readFileSync(filePath, "utf8");
  } catch {
    return null;
  }

  if (allowedEnvFile.test(normalizedPath) && resendEnvAssignmentPattern.test(content)) {
    return `${normalizedPath} must keep placeholder-only values`;
  }

  if (resendKeyPattern.test(content)) {
    return `Likely Resend key detected in ${normalizedPath}`;
  }

  if (hardcodedSecretPattern.test(content)) {
    return `Likely hardcoded secret detected in ${normalizedPath}`;
  }

  return null;
}

const files = getFilesToInspect();
const failures = files
  .map((filePath) => inspectFile(filePath))
  .filter(Boolean);

if (failures.length > 0) {
  console.error("Secret scan failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Secret scan passed.");
