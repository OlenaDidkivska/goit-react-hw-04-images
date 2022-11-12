import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29843828-e519b5089d649383ab6008921';

export async function fetchImageGallery(query, page) {
  const response = await axios.get(
    `${BASE_URL}/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  );
  return response.data;
}
