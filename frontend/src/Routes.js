import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Base from './Base';

const RouteFxn = () => {
    return (
        <Router>
            <Routes>
            <Route exact path='/' element={<Base/>}/>
            </Routes>
        </Router>
  )
};

export default RouteFxn;