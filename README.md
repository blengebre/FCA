# eCommerce Shop

> Simple, modern eCommerce frontend built with Next.js (App Router), TypeScript, Tailwind CSS, Shadcn UI, and Redux Toolkit — powered by DummyJSON for API data.

## 🚀 Project Overview

A practice project that demonstrates a real-world frontend application with product listing, details, favorites, and full CRUD operations (create, read, update, delete) against the DummyJSON products API. The app is responsive, includes dark mode, loading and error handling, and optional mock authentication to protect certain routes.

## 🔧 Tech Stack

* **Framework:** Next.js (App Router, `/src/app`)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI Library:** Shadcn UI
* **State Management:** Redux Toolkit
* **HTTP Client:** Axios
* **API (dev/test):** DummyJSON — [https://dummyjson.com](https://dummyjson.com)
* **Notifications:** react-hot-toast / sonner (optional)

## ✨ Key Features

* Product listing with infinite / on-scroll pagination
* Product detail page with full info (images, brand, stock, rating)
* Favorite/unfavorite products (kept in Redux store)
* Create product form (POST to DummyJSON)
* Edit product (PATCH/PUT to DummyJSON)
* Delete product (with confirm dialog)
* Search products (bonus)
* Dark mode toggle via Redux
* Loading & error states for network requests
* Basic mock authentication for protected routes
* Toast notifications for feedback

## 📁 Suggested Folder Structure

```
/src
  /app                # Next.js App Router (pages + layouts)
  /components         # Reusable UI components (ProductCard, Header, Footer, Button)
  /features
    /products         # Redux slice + hooks for products
    /favorites        # Redux slice for favorites
    /auth             # Mock auth slice
  /lib                # axios instance, helpers
  /hooks              # custom hooks (useInfiniteProducts, useAuth)
  /styles             # tailwind config, globals
  /types              # shared TypeScript types
  /utils              # utils (formatPrice, date helpers)

public/

next.config.js
tailwind.config.js
package.json
README.md
```

## ⚙️ Environment Variables

Create a `.env.local` in the project root with (example):

```
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
# (If you use a server component or stripe during dev, add keys here)
```

> DummyJSON doesn't require authentication — but keep this pattern to add other APIs later.

## 📥 Installation & Local Development

1. Clone the repository

```bash
git clone <YOUR_REPO_URL>
cd ecommerce-shop
```

2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn
```

3. Run the development server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open `http://localhost:3000` in your browser.

## 🧩 Available Scripts (package.json)

* `dev` — run Next.js in development
* `build` — build for production
* `start` — start the production server
* `lint` — run linters
* `format` — format code (prettier)

## 🔁 API Integration Notes

Use Axios with a central instance (`/src/lib/api.ts`) that points to `NEXT_PUBLIC_API_BASE_URL`. Example endpoints you'll use:

* `GET /products` — list products (supports `limit` & `skip` query params)
* `GET /products/:id` — single product
* `POST /products/add` — create product
* `PUT /products/:id` — update product
* `DELETE /products/:id` — delete product
* `GET /products/search?q={query}` — search products
* `GET /products/categories` — categories list

Handle successful responses and errors and surface them with UI states and toasts.

## 🔐 Mock Authentication (Simple Flow)

* Basic form that `dispatch(login({ username }))` to set a user in Redux
* Protect routes by wrapping page components with a `PrivateRoute` component that checks `auth.isAuthenticated`

## ✅ Example: Favorite Flow (Redux)

* `favorites` slice stores a list of favorite product objects or IDs
* `toggleFavorite(product)` adds/removes from that list
* Persisting favorites to `localStorage` (optional) for session persistence

## 🧪 Testing & Quality

* Add unit tests for slices and helpers (Jest + React Testing Library)
* Run `npm run lint` and `npm run format` before PRs

## 📦 Deployment

* Recommended: Vercel (Next.js first-class), Netlify (if using a custom build), or any Node host
* Set env vars in the host dashboard (if needed)
* Build command: `npm run build`
* Output: Next.js app

## 📝 README Checklist (for submission)

* [ ] GitHub repo public link
* [ ] Clear `README.md` with setup and scripts (this file)
* [ ] Screenshots or demo GIF (add to `/public/assets`) — optional but recommended
* [ ] Running app: `npm run dev` successful
* [ ] Basic tests passing (if added)

## 👨‍💻 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit changes (`git commit -m 'feat: add ...'`)
4. Push and open a PR

## 📚 Resources

* DummyJSON docs: [https://dummyjson.com/docs/products](https://dummyjson.com/docs/products)
* Next.js App Router docs: [https://nextjs.org/docs](https://nextjs.org/docs)
* Tailwind CSS: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
* Redux Toolkit docs: [https://redux-toolkit.js.org/](https://redux-toolkit.js.org/)
* Shadcn UI: [https://ui.shadcn.com/](https://ui.shadcn.com/)

