import { FC, LazyExoticComponent } from 'react';

export type Route = {
  Component: FC<any> | LazyExoticComponent<FC<any>>;
  path: string;
  children?: Route[];
  handle?: {
    category?: string;
    name?: string;
  };
  props?: any;
  gate?: string;
};
