import locationsData from '../../helpers/data/locationsData';
import util from '../../helpers/util';

import './locations.scss';

let locations = [];

const shootTimeClass = (shootTime) => {
  let selectedClass = '';
  switch (shootTime) {
    case 'Morning':
      selectedClass = 'bg-secondary';
      break;
    case 'Afternoon':
      selectedClass = 'bg-success';
      break;
    case 'Evening':
      selectedClass = 'bg-info';
      break;
    case 'After Dark':
      selectedClass = 'bg-danger';
      break;
    default:
      selectedClass = '';
  }
  return selectedClass;
};

const domStringBuilder = (locArray) => {
  let domString = '';
  domString += '<div class="row justify-content-center">';
  locArray.forEach((location) => {
    domString += `<div class="card-dark col-2 locationCard mt-3" id="${location.id}">`;
    domString += `    <div class="card-header ${shootTimeClass(location.shootTime)}">${location.name}</div>`;
    domString += `    <img src="${location.imageUrl}" class="card-img-top" alt="Picture of ${location.name}">`;
    domString += '  <div class="card-body border border-top-0">';
    domString += `    <p class="card-text">Adress: ${location.address}</p>`;
    domString += '  </div>';
    domString += '</div>';
  });
  domString += '</div>';
  util.printToDom('locations', domString);
};

const filterButtonEvent = (e) => {
  const buttonId = e.target.id;
  const darkLocations = locations.filter(x => x.shootTime === 'After Dark');
  const morningLocations = locations.filter(x => x.shootTime === 'Morning');
  const afternoonLocations = locations.filter(x => x.shootTime === 'Afternoon');
  const eveningLocations = locations.filter(x => x.shootTime === 'Evening');
  switch (buttonId) {
    case 'morning':
      domStringBuilder(morningLocations);
      break;
    case 'afternoon':
      domStringBuilder(afternoonLocations);
      break;
    case 'evening':
      domStringBuilder(eveningLocations);
      break;
    case 'dark':
      domStringBuilder(darkLocations);
      break;
    default:
      domStringBuilder(locations);
  }
};

document.getElementById('dark').addEventListener('click', filterButtonEvent);
document.getElementById('afternoon').addEventListener('click', filterButtonEvent);
document.getElementById('evening').addEventListener('click', filterButtonEvent);
document.getElementById('morning').addEventListener('click', filterButtonEvent);
document.getElementById('all').addEventListener('click', filterButtonEvent);


const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((resp) => {
      const locationResults = resp.data.locations;
      locations = locationResults;
      domStringBuilder(locations);
      document.getElementById('dark').addEventListener('click', filterButtonEvent);
      document.getElementById('afternoon').addEventListener('click', filterButtonEvent);
      document.getElementById('evening').addEventListener('click', filterButtonEvent);
      document.getElementById('morning').addEventListener('click', filterButtonEvent);
      document.getElementById('all').addEventListener('click', filterButtonEvent);
    })
    .catch(err => console.error(err));
};

export default { initializeLocations };
