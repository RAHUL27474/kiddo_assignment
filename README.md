# Kiddo Assignment – Configuration-Driven React Native Homepage Renderer

## Overview

This project is a production-oriented React Native application built as part of the Kiddo Tech Assignment.

The application demonstrates a Server-Driven UI (SDUI) architecture where the client dynamically renders UI components based on a JSON payload received from the server. The renderer is designed to be scalable, resilient, and optimized for performance while supporting dynamic campaigns and runtime theme updates.

---

## Features Implemented

### 1. Dynamic Component Registry
- Configuration-driven UI rendering
- Component Factory Pattern
- Dynamic component mapping from JSON schema
- Graceful handling of unknown component types

Supported Components:
- BANNER_HERO
- PRODUCT_GRID_2X2
- DYNAMIC_COLLECTION
- FULL_SCREEN_OVERLAY

---

### 2. Dynamic Collections
- Horizontal product collections
- Nested list rendering
- Smooth scrolling performance
- Optimized virtualization

---

### 3. Action Dispatcher
Centralized action handling system.

Supported Actions:
- ADD_TO_CART
- DEEP_LINK
- CUSTOM ACTIONS

The dispatcher keeps UI components decoupled from business logic.

---

### 4. Campaign Engine
Runtime campaign switching without application updates.

Supported Campaigns:
- Back To School
- Summer Playhouse
- Mystery Gift Carnival

Features:
- Dynamic theme injection
- Campaign-specific assets
- Runtime overlay rendering

---

### 5. Theme Injection
Dynamic theme updates from JSON payload.

Example:

```json
{
  "theme": {
    "primary": "#FF9933",
    "background": "#FFF5E6"
  }
}
```

All components automatically react to theme changes.

---

### 6. Cart State Management
- Global cart management
- Optimized re-render strategy
- Instant quantity updates
- State isolation where possible

---

### 7. Performance Optimizations

Implemented:
- React.memo
- useMemo
- useCallback
- FlatList / FlashList optimization
- Stable key extraction
- Lazy rendering
- Efficient component registration

---

## Project Structure

```text
src/
│
├── components/
│   ├── BannerHero
│   ├── ProductGrid
│   ├── DynamicCollection
│   └── Overlay
│
├── registry/
│   └── ComponentRegistry
│
├── dispatcher/
│   └── ActionDispatcher
│
├── campaigns/
│   └── CampaignEngine
│
├── context/
│   ├── ThemeContext
│   └── CartContext
│
├── screens/
│   └── HomeScreen
│
├── services/
│   └── PayloadParser
│
└── utils/
```

---

## Technology Stack

- React Native
- TypeScript
- Context API
- FlashList / FlatList
- React Hooks

---

## Installation

### Clone Repository

```bash
git clone https://github.com/RAHUL27474/kiddo_assignment.git
```

### Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

### Run Android

```bash
npm run android
```

### Run iOS

```bash
npm run ios
```

---

## APK

A release APK has been included in the submission package for easy evaluation.

File:

```text
kiddo.apk
```

---

## Assumptions

- Server payloads are received in valid JSON format.
- Unsupported component types are ignored gracefully.
- Campaign assets are locally available for demonstration purposes.
- Network APIs are mocked where required.

---

## Assignment Objectives Covered

✅ Configuration-driven UI rendering

✅ Component Registry Pattern

✅ Dynamic Collections

✅ Runtime Theme Injection

✅ Campaign Engine

✅ Universal Action Dispatcher

✅ State Management

✅ Performance Optimization

✅ Fault Tolerance

✅ Production-Oriented Architecture

---

## Author

Rahul Chaudhary

Email: rahulchaudhary27474@gmail.com

Phone: +91 6387448387