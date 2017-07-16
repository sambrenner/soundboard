import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";

import Home from "./pages/Home";
import Profile from "./pages/Profile";

const app = document.getElementById("app");
const userId = parseInt(app.dataset.userId);

ReactDOM.render(
    <div>
        <Router basename="/app/">
            <div>
                <Header />

                <Route exact path="/" component={Home} />
                <Route path="/profile" component={Profile} />

                <Footer />
            </div>
        </Router>
    </div>,
    app
);
