/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  CircleMarker,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";
import { useLayout } from "../contexts/LayoutContext";
import { GiCompass } from "react-icons/gi";

function Map() {
  const { openCityTab, cityTab } = useLayout();

  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },

    [geolocationPosition]
  );

  // let greenIcon = L.icon({
  //   iconUrl: <CiMapPin />,
  //   // shadowUrl: 'leaf-shadow.png',

  //   iconSize: [38, 95], // size of the icon
  //   shadowSize: [50, 64], // size of the shadow
  //   iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  //   shadowAnchor: [4, 62], // the same for the shadow
  //   popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  // });

  // L.marker([51.5, -0.09], { icon: greenIcon }).addTo(map);
  const redOptions = { color: "green" };

  return (
    <div className={styles.mapContainer}>
      {!cityTab && mapPosition && (
        <Button type="position" onClick={openCityTab}>
          Add City
        </Button>
      )}

      {/* {!geolocationPosition && ( */}
        <button className={styles.btn} onClick={getPosition}>
          <GiCompass />
        </button>
      {/* )} */}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <CircleMarker
          center={[mapPosition[0], mapPosition[1]]}
          pathOptions={redOptions}
          radius={20}
        >
          <Popup>Add the city to your list</Popup>
        </CircleMarker>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
