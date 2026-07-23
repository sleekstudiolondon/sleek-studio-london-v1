import Link from "next/link";
import MaisonImage from "../_components/MaisonImage";
import MaisonPageIntro from "../_components/MaisonPageIntro";
import MaisonTextLink from "../_components/MaisonTextLink";
import { journalEntries } from "../_lib/content";

export default function MaisonJournalPage() {
  return (
    <>
      <MaisonPageIntro
        eyebrow="Journal"
        title={
          <>
            <span>Notes on</span>
            <em>rooms and objects.</em>
          </>
        }
        intro="Material studies, conversations and observations from the imagined Maison Form studio."
        compact
      />
      <section className="mf-journal-grid">
        {journalEntries.map((entry) => (
          <article key={entry.ordinal} className={entry.lead ? "is-lead" : ""}>
            <Link href={entry.href} aria-label={`Read ${entry.title}`}>
              <MaisonImage asset={entry.asset} alt={`${entry.title} image.`} sizes={entry.lead ? "94vw" : "48vw"} />
            </Link>
            <p className="mf-eyebrow">
              {entry.category} · {entry.ordinal}
            </p>
            <h2>
              <Link href={entry.href}>{entry.title}</Link>
            </h2>
            <p>{entry.summary}</p>
            <MaisonTextLink href={entry.href}>Read note</MaisonTextLink>
          </article>
        ))}
      </section>
    </>
  );
}
