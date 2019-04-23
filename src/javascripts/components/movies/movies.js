import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';

import './movies.scss';
// import { callbackify } from 'util';

let movies = [];

const domStringBuilder = () => {
  let domString = '';
  domString += '<div class="row">';
  movies.forEach((movie) => {
    domString += `<div class="card-dark col-2" id="${movie.id}">`;
    domString += '  <div class="card-body border">';
    domString += `    <h5 class="card-title">${movie.name}</h5>`;
    domString += `    <h5 class="card-title text-muted">Release Date: ${movie.releaseDate}</h5>`;
    domString += `    <h6 class="card-subtitle">${movie.genre}</h6>`;
    domString += `    <p class="card-text">${movie.description}</p>`;
    domString += `    <div class="card-text"> ${movie.locations.length} </div>`;
    domString += '  </div>';
    domString += '</div>';
  });
  domString += '</div>';
  util.printToDom('movies', domString);
};

// Make Axios call
const initializeMovies = () => {
  moviesData.getMoviesData()
    .then((resp) => {
      const movieResults = resp.data.movies;
      movies = movieResults;
      domStringBuilder();
    })
    .catch(err => console.error(err));
};

export default { initializeMovies };
