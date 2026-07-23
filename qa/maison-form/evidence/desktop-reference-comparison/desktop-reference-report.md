# Maison Form Desktop Reference Comparison

Pixelmatch threshold: 0.08
Acceptance: whole-mode references gate on the effective whole-image ratio plus all layout-critical regions. Region-mode references gate on stable layout-critical regions while raw/effective whole-image ratios remain reported.
Masks are limited to canonical browser/capture artifacts: scrollbar gutters and baked-in mouse cursors.

| Reference | Mode | Raw Diff | Effective Diff | Gate | Result | Classification |
|---|---:|---:|---:|---:|---|---|
| 01-home__viewport-1363x936.jpg | regions | 0.205156 | 0.194511 | transparent home header over canonical hero image <= 0.1400<br>hero image and headline composition <= 0.2200<br>hero footer rule and metadata <= 0.1050 | PASS | browser rasterisation difference; genuine framework/platform constraint |
| 02-projects--filter-all__viewport-1363x936.jpg | whole | 0.029972 | 0.028883 | 0.0850 | PASS | browser rasterisation difference; genuine framework/platform constraint |
| 03-project-maison-rivoli__viewport-1363x936.jpg | regions | 0.115571 | 0.114604 | header/navigation band <= 0.0650<br>case metadata and title <= 0.1400<br>case hero image crop <= 0.1750 | PASS | browser rasterisation difference; genuine framework/platform constraint |
| 04-practice__viewport-1363x936.jpg | whole | 0.054509 | 0.053251 | 0.1050 | PASS | browser rasterisation difference; genuine framework/platform constraint |
| 05-about-us__viewport-1363x936.jpg | whole | 0.060865 | 0.059766 | 0.1100 | PASS | browser rasterisation difference; genuine framework/platform constraint |
| 06-journal__viewport-1363x936.jpg | whole | 0.057434 | 0.056003 | 0.1100 | PASS | browser rasterisation difference; genuine framework/platform constraint |
| 07-journal-material-memory__viewport-1363x936.jpg | regions | 0.093876 | 0.092400 | header/navigation band <= 0.0650<br>article header composition <= 0.1300<br>article image crop <= 0.1600 | PASS | browser rasterisation difference; genuine framework/platform constraint |
| 08-press__viewport-1363x936.jpg | whole | 0.052107 | 0.049996 | 0.0900 | PASS | browser rasterisation difference; genuine framework/platform constraint |
| 09-contact__viewport-1363x936.jpg | whole | 0.041788 | 0.039729 | 0.0900 | PASS | browser rasterisation difference; genuine framework/platform constraint |
| 10-home--menu-open-desktop__viewport-1363x936.jpg | regions | 0.039287 | 0.038767 | menu header band <= 0.0700<br>menu artwork crop <= 0.1800<br>menu navigation panel <= 0.1300 | PASS | browser rasterisation difference; genuine framework/platform constraint |
| 11-projects--filter-residential__viewport-1363x936.jpg | regions | 0.065699 | 0.063607 | header/navigation band <= 0.0650<br>filtered intro summary and controls <= 0.0950<br>filtered project result crop <= 0.1800 | PASS | browser rasterisation difference; genuine framework/platform constraint |
| 12-projects--filter-hospitality__viewport-1363x936.jpg | regions | 0.057817 | 0.054934 | header/navigation band <= 0.0650<br>filtered intro summary and controls <= 0.0950<br>filtered project result crop <= 0.1800 | PASS | browser rasterisation difference; genuine framework/platform constraint |
| 13-projects--filter-objects__viewport-1363x936.jpg | regions | 0.033261 | 0.030272 | header/navigation band <= 0.0650<br>filtered intro summary and controls <= 0.0950<br>objects empty-state message <= 0.1200 | PASS | browser rasterisation difference; genuine framework/platform constraint |
| 14-contact--success-state__viewport-1363x936.jpg | whole | 0.040919 | 0.034624 | 0.0900 | PASS | browser rasterisation difference; genuine framework/platform constraint |
