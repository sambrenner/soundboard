import React from "react";

import SoundboardList from "../components/SoundboardList";

export default class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <p>Homepage</p>
                <SoundboardList />
            </div>
        );
    }
}
