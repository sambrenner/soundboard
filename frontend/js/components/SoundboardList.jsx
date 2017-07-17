import React from "react";

import SoundboardListItem from "./SoundboardListItem";

import SoundboardActions from "../actions/SoundboardActions";
import SoundboardStore from "../stores/SoundboardStore";

export default class SoundboardList extends React.Component {
    constructor() {
        super();

        this.state = {
            soundboards: SoundboardStore.getAll()
        };
    }

    componentWillMount() {
        SoundboardStore.on("change", () => {
            this.setState({
                soundboards: SoundboardStore.getAll()
            });
        });
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
