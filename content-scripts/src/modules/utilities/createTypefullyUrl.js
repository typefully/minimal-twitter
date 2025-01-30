export const createTypefullyUrl = (extraParams) => {
  const params = {
    ref: "minimal-twitter",
    utm_source: "minimal-twitter-extension",
    ...extraParams,
  };

  const url = new URL("https://typefully.com/");
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
};
