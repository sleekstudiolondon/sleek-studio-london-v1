import ProcessSimulatorClient from "./ProcessSimulatorClient";
import Reveal from "../../components/Reveal";

export default function ProcessPage() {
  return (
    <div className="simulator-page">
      <div className="simulator-page-inner">
        <Reveal>
          <ProcessSimulatorClient />
        </Reveal>
      </div>
    </div>
  );
}
