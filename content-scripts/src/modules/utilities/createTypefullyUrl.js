export const createTypefullyUrl = (extraParams, pathname) => {
  const params = {
    ref: "minimal-twitter",
    utm_source: "minimal-twitter-extension",
    ...extraParams,
  };

  const url = new URL(`https://typefully.com/${pathname || ""}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
};

export const createTypefullyMediaDownloadUrl = (extraParams, downloadType) => {
  return createTypefullyUrl(extraParams, `tools/twitter-${downloadType}-downloader`);
};
