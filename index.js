'use strict';

const apiKey = 'KhhQuSRduhzdvAo748cyaPU9YA7ZxpwJWF3MMaF8';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params){
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson, maxResults){
  $('#results-list').empty();
  for(let i = 0; i< responseJson.data.length & i<maxResults; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].addresses[0].line1}</p>
      <p>${responseJson.data[i].addresses[0].line2}</p>
      <p>${responseJson.data[i].addresses[0].city}, 
      ${responseJson.data[i].addresses[0].stateCode} 
      ${responseJson.data[i].addresses[0].postalCode}</p>
      <p><a href="${responseJson.data[i].directionsInfo}">Directions</a>        <a href="${responseJson.data[i].url}">Go To Site</a></p>
      <img src='${responseJson.data[i].images[0].url}' alt='picture of National Park - no image available'>
      <p></p>
      <p>${responseJson.data[i].description}</p>
      </li>`
    );}
  $('#results').removeClass('hidden');
}
function getParks(query, maxResults) {
  const params = {
    stateCode: query,
    api_key: apiKey
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  console.log(url);

  // const options = {
  //   headers: new Headers({
  //     "X-Api-Key": apiKey})
  // };

  fetch(url)
    .then(response => { 
      if(response.ok){
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => { $('#js-error-message')
      .text(`Something went wrong: ${err.message}`);
    });
    
}

function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);