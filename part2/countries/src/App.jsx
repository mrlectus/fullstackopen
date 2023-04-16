import axios from 'axios';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const App = () => {
  const [country, setCountry] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [weather, setWeather] = useState([]);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState(null);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const fetchCountry = async () => {
    try {
      const request = await axios.get('https://restcountries.com/v2/all');
      const data = request.data;
      setCountry(data);
    } catch (err) {
      console.error('cannot fetch country');
    }
  };
  useEffect(() => async () => fetchCountry(), []);
  const handleFilter = (event) => {
    event.preventDefault();
    const temp = country?.slice();
    const filtered = temp.filter((name) =>
      name.name.toLowerCase()?.match(query.toLowerCase())
    );
    if (filtered.length > 10) {
      setMessage('too many matches, specify another filter');
    } else {
      setFiltered(filtered);
      setMessage(null);
    }
  };
  const fetchWeather = useCallback(async () => {
    try {
      let request = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      let data = request.data;
      setWeather(data);
    } catch (err) {
      console.error('cannot fetch weather');
    }
  }, [lat, lng]);

  useEffect(() => {
    if (filtered.length == 1) {
      setLat(filtered[0].latlng[0]);
      setLng(filtered[0].latlng[1]);
    }
    fetchWeather();
  }, [query, lat, lng, filtered, fetchWeather]);

  const filteredMany = !message ? (
    filtered.map((name) => {
      return <p key={name.name}>{name.name}</p>;
    })
  ) : (
    <p>{message}</p>
  );
  const filteredOne = !message ? (
    filtered.map((name) => {
      let {
        capital,
        area,
        languages,
        flags: { svg },
      } = name;
      return (
        <div className="flex flex-col gap-4">
          <p className="text-lg font-bold" key={name.name}>
            {name.name}
          </p>
          <p> Capital {capital}</p>
          <p> Area {area}</p>
          <div className="">
            {' '}
            <b>languages</b>
            {languages.map((lang) => {
              return (
                <ul className="list-disc mx-10" key={lang.name}>
                  <li>{lang.name}</li>
                </ul>
              );
            })}
          </div>
          <div className="w-52 h-24">
            <img src={svg} alt={name.name} />
          </div>
          <div className="mt-7">
            <b> Weather in {capital} </b>
            <p>
              {' '}
              temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius
            </p>
            <div className="w-52 h-24">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={name.name}
              />
            </div>
            <p>Wind {weather.wind.speed} m/s </p>
          </div>
        </div>
      );
    })
  ) : (
    <p>{message}</p>
  );
  return (
    <div className="mt-4 mx-4">
      <form onSubmit={handleFilter}>
        find countries{' '}
        <input
          className="outline-none rounded-md border p-2"
          onChange={(event) => setQuery(event.target.value)}
          value={query}
        />
      </form>
      {filtered.length === 1 ? filteredOne : filteredMany}
    </div>
  );
};

export default App;
