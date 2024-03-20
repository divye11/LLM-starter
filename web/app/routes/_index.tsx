import type { MetaFunction } from "@remix-run/node";

import { GeistProvider, CssBaseline } from '@geist-ui/core'
import App from '../components/App';

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return  ( 
  <GeistProvider>
    <CssBaseline /> 
    <App />  
  </GeistProvider>
  );
}