import React from "react";

import SoundboardListItem from "./SoundboardListItem";

import * as SoundboardActions from "../actions/SoundboardActions";
import SoundboardStore from "../stores/SoundboardStore";

export default class SoundboardList extends React.Component {
    constructor() {
        super();

        this.state = {
            soundboards: SoundboardStore.getAll()
        };
    }

    componentWillMount() {
        SoundboardActions.reloadSoundboards();

        SoundboardStore.on("change", () => {
            this.setState({
                soundboards: SoundboardStore.getAll()
            });
        });
    }

    createSoundboard() {
        SoundboardActions.createSoundboard(Math.random());
    }

    render() {
        const {soundboards} = this.state;

        const SoundboardList = soundboards.map(board => {
            return <SoundboardListItem key={board.id} {...board} />;
        });

        return (
            <div>
                <button onClick={this.createSoundboard.bind(this)}>New Soundboard</button>
                <ul>{SoundboardList}</ul>
            </div>
        );
    }
};
