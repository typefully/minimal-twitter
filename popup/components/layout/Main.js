import InterfaceSection from "./sections/InterfaceSection"
import TimelineSection from "./sections/TimelineSection"
import NavigationSection from "./sections/NavigationSection"

const Main = () => (
  <main className="flex flex-col p-2 gap-y-4">
    <TimelineSection />
    <NavigationSection />
    <InterfaceSection />
  </main>
)

export default Main
