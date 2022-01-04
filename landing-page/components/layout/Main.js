import ExtrasSection from "./sections/ExtrasSection"
import FeedWidthSection from "./sections/FeedWidthSection"
import NavigationSection from "./sections/NavigationSection"

const Main = () => (
  <main className="flex flex-col p-2 space-y-4">
    <FeedWidthSection />
    <NavigationSection />
    <ExtrasSection />
  </main>
)

export default Main
