const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json')
};

const fetchCoordsByIP = function(body) {
  return request("https://api.freegeoip.app/json/" + JSON.parse(body).ip + "?apikey=a23006a0-53d2-11ec-a205-ef1b8c937131")
};

const fetchISSFlyOverTimes = function(body) {
  return request ('https://iss-pass.herokuapp.com/json/?lat=' + JSON.parse(body).latitude + '&lon=' + JSON.parse(body).longitude)
}

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response; 
    })
};

module.exports = {nextISSTimesForMyLocation}