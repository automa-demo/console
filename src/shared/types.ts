import { FC, LazyExoticComponent } from 'react';

export type Route = {
  Component: LazyExoticComponent<FC<any>>;
  path: string;
  children?: Route[];
  handle?: {
    category?: string;
    name?: string;
  };
  props?: any;
  gate?: string;
};
