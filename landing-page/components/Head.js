import NextHead from "next/head"

const Head = () => (
  <NextHead>
    <title>Minimal Theme for Twitter</title>
    <meta name="title" content="Minimal Theme for Twitter" />
    <meta name="description" content="Declutter your Twitter web experience." />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`https://www.wang.sh/minimal-twitter/`} />
    <meta property="og:title" content="Minimal Theme for Twitter" />
    <meta
      property="og:description"
      content="Declutter your Twitter web experience."
    />
    <meta
      property="og:image"
      content="https://wang.sh/minimal-twitter/OG.jpg"
    />
    <meta property="twitter:card" content="summary_large_image" />
    <meta
      property="twitter:url"
      content="https://www.wang.sh/minimal-twitter/"
    />
    <meta property="twitter:title" content="Minimal Theme for Twitter" />
    <meta
      property="twitter:description"
      content="Declutter your Twitter web experience."
    />
    <meta
      property="twitter:image"
      content="https://wang.sh/minimal-twitter/OG.jpg"
    />
    <link
      rel="shortcut icon"
      type="image/png"
      href="./favicon-32x32.png"
      sizes="32x32"
    />
    <link
      rel="shortcut icon"
      type="image/png"
      href="./favicon-16x16.png"
      sizes="16x16"
    />
    <link rel="icon" href="./favicon.ico" />
  </NextHead>
)

export default Head
