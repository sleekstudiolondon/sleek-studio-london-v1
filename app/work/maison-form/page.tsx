import Link from "next/link";
import MaisonImage from "./_components/MaisonImage";
import MaisonTextLink from "./_components/MaisonTextLink";
import { principles, reelProjects } from "./_lib/content";
import { maisonRoutes } from "./_lib/routes";

function ReelCard({ project, duplicate = false }: { project: (typeof reelProjects)[number]; duplicate?: boolean }) {
  return (
    <Link
      href={maisonRoutes.projects}
      className="mf-reel-card"
      aria-hidden={duplicate}
      tabIndex={duplicate ? -1 : undefined}
    >
      <MaisonImage asset={project.asset} alt={duplicate ? "" : `${project.name} interior`} sizes="340px" />
      <span>{project.name}</span>
      <small>{project.place}</small>
    </Link>
  );
}

export default function MaisonFormHomePage() {
  return (
    <>
      <section className="mf-home-hero" aria-labelledby="mf-home-title">
        <MaisonImage
          asset="maison-hero.webp"
          alt="Sunlit double-height Paris townhouse interior."
          priority
          objectPosition="center 55%"
        />
        <div className="mf-home-hero-top">
          <span>Interior architecture</span>
          <span>London · Paris</span>
        </div>
        <div className="mf-home-hero-title">
          <p className="mf-eyebrow">Maison Form</p>
          <h1 id="mf-home-title">
            Rooms with a memory.
            <em>Spaces with a future.</em>
          </h1>
        </div>
        <div className="mf-home-hero-bottom">
          <span>Residential · Hospitality · Objects</span>
          <a href="#mf-practice-intro">Scroll to discover ↓</a>
        </div>
      </section>

      <section className="mf-reel" aria-label="Selected project reel">
        <div className="mf-reel-track">
          {reelProjects.map((project) => (
            <ReelCard key={project.name} project={project} />
          ))}
          {reelProjects.map((project) => (
            <ReelCard key={`${project.name}-duplicate`} project={project} duplicate />
          ))}
        </div>
      </section>

      <section id="mf-practice-intro" className="mf-indexed-section mf-practice-intro">
        <p className="mf-section-count">01 / 05</p>
        <p className="mf-eyebrow">The practice</p>
        <div className="mf-practice-copy">
          <h2>We shape interiors around the lives they will hold.</h2>
          <div>
            <p>
              Maison Form is an imagined interior architecture practice for residences, hotels and private spaces.
              Material, light and proportion are considered together—until a room feels inevitable.
            </p>
            <MaisonTextLink href={maisonRoutes.about}>Discover the studio</MaisonTextLink>
          </div>
        </div>
      </section>

      <section className="mf-selected-work">
        <div className="mf-section-heading-row">
          <div>
            <p className="mf-eyebrow">Selected work</p>
            <h2>
              Places of
              <em>lasting character.</em>
            </h2>
          </div>
          <MaisonTextLink href={maisonRoutes.projects}>View all projects</MaisonTextLink>
        </div>
        <Link className="mf-feature-project" href={maisonRoutes.maisonRivoli}>
          <MaisonImage asset="maison-coastal.webp" alt="Casa Levante Mediterranean living room." sizes="78vw" />
          <span className="mf-feature-control" aria-hidden="true">
            View project ↗
          </span>
          <span className="mf-feature-caption">
            <span>
              <small>01</small>
              <strong>Casa Levante</strong>
            </span>
            <span>
              Mallorca, Spain
              <br />
              Residential · 2026
            </span>
          </span>
        </Link>
      </section>

      <section className="mf-indexed-section mf-principles">
        <p className="mf-section-count">02 / 05</p>
        <div>
          <p className="mf-eyebrow">Our point of view</p>
          <h2>
            Luxury is not abundance.
            <em>It is discernment.</em>
          </h2>
        </div>
        <div className="mf-principles-list">
          {principles.map((principle) => (
            <article key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
            </article>
          ))}
        </div>
        <MaisonTextLink href={maisonRoutes.practice} className="mf-principles-link">
          Explore our approach
        </MaisonTextLink>
      </section>

      <section className="mf-journal-feature">
        <MaisonImage asset="maison-milan.webp" alt="Sage Milan dining room with aged ceiling fresco." sizes="55vw" />
        <div>
          <p className="mf-eyebrow">From the journal · 03 / 05</p>
          <h2>
            The beauty of
            <em>a living finish.</em>
          </h2>
          <p>Patina is not an imperfection. It is evidence that a room has entered into conversation with time.</p>
          <MaisonTextLink href={maisonRoutes.materialMemory}>Read the note</MaisonTextLink>
        </div>
      </section>
    </>
  );
}
