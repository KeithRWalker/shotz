import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';

import './movies.scss';
// import { callbackify } from 'util';

let movies = [];

const domStringBuilder = () => {
  let domString = '';
  movies.forEach((movie) => {
    domString += `<h3>${movie.name}</h3>`;
  });
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
