import nextJest from "next/jest";

import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./"
});

const customJestConfig: Config = {
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/hooks/usePagination.ts",
    "src/hooks/useSearch.ts",
    "src/services/filterService.ts",
    "src/store/useCartStore.ts",
    "src/store/useWishlistStore.ts",
    "src/lib/formatCurrency.ts",
    "src/components/product/ProductCard.tsx",
    "src/components/shop/SearchBar.tsx",
    "src/components/shop/Pagination.tsx",
    "src/app/checkout/page.tsx",
    "!src/**/*.d.ts",
    "!src/**/index.ts"
  ],
  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    },
    "./src/hooks/usePagination.ts": {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    },
    "./src/hooks/useSearch.ts": {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    },
    "./src/services/filterService.ts": {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    },
    "./src/store/useCartStore.ts": {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    },
    "./src/store/useWishlistStore.ts": {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    },
    "./src/lib/formatCurrency.ts": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};

export default createJestConfig(customJestConfig);
