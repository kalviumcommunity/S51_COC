import React from "react";
import { Route, Routes } from "react-router-dom";

import Data from "./components/Data";
import SideNav from "./layouts/SideNav";

function AllRoutes(){
    return(
        <>
            <Routes>
                <Route path="/" element={<SideNav />}/>
                <Route path="/add" element={<Data/>} />
            </Routes>
        </>
    )
}

export default AllRoutes;