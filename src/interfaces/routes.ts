import { ReactNode } from 'react';

export interface IRouteProps {
  children: ReactNode;
  path: string | string[];
}
