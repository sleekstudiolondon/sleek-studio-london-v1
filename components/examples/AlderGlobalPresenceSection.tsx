type CityMarker = {
  anchor?: "end" | "start";
  city: string;
  dx?: number;
  dy?: number;
  x: number;
  y: number;
};

const CITIES: CityMarker[] = [
  { city: "Los Angeles", x: 188, y: 282, dx: 14, dy: -12 },
  { city: "New York", x: 324, y: 248, dx: 14, dy: -12 },
  { city: "Miami", x: 338, y: 314, dx: 14, dy: 18 },
  { city: "London", x: 764, y: 194, dx: 12, dy: -14 },
  { city: "Paris", x: 790, y: 218, dx: 12, dy: 18 },
  { city: "Amsterdam", x: 799, y: 196, dx: 12, dy: -12 },
  { city: "Monaco", x: 826, y: 246, dx: 12, dy: 18 },
  { city: "Geneva", x: 820, y: 232, dx: 12, dy: -12 },
  { city: "Zurich", x: 832, y: 226, dx: 12, dy: -12 },
  { city: "Milan", x: 842, y: 244, dx: 12, dy: 18 },
  { city: "Barcelona", x: 786, y: 252, dx: -12, dy: 20, anchor: "end" },
  { city: "Madrid", x: 760, y: 258, dx: -12, dy: 18, anchor: "end" },
  { city: "Berlin", x: 834, y: 204, dx: 12, dy: -12 },
  { city: "Copenhagen", x: 828, y: 174, dx: 12, dy: -12 },
  { city: "Stockholm", x: 858, y: 148, dx: 12, dy: -12 },
  { city: "Oslo", x: 820, y: 154, dx: -12, dy: -12, anchor: "end" },
  { city: "Vienna", x: 862, y: 218, dx: 12, dy: 18 },
  { city: "Rome", x: 850, y: 268, dx: 12, dy: 20 },
  { city: "Istanbul", x: 930, y: 244, dx: 12, dy: 18 },
  { city: "Riyadh", x: 1016, y: 310, dx: 12, dy: 20 },
  { city: "Doha", x: 1052, y: 304, dx: 12, dy: -12 },
  { city: "Dubai", x: 1074, y: 292, dx: 12, dy: 18 },
  { city: "Abu Dhabi", x: 1066, y: 306, dx: 12, dy: 22 },
  { city: "Singapore", x: 1214, y: 430, dx: 12, dy: 18 },
  { city: "Hong Kong", x: 1274, y: 346, dx: 12, dy: -12 },
  { city: "Tokyo", x: 1380, y: 272, dx: -12, dy: -12, anchor: "end" },
  { city: "Sydney", x: 1370, y: 576, dx: -12, dy: 20, anchor: "end" },
];

const CONNECTIONS = [
  ["New York", "London"],
  ["London", "Dubai"],
  ["London", "Milan"],
  ["Dubai", "Singapore"],
  ["Singapore", "Tokyo"],
  ["Dubai", "Sydney"],
];

const HUB_CITIES = new Set(["New York", "London", "Dubai", "Singapore", "Tokyo"]);

const METRICS = [
  { label: "Cities", value: "27" },
  { label: "Regions", value: "4" },
  { label: "Since", value: "2017" },
  { label: "Scope", value: "Residential + Boutique Commercial" },
];

const CITY_MAP = new Map(CITIES.map((city) => [city.city, city] as const));

const connectionPath = (fromCity: string, toCity: string) => {
  const from = CITY_MAP.get(fromCity);
  const to = CITY_MAP.get(toCity);

  if (!from || !to) {
    return "";
  }

  const midpointX = (from.x + to.x) / 2;
  const midpointY = Math.min(from.y, to.y) - Math.max(46, Math.abs(to.x - from.x) * 0.08);

  return `M ${from.x} ${from.y} Q ${midpointX} ${midpointY} ${to.x} ${to.y}`;
};

