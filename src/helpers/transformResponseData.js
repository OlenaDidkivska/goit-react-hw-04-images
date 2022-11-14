export const transformResponseData = data => {
  return data.map(img => {
    const { id, largeImageURL, webformatURL, tags } = img;
    return {
      id,
      largeImageURL,
      webformatURL,
      tags,
    };
  });
};
