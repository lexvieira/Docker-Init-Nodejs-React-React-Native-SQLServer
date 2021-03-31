import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import UserList from "./pages/UserList";

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={UserList} path="/user-list" />
        </BrowserRouter>
    )
}

export default Routes;