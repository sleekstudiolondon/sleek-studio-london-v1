const MAP_OUTLINES = [
  "M112 132 L142 98 L188 76 L226 80 L254 94 L272 118 L264 146 L236 162 L214 184 L176 202 L142 194 L122 168 L96 150 Z",
  "M276 214 L298 230 L312 258 L304 296 L286 336 L262 384 L236 402 L220 374 L226 336 L238 300 L244 264 L256 230 Z",
  "M286 58 L322 48 L354 58 L348 82 L312 90 L282 76 Z",
  "M452 126 L480 108 L516 98 L552 108 L566 126 L552 144 L532 156 L530 178 L546 202 L544 244 L532 288 L512 326 L484 320 L468 286 L454 246 L438 214 L432 184 L440 152 Z",
  "M566 120 L600 108 L644 112 L688 106 L742 118 L792 142 L828 166 L820 192 L788 206 L760 220 L736 246 L700 252 L668 238 L632 220 L602 212 L582 184 L566 154 Z",
  "M768 332 L802 322 L834 332 L850 352 L842 376 L810 386 L778 378 L756 356 Z",
];

const MARKERS = [
  { city: "London", x: 50.6, y: 28.8 },
  { city: "Paris", x: 49.7, y: 30.1 },
  { city: "New York", x: 29.6, y: 33.8 },
  { city: "Los Angeles", x: 17.2, y: 37.8 },
  { city: "Miami", x: 28.5, y: 40.4 },
  { city: "Dubai", x: 62.4, y: 39.6 },
  { city: "Abu Dhabi", x: 61.4, y: 40.4 },
  { city: "Milan", x: 50.8, y: 31.6 },
  { city: "Rome", x: 51.9, y: 33.5 },
  { city: "Madrid", x: 47.1, y: 33.0 },
  { city: "Barcelona", x: 48.3, y: 32.6 },
  { city: "Berlin", x: 52.3, y: 28.9 },
  { city: "Amsterdam", x: 49.9, y: 28.4 },
  { city: "Geneva", x: 50.2, y: 31.2 },
  { city: "Zurich", x: 50.8, y: 30.5 },
  { city: "Monaco", x: 50.8, y: 33.1 },
  { city: "Vienna", x: 53.8, y: 30.1 },
  { city: "Stockholm", x: 53.1, y: 24.4 },
  { city: "Copenhagen", x: 51.8, y: 26.8 },
  { city: "Oslo", x: 50.7, y: 24.4 },
  { city: "Istanbul", x: 56.8, y: 34.0 },
  { city: "Doha", x: 60.0, y: 40.6 },
  { city: "Riyadh", x: 58.4, y: 42.6 },
  { city: "Singapore", x: 71.8, y: 56.0 },
  { city: "Hong Kong", x: 77.8, y: 45.5 },
  { city: "Tokyo", x: 84.5, y: 35.0 },
  { city: "Sydney", x: 88.0, y: 78.0 },
];

const MAP_FACTS = [
  { label: "Cities", value: "27" },
  { label: "Regions", value: "4" },
  { label: "Mode", value: "Calm coordination across time zones" },
];

export default function GlobalPresenceMap() {
  return (
    <div className="global-presence-panel">
      <div className="global-presence-head">
        <div className="global-presence-copy">
          <p className="global-presence-kicker">Global Presence</p>
          <h2 className="global-presence-title">A studio footprint shaped for an international market.</h2>
        </div>
        <p className="global-presence-lead">
          Active across Europe, North America, the Middle East, and Asia-Pacific with a measured, design-led point of
          view.
        </p>
      </div>

      <div className="global-presence-stage" role="img" aria-label="World map with selected cities across the studio network">
        <div className="global-presence-grid" aria-hidden="true" />
        <svg
          className="global-presence-map"
          viewBox="0 0 1000 520"
          aria-hidden="true"
          focusable="false"
        >
          {MAP_OUTLINES.map((path) => (
            <path key={path} d={path} className="global-presence-outline" />
          ))}
        </svg>

        <div className="global-presence-markers" aria-hidden="true">
          {MARKERS.map((marker) => (
            <span
              key={marker.city}
              className="global-presence-marker"
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            >
              <span className="global-presence-marker-dot" />
              <span className="global-presence-marker-label">{marker.city}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="global-presence-facts" aria-label="Global presence facts">
        {MAP_FACTS.map((fact) => (
          <div key={fact.label} className="global-presence-fact">
            <span className="global-presence-fact-label">{fact.label}</span>
            <strong className="global-presence-fact-value">{fact.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
