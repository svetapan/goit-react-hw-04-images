const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34629216-4eae0037697c673c1b9060fc5';

const getImages = async (searchText, page = 1, perPage = 12) => {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${searchText}&page=${page}&per_page=${perPage}&key=${API_KEY}&image_type=photo&orientation=horizontal`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch images: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Failed to fetch images: ${error.message}`);
  }
};

export default getImages;
