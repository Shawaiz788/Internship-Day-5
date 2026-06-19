# My App (Expo Router) — Zustand + (MMKV optional) Cart Persistence

A React Native (Expo) app built with **Expo Router** and a persistent **cart** using **Zustand**.

This repository supports two persistence strategies depending on the branch:

- **`main` branch**: uses **Zustand only** for state persistence
- **`zustand+mmkv` branch**: uses **Zustand + MMKV** (MMKV-backed storage + Zustand persistence)

---


https://github.com/user-attachments/assets/b4ad015a-0825-4a0e-ba6d-4e2eff1083d5

Note: Video shows that after refresh the state is saved,that is possible due to mmkv.

## Quick start

### 1) Install dependencies

```bash
npm install
```

### 2) Run the app

```bash
npm start
```

or

```bash
npx expo start
```

In the terminal output, open one of the following:

- **Android emulator**
- **iOS simulator**
- **Expo Go**
- **Development build** (recommended for production-like testing)

---

## Project structure (high level)

- `app/` — Expo Router screens/layouts
- `store/` — state management stores
  - `store/cartStore.ts` — Zustand cart store + persistence wiring
  - `store/mmkv.ts` — MMKV storage adapter used by Zustand persistence (on `zustand+mmkv`)

---

## Tech stack

- **Expo** (React Native)
- **expo-router** (file-based routing)
- **zustand** (state management)
- **react-native-mmkv** (fast key-value storage, used only in `zustand+mmkv` branch)

---

## Persistence strategy (main vs zustand+mmkv)

### `main` branch — Zustand only

On the **`main`** branch, cart persistence is handled using **Zustand’s `persist` middleware**.

Expected behavior:
- Cart contents survive app restarts (persisted via Zustand persistence configuration on this branch).
- No MMKV integration is required.

### `zustand+mmkv` branch — Zustand + MMKV

On the **`zustand+mmkv`** branch, Zustand persistence is configured to store/retrieve the persisted state using **MMKV**.

Key files:

- `store/cartStore.ts`
  - Creates the Zustand cart store
  - Uses `persist(...)`
  - Points `storage` to an MMKV adapter via `createJSONStorage(() => zustandStorage)`

- `store/mmkv.ts`
  - Creates an MMKV instance (`createMMKV`)
  - Exposes a `zustandStorage` object compatible with Zustand’s `persist` storage interface

Expected behavior:
- Cart contents survive app restarts.
- Persistence uses **MMKV** as the underlying storage engine (faster and more efficient than slower storage backends).

---

## How the cart store works

The cart store is implemented in:

- `store/cartStore.ts`

It includes:

- `products`: array of `{ ...Product, quantity }`
- `items`: total quantity count
- Actions:
  - `addProduct(product)`
  - `reduceProduct(product)`
  - `clearCart()`

Persistence:
- Zustand `persist` middleware stores the cart state under a `name` key (e.g. `cart-storage`)
- On `zustand+mmkv`, the storage reads/writes through MMKV using `zustandStorage`

---

## Scripts

Common commands:

- Start:
  - `npm start` (or `npx expo start`)
- Android:
  - `npm run android`
- iOS:
  - `npm run ios`
- Lint:
  - `npm run lint`

---

## Reset project (Expo starter helper)

If this project was created from the Expo template and you need a fresh app directory:

```bash
npm run reset-project
```

---

## Notes

- Persistence behavior differs by branch.
- If you switch branches, verify cart persistence by:
  1. Add items to cart
  2. Fully restart the app
  3. Confirm items remain

