const link =
  "http://api.weatherstack.com/current?access_key=bc0ca4a5746b3050d146c21349be3284";

const root = document.getElementById("root");

const popup = document.getElementById("popup");
const textInput = document.getElementById("text-input");
const form = document.getElementById("form");
const closePopup = document.getElementById("close");

let store = {
  city: "Kiev",
  country: "Ukraine",
  feelslike: 0,
  temperature: 0,
  observationTime: "00:00 AM",
  localTime: {},
  isDay: "yes",
  description: 0,
  properties: {
    cloudcover: {},
    humidity: {},
    windSpeed: {},
    visibility: {},
    pressure: {},
    uvIndex: {},
  },
};
// console.log(store);
const fetchData = async () => {
  try {
    const query = localStorage.getItem("query") || store.city;
    const result = await fetch(`${link}&query=${query}`);
    const data = await result.json();

    const {
      current: {
        cloudcover,
        temperature,
        humidity,
        observation_time: observationTime,
        pressure,
        uv_index: uvIndex,
        visibility,
        is_day: isDay,
        weather_descriptions: description,
        wind_speed: windSpeed,
      },
      location: { country, name, localtime: localTime },
    } = data;

    // console.log(data);
    store = {
      ...store,
      isDay,
      country,
      city: name,
      temperature,
      observationTime,
      localtime: localTime,
      description: description[0],
      properties: {
        cloudcover: {
          title: "cloudcover",
          value: `${cloudcover}%`,
          icon: "cloud.png",
        },
        humidity: {
          title: "humidity",
          value: `${humidity}%`,
          icon: "humidity.png",
        },
        windSpeed: {
          title: "windSpeed",
          value: `${windSpeed}m/s`,
          icon: "wind.png",
        },
        pressure: {
          title: "pressure",
          value: `${pressure} %`,
          icon: "gauge.png",
        },
        uvIndex: {
          title: "uvIndex",
          value: `${uvIndex} / 100`,
          icon: "uv-index.png",
        },
        visibility: {
          title: "visibility",
          value: `${visibility}%`,
          icon: "visibility.png",
        },
      },
    };

    renderComponent();
  } catch (error) {
    console.log(error.message);
  }
};

const getImage = (description) => {
  const value = description.toLowerCase();

  switch (value) {
    case "partly cloudy":
      return "partly.png";
    case "cloud":
      return "cloud.png";
    case "fog":
      return "fog.png";
    case "sunny":
      return "sunny.png";

    default:
      return "the.png";
  }
};

const renderProperty = (properties) => {
  return Object.values(properties)
    .map(({ title, value, icon }) => {
      return `<div class='property'>
    <div class='property-icon'>
      <img src='./img/icons/${icon}' alt=''>
    </div>
    <div class='property-info'>
      <div class='property-info__value'>${value}</div>
      <div class='property-info__description'>${title}</div>
    </div>
  </div>`;
    })
    .join("");
};

const markup = () => {
  const {
    country,
    city,
    description,
    observationTime,
    temperature,
    isDay,
    properties,
    localtime,
  } = store;
  const containerClass = isDay === "yes" ? "is-day" : "";

  return `<div class='container ${containerClass}'>
        <div class='top'>
        <div class='city'>
            <div class='city-subtitle'>Weather Today in</div>
            <div class='city-title' id='city'>
            <span class=country-title'>${country}:</span>
            <span>${city}</span>
            <p class="city-info__date">${localtime}</p>
            </div>
        </div>
        <div class='city-info'>
            <div class='top=left'>
            <img class='icon' src='./img/${getImage(description)}' alt='' />
            <div class='description'>${description}</div>
            </div>

            <div class="top-right">
                <div class="city-info__subtitle">as of ${observationTime}</div>
                <div class="city-info__title">${temperature}??</div>
              </div>
        </div>
        </div>
        <div id='properties'>${renderProperty(properties)}</div>
        </div>`;
};

const toglePoupClass = () => {
  popup.classList.toggle("active");
};

const renderComponent = () => {
  root.innerHTML = markup();

  const city = document.getElementById("city");
  city.addEventListener("click", toglePoupClass);
};

const handleInput = (e) => {
  store = {
    ...store,
    city: e.target.value,
  };
};

const handleSubmit = (e) => {
  e.preventDefault();
  const value = store.city;

  if (!value) return null;

  localStorage.setItem("query", value);
  fetchData();
  toglePoupClass();
};

form.addEventListener("submit", handleSubmit);
textInput.addEventListener("input", handleInput);

const hidePopupClass = () => {
  popup.classList.remove("active");
};
closePopup.addEventListener("click", hidePopupClass);

fetchData();
