import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Protected } from "../pages/Protected";
import { RequireAuth } from "../components/RequireAuth";
import Schedule from "../pages/Schedule";
import Sign from "../pages/Sign";


export default function Router(){
    return(
        <BrowserRouter>
        <Routes>
          <Route index element={<Sign />} /> 
          <Route exact  path="/schedule" element={<Schedule/>} />
          <Route element={<RequireAuth />}>
            
            <Route path="/protected" element={<Protected />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
}