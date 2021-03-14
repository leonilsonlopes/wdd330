export function getJSON(url) {
  return fetch("https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT")
      .then(function(response) {
          if (!response.ok) {
              throw Error(response.statusText);
          } else {
			  console.log("response: " + JSON.stringify(response));
              return response.json();
          }
      })
      .catch(function(error) {
          console.log(error);
      });
}

export const getLocation = function(options) {
  return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};
