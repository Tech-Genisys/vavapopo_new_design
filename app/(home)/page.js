import ExclusiveSection from "./components/homepage/ExclusiveSection";
import HashTagSection from "./components/homepage/HashTagSection";
import PlanSection from "./components/homepage/PlanSection";
import Aboutsection from "./components/homepage/aboutsection";
import Footersection from "./components/homepage/footersection";
import Fullpageimagesection from "./components/homepage/fullpageimage";
import Herosection from "./components/homepage/herosection";
import ReviewRapingDiv from "./components/homepage/ReviewSection";

export default function Home() {
  return (
    <div>
      <Herosection />
      <Aboutsection />
      <Fullpageimagesection />
      <ExclusiveSection />
      <HashTagSection />
      <ReviewRapingDiv />
      <PlanSection />
      <Footersection />
    </div>
  );
}
