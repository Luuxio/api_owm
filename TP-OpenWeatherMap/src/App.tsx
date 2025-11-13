import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

// Fix icône Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const App: React.FC = () => {
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const API_KEY = "be9b593cdc172861edf6e2ddddac8867";

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map("map").setView([51.505, -0.09], 5);

            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(mapRef.current);
        }
    }, []);

    // 🔍 Recherche d'une ville
    const handleSearch = async () => {
        const cityName = inputRef.current?.value.trim();
        if (!cityName) return alert("Veuillez entrer une ville.");

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                cityName
            )}&appid=${API_KEY}&units=metric&lang=fr`;

            const res = await fetch(url);
            if (!res.ok) throw new Error("Ville non trouvée");
            const data = await res.json();

            const { lat, lon } = data.coord;
            const { temp } = data.main;
            const desc: string = data.weather[0].description;

            addWeatherMarker(lat, lon, temp, desc, cityName);
        } catch (err: any) {
            alert(err.message);
        }
    };

    // 📍 Géolocalisation
    const handleGeolocate = () => {
        if (!navigator.geolocation) {
            alert("La géolocalisation n’est pas supportée par votre navigateur.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                
                // Récupération météo via OpenWeatherMap
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`;
                const res = await fetch(url);
                const data = await res.json();

                const { temp } = data.main;
                const desc: string = data.weather[0].description;
                const cityName = data.name || "Ma position";

                addWeatherMarker(lat, lon, temp, desc, cityName);
            },
            (err) => {
                console.error(err);
                alert("Impossible de récupérer la position.");
            }
        );
    };

    // 🧩 Fonction utilitaire pour ajouter un marqueur météo
    const addWeatherMarker = (
        lat: number,
        lon: number,
        temp: number,
        desc: string,
        cityName: string
    ) => {
        const color =
            temp >= 25
                ? "red"
                : temp >= 15
                ? "orange"
                : temp >= 5
                ? "blue"
                : "lightblue";

        mapRef.current?.setView([lat, lon], 10);

        if (markerRef.current) mapRef.current?.removeLayer(markerRef.current);

        markerRef.current = L.marker([lat, lon])
            .addTo(mapRef.current!)
            .bindPopup(
                `
                <div style="
                    text-align: center;
                    color: ${color};
                    font-weight: bold;
                    font-size: 1.1em;
                ">
                    <b>${cityName}</b><br/>
                    Temp: ${temp} °C<br/>
                    <i>${desc}</i>
                </div>
                `
            )
            .openPopup();
    };

    return (
        <div>
            <div className="search-container">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Entrez une ville..."
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                    }}
                />
                <button onClick={handleSearch}>Rechercher</button>

                {/* 📍 Nouveau bouton de géolocalisation */}
                <button className="geo-btn" onClick={handleGeolocate}>
                    📍 Autour de moi
                </button>
            </div>

            <div id="map"></div>
        </div>
    );
};

export default App;
