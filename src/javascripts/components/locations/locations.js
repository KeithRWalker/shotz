import locationsData from '../../helpers/data/locationsData';
import util from '../../helpers/util';

import './locations.scss';

let locations = [];

const domStringBuilder = () => {
  let domString = '';
  domString += '<div class="row">';
  locations.forEach((location) => {
    domString += `<div class="card-dark col-2 locationCard" id="${location.id}">`;
    domString += '  <div class="card-body border">';
    domString += `    <div class="card-header">${location.name}</div>`;
    domString += `    <img src="${location.imageUrl}" class="card-img-top" alt="Picture of ${location.name}">`;
    domString += `    <p class="card-text">Adress: ${location.address}</p>`;
    domString += '  </div>';
    domString += '</div>';
  });
  domString += '</div>';
  util.printToDom('locations', domString);
};

// Make Axios call
const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((resp) => {
      const locationResults = resp.data.locations;
      locations = locationResults;
      domStringBuilder();
    })
    .catch(err => console.error(err));
};

export default { initializeLocations };
