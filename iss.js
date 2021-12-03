// iss.js
const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


const fetchCoordsByIp = function(ip, callback) {
  const data = "https://api.freegeoip.app/json/" + ip + "?apikey=a23006a0-53d2-11ec-a205-ef1b8c937131"
  request(data, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const latitude = JSON.parse(body).latitude;
    const longitude = JSON.parse(body).longitude;

    const obj = {latitude, longitude}

    callback(null, obj);
  });
}



 const fetchISSFlyOverTimes = function(coords, callback) {
  let data = 'https://iss-pass.herokuapp.com/json/?lat=' + coords.latitude + '&lon=' + coords.longitude
  request(data, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const timeSlot = JSON.parse(body).response;

    callback(null, timeSlot);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 


module.exports = {fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes,};