import Head from "../components/Head"
import Demo from "../components/sections/Demo"
import Footer from "../components/sections/Footer"
import Hero from "../components/sections/Hero"
import Install from "../components/sections/Install"

const IndexPage = () => (
  <>
    <Head />
    <main>
      <Hero />
      <Install />
      <Demo />
      <Footer />
    </main>
  </>
)

export default IndexPage
