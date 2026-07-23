import MaisonEnquiryForm from "../_components/MaisonEnquiryForm";
import MaisonPageIntro from "../_components/MaisonPageIntro";

export default function MaisonContactPage() {
  return (
    <>
      <MaisonPageIntro
        eyebrow="Private enquiries"
        title={
          <>
            <span>Begin a</span>
            <em>conversation.</em>
          </>
        }
        intro="Tell us about the place, the life it will hold and what draws you to Maison Form."
      />
      <section className="mf-contact-layout">
        <aside>
          <p className="mf-eyebrow">Studio</p>
          <p>
            London · Paris
            <br />
            By appointment
          </p>
          <p>
            studio@example.com
            <br />
            +44 (0)20 0000 0000
          </p>
          <p>Demonstration details only.</p>
        </aside>
        <MaisonEnquiryForm />
      </section>
    </>
  );
}
