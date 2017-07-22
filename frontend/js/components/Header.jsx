import React from "react";
import {Link} from "react-router-dom";

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <h1>Soundboard</h1>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <a href="/auth/logout">Logout</a>
            </header>
        );
    }
}
