// Foursquare API Info
const clientId = 'RKQ3RMUBKV2TVBDTWSIIR3QFHWQWYKSB4CBBFSHYU1VZ001T';
const clientSecret = 'LCPIDMZ43TTPP4N1KRKKWKXRWKFY0QMF1RWFZWA01UHQQV51';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// APIXU Info
const apiKey = '20b1fe1a84864a3492f15943193007';
const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';
//http://api.apixu.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7


// Page Elements   jQuery
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async() => {
  const city=$input.val();
  const urlToFetch=url+city+'&limit=10&client_id='+clientId+'&client_secret='+clientSecret+'&v=20190730';
  try{
    const response= await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse= await response.json();
      //console.log(jsonResponse);
      const venues= jsonResponse.response.groups[0].items.map(item=>item.venue);
      //console.log(venues);
      return venues;
      //console.log(venues);
      //console.log(response);      
    }
    else{
      throw new Error('Request failed!');
    }
  }
  catch(error){
    console.log(error.message);
  }
  

}

const getForecast = async() => {
  try{
    const city=$input.val();
    const urlToFetch= forecastUrl+apiKey+'&q='+city+'&days=4&hour=11';
    const response= await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse= await response.json();
      //console.log(jsonResponse);
      const days= jsonResponse.forecast.forecastday;
      //console.log(days);
      return days;
      
    }
    else{
      throw new Error('Request failed!');
    }
    
  }
  catch(error){
    console.log(error.message)
  }
  

}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue= venues[index];
    const venueIcon= venue.categories[0].icon;
    const venueImgSrc= venueIcon.prefix+'bg_64'+venueIcon.suffix;
    // helpers.js is linked to index.html, so we can use helpers.js in main.js ? don't we need to module.exports and request from helpers.js?
    let venueContent = createVenueHTML(venue.name,venue.location,venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (days) => {
  $weatherDivs.forEach(($day, index) => {
    // Add your code here:
    const currentDay= days[index];
    let weatherContent = createWeatherHTML(currentDay);
    $day.append(weatherContent);
  });
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues=>renderVenues(venues));
  getForecast().then(days=>renderForecast(days));
  return false;
}

$submit.click(executeSearch);
