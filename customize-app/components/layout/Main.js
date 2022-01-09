import ExtrasSection from "./sections/ExtrasSection"
import FeedSection from "./sections/FeedSection"
import NavigationSection from "./sections/NavigationSection"

const Main = () => (
  <main className="flex flex-col p-2 space-y-4">
    <FeedSection />
    <NavigationSection />
    <ExtrasSection />
  </main>
)

export default Main
