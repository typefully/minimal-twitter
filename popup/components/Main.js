import AdvancedSection from "./sections/AdvancedSection";
import ExtensionStatus from "./sections/ExtensionStatus";
import InterfaceSection from "./sections/InterfaceSection";
import NavigationSection from "./sections/NavigationSection";
import TimelineSection from "./sections/TimelineSection";
import TypefullySection from "./sections/TypefullySection";

const Main = () => (
  <main className="flex flex-col p-2 gap-y-4">
    <ExtensionStatus />
    <TimelineSection />
    <NavigationSection />
    <InterfaceSection />
    <TypefullySection />
    <AdvancedSection />
  </main>
);

export default Main;
