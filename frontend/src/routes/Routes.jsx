import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "../components/RequireAuth";
import Schedule from "../pages/Schedule";
import Sign from "../pages/Sign";
import Userspace from "../pages/Userspace"



export default function Router(){
    return(
        <BrowserRouter>
        <Routes>
          <Route index element={<Sign />} /> 
          <Route exact  path="/schedule" element={<Schedule/>} />
          <Route element={<RequireAuth />}>
            <Route path="/Userspace" element={<Userspace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
}