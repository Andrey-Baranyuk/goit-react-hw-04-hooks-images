export function fetchImages(page, query) {
  const API_KEY = '25701696-30308bd9fb1b902a571f50ce9';

  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => response.json());
}
