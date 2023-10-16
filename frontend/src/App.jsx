import React from "react";
import { PocketProvider } from "./contexts/PocketContext";
import Router from "./routes/Routes";

export default function App(){
  return (
    <PocketProvider>
        <Router/>
    </PocketProvider>
  );
};