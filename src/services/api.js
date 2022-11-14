import axios from 'axios';
// import { transformResponseData } from '../helpers/transformResponseData';

axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY = '29843828-e519b5089d649383ab6008921';

export async function fetchImageGallery(query, page, signal) {
  const response = await axios.get(
    `/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`,
    { signal }
  );
  return response.data;
}
