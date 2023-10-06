import { BrowserRouter, Routes, Route } from "react-router-dom";
import  SignIn  from "../pages/SignIn";
import  SignUp  from "../pages/SignUp";
import { Protected } from "../pages/Protected";
import { RequireAuth } from "../components/RequireAuth";
import Schedule from "../pages/Schedule";
export default function Router(){
    return(
        <BrowserRouter>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<RequireAuth />}>
            <Route exact  path="/schedule" element={<Schedule/>} />
            <Route path="/protected" element={<Protected />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
}