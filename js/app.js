const API_KEY = 'be6e31b1bc6dfaaab624b894c277db38';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

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
    statusText.textContent = 'Error fetching movies.';
  }
});

async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await res.json();
  return data.results;
}

function renderMovies(movies) {
  results.innerHTML = '';

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'card';

    const poster = movie.poster_path
      ? IMG_URL + movie.poster_path
      : 'https://via.placeholder.com/300x450?text=No+Image';

    const title = movie.title || 'Untitled';
    const year = movie.release_date
      ? movie.release_date.substring(0, 4)
      : 'N/A';

    card.innerHTML = `
      <img src="${poster}" alt="${title}">
      <div class="content">
        <h3>${title}</h3>
        <p>${year}</p>
      </div>
    `;

    results.appendChild(card);
  });
}
