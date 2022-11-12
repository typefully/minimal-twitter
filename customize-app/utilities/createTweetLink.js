export default function createTweetShareLink(tweet) {
  const url = new URL("https://twitter.com/intent/tweet")
  url.searchParams.set("text", tweet.text)
  url.searchParams.set("url", tweet.url)
  return url.toString()
}