export default function AlderGlobalPresenceSection() {
  return (
    <div className="alder-global-map-shell">
      <div className="alder-global-map-stage">
        <svg
          className="alder-global-map-svg"
          viewBox="0 0 1600 760"
          role="img"
          aria-labelledby="alder-global-map-title alder-global-map-desc"
        >
          <title id="alder-global-map-title">Studio Alder global presence map</title>
          <desc id="alder-global-map-desc">
            A refined world map showing Studio Alder&apos;s footprint across Europe, the Middle East, North America,
            and Asia Pacific.
          </desc>

          <defs>
            <linearGradient id="alderGlobalMapBackground" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#062f05" />
              <stop offset="48%" stopColor="#052c05" />
              <stop offset="100%" stopColor="#031f03" />
            </linearGradient>
            <radialGradient id="alderGlowEurope" cx="52%" cy="30%" r="30%">
              <stop offset="0%" stopColor="rgba(214, 225, 204, 0.2)" />
              <stop offset="100%" stopColor="rgba(214, 225, 204, 0)" />
            </radialGradient>
            <radialGradient id="alderGlowMiddleEast" cx="67%" cy="42%" r="24%">
              <stop offset="0%" stopColor="rgba(205, 194, 152, 0.16)" />
              <stop offset="100%" stopColor="rgba(205, 194, 152, 0)" />
            </radialGradient>
            <radialGradient id="alderGlowAsia" cx="83%" cy="42%" r="22%">
              <stop offset="0%" stopColor="rgba(214, 225, 204, 0.12)" />
              <stop offset="100%" stopColor="rgba(214, 225, 204, 0)" />
            </radialGradient>
            <pattern id="alderMapGrid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(220, 229, 212, 0.045)" strokeWidth="1" />
            </pattern>
            <filter id="alderMarkerGlow" x="-160%" y="-160%" width="420%" height="420%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="0" y="0" width="1600" height="760" fill="url(#alderGlobalMapBackground)" />
          <rect x="0" y="0" width="1600" height="760" fill="url(#alderMapGrid)" />

          <g className="alder-global-map-depth">
            <circle cx="832" cy="226" r="238" fill="url(#alderGlowEurope)" />
            <circle cx="1064" cy="304" r="194" fill="url(#alderGlowMiddleEast)" />
            <circle cx="1288" cy="360" r="176" fill="url(#alderGlowAsia)" />
          </g>

          <g className="alder-global-map-coordinates" aria-hidden="true">
            <path d="M 78 170 H 1522" />
            <path d="M 78 258 H 1522" />
            <path d="M 78 346 H 1522" />
            <path d="M 78 434 H 1522" />
            <path d="M 78 522 H 1522" />
            <path d="M 78 610 H 1522" />
            <path d="M 188 98 V 662" />
            <path d="M 368 98 V 662" />
            <path d="M 548 98 V 662" />
            <path d="M 728 98 V 662" />
            <path d="M 908 98 V 662" />
            <path d="M 1088 98 V 662" />
            <path d="M 1268 98 V 662" />
            <path d="M 1448 98 V 662" />
          </g>

          <g className="alder-global-map-landmasses" aria-hidden="true">
            <path
              d="M96 228C136 173 222 128 315 118C385 110 445 126 477 163C501 191 495 224 462 243C429 261 394 263 362 276C323 293 303 323 266 337C223 353 174 349 140 329C107 309 83 274 96 228Z"
            />
            <path d="M304 346C346 360 381 399 396 446C408 484 403 533 385 575C372 607 347 631 326 631C305 631 291 608 289 574C286 541 296 508 289 475C281 439 260 398 268 365C273 349 286 340 304 346Z" />
            <path d="M730 176C765 154 816 149 862 159C899 168 925 186 930 210C935 233 912 246 883 250C849 255 819 251 790 256C761 261 738 276 716 267C695 257 696 225 730 176Z" />
            <path
              d="M812 181C868 146 953 136 1038 146C1120 156 1193 178 1229 208C1253 227 1253 253 1234 275C1214 299 1178 307 1150 321C1127 334 1119 360 1096 373C1070 388 1028 387 987 378C944 368 901 364 868 343C835 321 813 291 807 253C802 224 796 193 812 181Z"
            />
            <path d="M1193 322C1223 304 1262 300 1300 306C1332 312 1360 329 1372 354C1384 378 1375 402 1351 418C1327 433 1291 436 1258 431C1222 426 1194 410 1182 387C1170 366 1170 339 1193 322Z" />
            <path d="M1250 518C1287 491 1341 483 1388 493C1430 502 1460 526 1464 554C1467 580 1441 603 1402 615C1361 627 1312 626 1272 613C1234 601 1206 577 1208 553C1209 540 1221 530 1250 518Z" />
          </g>

          <g className="alder-global-map-network" aria-hidden="true">
            {CONNECTIONS.map(([from, to]) => (
              <path key={`${from}-${to}`} d={connectionPath(from, to)} />
            ))}
          </g>

          <g className="alder-global-map-clusters" aria-hidden="true">
            <circle className="alder-global-map-cluster alder-global-map-cluster-europe" cx="826" cy="218" r="58" />
            <circle className="alder-global-map-cluster alder-global-map-cluster-america" cx="318" cy="252" r="34" />
            <circle className="alder-global-map-cluster alder-global-map-cluster-middle-east" cx="1058" cy="300" r="36" />
            <circle className="alder-global-map-cluster alder-global-map-cluster-asia" cx="1268" cy="352" r="38" />
          </g>

          <g className="alder-global-map-markers">
            {CITIES.map((city) => (
              <g
                key={city.city}
                className={`alder-global-map-city ${HUB_CITIES.has(city.city) ? "alder-global-map-city-hub" : ""}`.trim()}
                transform={`translate(${city.x} ${city.y})`}
                tabIndex={0}
              >
                <circle className="alder-global-map-city-halo" r="15" filter="url(#alderMarkerGlow)" />
                <circle className="alder-global-map-city-ring" r="6.4" />
                <circle className="alder-global-map-city-dot" r="2.6" />
                <text
                  className="alder-global-map-city-label"
                  x={city.dx ?? 12}
                  y={city.dy ?? -12}
                  textAnchor={city.anchor ?? "start"}
                >
                  {city.city}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>

      <div className="alder-global-map-band" aria-label="Studio Alder footprint metrics">
        {METRICS.map((metric) => (
          <div
            key={metric.label}
            className={`alder-global-map-band-item ${metric.label === "Scope" ? "alder-global-map-band-item-wide" : ""}`.trim()}
          >
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
