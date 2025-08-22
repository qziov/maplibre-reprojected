# @qziov/maplibre-reprojected

[![npm version](https://img.shields.io/npm/v/@qziov/maplibre-reprojected.svg)](https://www.npmjs.com/package/@qziov/maplibre-reprojected)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A **MapLibre GL JS** plugin that enables accurate overlay of georeferenced images (e.g., historical maps, satellite captures) by reprojecting them from **EPSG:4326 (WGS84)** to **EPSG:3857**, and rendering them with precise alignment using WebGL.

Perfect for GIS applications, map overlays, and non-linear image warping with high visual fidelity.

[//]: # (![Demo]&#40;https://via.placeholder.com/800x400?text=Geo+Aligned+Image+Overlay+Demo&#41;  )

Here's how the georeferenced image aligns perfectly with MapLibre:
<div align=center>
<video width="320" height="240" controls>
<source src="public/differ.mp4" type="video/mp4">
</video>
</div>
*Video shows reprojection from EPSG:4326 to EPSG:3857 with corner alignment.*

## ✨ Features

- ✅ Reproject images from geographic coordinates (EPSG:4326) to Web Mercator (EPSG:3857)
- ✅ Non-linear warping using [`arrugator`](https://github.com/iosphere/arrugator) for accurate corner alignment
- ✅ WebGL-powered rendering via `twgl.js` for smooth performance
- ✅ Supports opacity control and dynamic image updates
- ✅ Full TypeScript support with type definitions
- ✅ Lightweight, modular, and tree-shakable
- ✅ Works seamlessly with MapLibre GL JS custom layers

---

## 📦 Installation

```bash
npm i @qziov/maplibre-reprojected
```

if you already install maplibre-gl run this command

```bash
npm install @qziov/maplibre-reprojected --legacy-peer-deps
```

