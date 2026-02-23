import "@testing-library/jest-dom";

import React from "react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return React.createElement("img", { ...props, alt: props.alt ?? "" });
  }
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string }) => {
    return React.createElement("a", { href, ...rest }, children);
  }
}));

jest.mock("framer-motion", () => {
  const ReactLocal = require("react") as typeof React;

  const createMockComponent = (tag: string) =>
    ({ children, ...props }: { children?: React.ReactNode }) =>
      ReactLocal.createElement(tag, props, children);

  return {
    motion: {
      article: createMockComponent("article"),
      section: createMockComponent("section"),
      nav: createMockComponent("nav"),
      label: createMockComponent("label")
    }
  };
});
