import React from "react";
import { Route, Routes } from "react-router-dom";

import SideNav from "./layouts/SideNav";
import AuthForm from "./components/AuthForm";

function AllRoutes(){
    return(
        <>
            <Routes>
                <Route path="/" element={<SideNav />}/>
            </Routes>
        </>
    )
}

export default AllRoutes;