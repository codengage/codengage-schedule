import { BrowserRouter, Routes, Route } from "react-router-dom";
import DemoApp from '../pages/DemoApp'
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Protected } from "../pages/Protected";
import { RequireAuth } from "../components/RequireAuth";
export default function Router(){
    return(
        <BrowserRouter>
        <Routes>
          <Route index element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route element={<RequireAuth />}>
            <Route exact  path="/demoapp" element={<DemoApp />} />
            <Route path="/protected" element={<Protected />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
}