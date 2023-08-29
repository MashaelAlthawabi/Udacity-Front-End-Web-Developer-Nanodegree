// Creating a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// The URL to retrieve weather information from his API (country : US)
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Personal API Key for OpenWeatherMap API
const key = ',&appid=7208fde39c3812c2bdec7465aafc6754&units=metric';

// showing the error to the user
const error = document.getElementById('error');

// getData

const getData = () => {
  //get value after click on the button
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  // getWeatherData return promise
  getWeatherData(zip).then((data) => {
    //making sure from the received data to execute rest of the steps
    if (data) {
      const {
        main: { temp },
        name: city,
        weather: [{ description }],
      } = data;

      const info = {
        newDate,
        city,
        temp,
        feelings,
      };

      postData('/add', info);

      updateUI();
      document.getElementById('card').style.opacity = 1;
    }
  });
};

// Event listener to add function to existing HTML DOM element
// Function called by event listener
document.getElementById('generate').addEventListener('click', getData);

//Function to GET Web API Data
const getWeatherData = async (zip) => {
  try {
    const res = await fetch(baseURL + zip + key);
    const data = await res.json();

    if (data.cod != 200) {
      // display the error message
      error.innerHTML = data.message;
      setTimeout((_) => (error.innerHTML = ''), 2000);
      throw `${data.message}`;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Function to POST data
const postData = async (url = '', info = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  });

  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};

//Function to GET Project Data and updating UI
const updateUI = async () => {
  const res = await fetch('/all');
  try {
    const savedData = await res.json();
    document.getElementById('date').innerHTML = savedData.newDate;
    document.getElementById('city').innerHTML = savedData.city;
    document.getElementById('temp').innerHTML = savedData.temp + '&degC';
    document.getElementById('content').innerHTML = savedData.feelings;
  } catch (error) {
    console.log(error);
  }
};
