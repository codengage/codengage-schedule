import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DemoApp from './pages/DemoApp'
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Protected } from "./pages/Protected";
import { RequireAuth } from "./components/RequireAuth";
import { PocketProvider } from "./contexts/PocketContext";

export default function App(){
  return (
    <PocketProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route exact path="/demoapp" element={<DemoApp />} />
          <Route element={<RequireAuth />}>
            <Route path="/protected" element={<Protected />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PocketProvider>
  );
};

