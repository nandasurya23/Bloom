# Bloom Flower Shop Frontend MVP

## Project Overview
Bloom Flower Shop is a modern frontend MVP for an elegant online flower shopping experience. It focuses on clean UI architecture, reusable logic, smooth interactions, and scalable project structure.

### Tech Stack
- Next.js (App Router)
- TypeScript (strict)
- Tailwind CSS
- Zustand
- Framer Motion
- React Icons
- React Query
- React Hook Form

## Features
- Hero Section with animated headline and CTAs
- Featured Products powered by React Query
- Add to Cart / Add to Wishlist actions
  - Notification and animation feedback
  - Spam prevention with per-product cooldown
- About Section
- Contact Section (email, WhatsApp, frontend form)
- Info / How to Order Section
- Skeleton Loading States
- Responsive mobile-first design
- SEO metadata with Next.js Metadata API

## Folder Structure
```txt
src/
  app/
    page.tsx
    layout.tsx
    shop/
      page.tsx
      layout.tsx
    cart/
      page.tsx
      layout.tsx
    wishlist/
      page.tsx
      layout.tsx
    checkout/
      page.tsx
      layout.tsx
    payment/
      page.tsx
      layout.tsx
    success/
      page.tsx
      layout.tsx

  components/
    home/
      HeroSection.tsx
      FeaturedProducts.tsx
      AboutSection.tsx
      ContactSection.tsx
      InfoSection.tsx
    product/
    shop/
    layout/
    providers/
    ui/

  hooks/
    usePagination.ts
    useSearch.ts

  services/
    filterService.ts

  store/
    useCartStore.ts
    useWishlistStore.ts

  lib/
    api/
      productsApi.ts
    formatCurrency.ts
    metadata.ts
    schema.ts
    orderSession.ts
    uuid.ts
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build and Run Production
```bash
npm run build
npm run start
```

### 4. Optional Commands
```bash
npm run lint
npm run test
npm run test:coverage
```

## How to Use

### Home Page
- Open `/` to access the Home Page sections:
  - Hero
  - Featured Products
  - About
  - Info / How to Order
  - Contact

### Add to Cart / Wishlist
- Use action buttons on product cards.
- Add actions are connected to Zustand stores.
- Cooldown prevents rapid repeated clicks per product button.

### Skeleton Loading
- Product skeletons appear while async product data is loading.
- Skeleton states are also used in other key loading transitions in the app.

### Notifications and Animations
- Action feedback appears as animated notification messages.
- Framer Motion powers section entry and interaction animations.

## Additional Notes
- All product and hero images currently use Unsplash placeholders.
- Frontend only: no backend integration or real payment gateway.
- Strong TypeScript typing is enforced across the project.
- Architecture is incremental and designed for scalable extension.
