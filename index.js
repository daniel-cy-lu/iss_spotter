// index.js

// The code below is temporary and can be commented out.
const { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes,} = require('./iss');


nextISSTimesForMyLocation(
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    console.log('It worked! Returned IP:' , ip);
    
    fetchCoordsByIp(ip, (error, result) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
      console.log('It worked! Returned lat and alt:' , result);
  
      fetchISSFlyOverTimes(result, (error, timeSlot) => {
        if (error) {
          console.log("It didn't work!" , error);
          return;
        }
        console.log('It worked! Returned lat and alt:' , timeSlot);
      })
    });
  })
)





