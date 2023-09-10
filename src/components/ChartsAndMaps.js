import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

import 'country-flag-icons/css/country-flag-icons.min.css'; 
const ChartsAndMaps = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [worldData, setWorldData] = useState({});
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [wikipediaLink, setWikipediaLink] = useState('');

  useEffect(() => {
    
    axios
      .get('https://disease.sh/v3/covid-19/countries')
      .then((response) => {
        setCountriesData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
      });

    
    axios
      .get('https://disease.sh/v3/covid-19/all')
      .then((response) => {
        setWorldData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching worldwide data:', error);
      });
  }, []);

  
  const generateFlagUrl = (countryCode, style = 'flat', size = 64) => {
    if (countryCode) {
      return `https://flagsapi.com/${countryCode.toLowerCase()}/${style}/${size}.png`;
    } else {
      return ''; 
    }
  };

  return (
    <MapContainer id="map-container" center={[0, 0]} zoom={2}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {countriesData.map((country) => (
        <Marker
          key={country.country}
          position={[country.countryInfo.lat, country.countryInfo.long]}
          onMouseOver={() => {
            setHoveredCountry(country);
          }}
          onMouseOut={() => {
            setHoveredCountry(null);
            setWikipediaLink('');
          }}
          onClick={() => {
            if (country.countryInfo.iso2) {
              const countryName = encodeURIComponent(country.country);
              setWikipediaLink(`https://en.wikipedia.org/wiki/${countryName}`);
            }
          }}
        >
          <Popup>
            <div className="popup-content">
              <h2 className="country-name">
                <i className={`flag-icon flag-icon-${country.countryInfo.iso2.toLowerCase()}`} /> {country.country}
              </h2>
              <p>Total Cases: {country.cases}</p>
              <p>Active Cases: {country.active}</p>
              <p>Recovered Cases: {country.recovered}</p>
              <p>Deaths: {country.deaths}</p>
              {hoveredCountry === country && wikipediaLink && (
                <a href={wikipediaLink} target="_blank" rel="noopener noreferrer">
                  Wikipedia
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {Object.keys(worldData).length > 0 && (
        <Marker position={[0, 0]}>
          <Popup>
            <div className="popup-content">
              <h2 className="country-name">Worldwide</h2>
              <p>Total Cases: {worldData.cases}</p>
              <p>Active Cases: {worldData.active}</p>
              <p>Recovered Cases: {worldData.recovered}</p>
              <p>Deaths: {worldData.deaths}</p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default ChartsAndMaps;
