import ExtrasSection from "./sections/ExtrasSection"
import TimelineSection from "./sections/TimelineSection"
import NavigationSection from "./sections/NavigationSection"

const Main = () => (
  <main className="flex flex-col p-2 space-y-4">
    <TimelineSection />
    <NavigationSection />
    <ExtrasSection />
  </main>
)

export default Main
