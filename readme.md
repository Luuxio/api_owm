# 🌦️ WeatherMap — React + TypeScript + Leaflet + OpenWeatherMap

Une application web permettant d’afficher la **météo d’une ville** ou de **votre position actuelle**, directement sur une carte interactive 🗺️.  
Construite avec **React (TSX)**, **Leaflet**, et l’API **OpenWeatherMap**.

---

## 🧑‍💻 Structure du projet 

```bash
TP-OpenWeatherMap/
├── src/
│   ├── App.tsx          # Composant principal React
│   ├── App.css          # Style global
│   ├── index.tsx        # Point d’entrée React
│   └── ...
├── public/
│   └── index.html
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔑 Clé API

La clé OpenWeatherMap est **déjà incluse** dans le projet (*⚠️ ne pas la publier publiquement sur un repo public si c’est une clé personnelle*).

Si vous souhaitez utiliser la vôtre :

Rendez-vous sur https://openweathermap.org/api

---

## 🚀 Fonctionnalités

-   🔍 Recherche de météo par nom de ville
-   📍 Bouton **"Autour de moi"** pour utiliser la géolocalisation
-   🗺️ Carte interactive via **Leaflet** et **OpenStreetMap**
-   🌡️ Affichage de la température et description météo
-   🎨 Couleur dynamique selon la température :
    -   🔴 > 25°C → Rouge
    -   🟠 15–24°C → Orange
    -   🔵 5–14°C → Bleu
    -   🩵 < 5°C → Bleu clair

---

## 🧰 Technologies utilisées

-   **React + TypeScript (TSX)**
-   **Leaflet** pour la carte
-   **OpenWeatherMap API**
-   **CSS** pour le style
-   **npm** pour la gestion des dépendances

---

## 📦 Installation

1. **Clonez le dépôt :**
    ```bash
    git clone https://github.com/ton-pseudo/nom-du-repo.git

    ```

2. **Entrez dans le dossier du projet:**
    ```bash
    cd TP-OpenWeatherMap
    ```

3 **Installez les dépendances:**
    ```bash
    npm install ou npm i
    ```

4. **Lancez le serveur:**
    ```bash
    npm run start
    ```

5. **Ouvrez votre navigateur à l'adresse:**
    ```bash
    http://localhost:3000/
    ```
