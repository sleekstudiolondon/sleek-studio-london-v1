import MaisonEnquiryForm from "../_components/MaisonEnquiryForm";
import MaisonPageIntro from "../_components/MaisonPageIntro";

export default function MaisonContactPage() {
  return (
    <>
      <MaisonPageIntro
        eyebrow="Private enquiries"
        title="Private Enquiries"
        intro="Begin a conversation. Tell us about the place, the life it will hold and what draws you to Maison Form."
        compact
      />
      <section className="mf-contact-layout">
        <aside>
          <p className="mf-eyebrow">A considered beginning</p>
          <h2>Private, from the first note.</h2>
          <p>
            Share only the details that feel useful. We use this fictional form to demonstrate the tone and structure of
            a private-client enquiry, not to collect information.
          </p>
          <div className="mf-contact-notes">
            <p>
              <span>01</span>
              A short introduction
            </p>
            <p>
              <span>02</span>
              A considered reply
            </p>
          </div>
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
          <p>Demonstration details only. Nothing entered here is transmitted or retained.</p>
        </aside>
        <MaisonEnquiryForm />
      </section>
    </>
  );
}
