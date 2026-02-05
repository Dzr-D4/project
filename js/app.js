const API_KEY = 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://www.omdbapi.com/';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const results = document.getElementById('results');
const statusText = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  results.innerHTML = '';
  statusText.textContent = 'Searching...';

  try {
    const movies = await searchMovies(query);
    if (movies.length === 0) {
      statusText.textContent = 'No results found.';
      return;
    }
    statusText.textContent = '';
    renderMovies(movies);
  } catch (err) {
    statusText.textContent = 'Something went wrong.';
  }
});

async function searchMovies(query) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
  const data = await res.json();
  return data.Search || [];
}

function renderMovies(movies) {
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'card';

    const poster =
      movie.Poster !== 'N/A'
        ? movie.Poster
        : 'https://via.placeholder.com/300x450?text=No+Image';

    card.innerHTML = `
      <img src="${poster}" alt="${movie.Title}">
      <div class="content">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      </div>
    `;

    results.appendChild(card);
  });
}
