"use client";

import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "./MdxComponents";

interface MdxProviderProps {
  children: React.ReactNode;
}

export const MdxProvider: React.FC<MdxProviderProps> = ({ children }) => {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
};

export default MdxProvider;
