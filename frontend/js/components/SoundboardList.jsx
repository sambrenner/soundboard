import React from "react";

import SoundboardListItem from "./SoundboardListItem";

export default class SoundboardList extends React.Component {
    constructor() {
        super();

        this.state = {
            "soundboards": [
                {
                    "id": 1,
                    "name": "Board 1"
                },
                {
                    "id": 2,
                    "name": "Board 2"
                }
            ]
        };
    }

    render() {
        const {soundboards} = this.state;

        const SoundboardList = soundboards.map(board => {
            return <SoundboardListItem key={board.id} {...board} />;
        });

        return (
            <ul>{SoundboardList}</ul>
        );
    }
};
