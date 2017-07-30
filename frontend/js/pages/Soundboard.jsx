import React from "react";

import Sound from "../components/Sound";

import * as SoundboardActions from "../actions/SoundboardActions";
import SoundboardStore from "../stores/SoundboardStore";

export default class Soundboard extends React.Component {
    constructor(props) {
        super();

        let soundboardId = props.match.params.soundboardId;

        this.state = {
            soundboard: SoundboardStore.get(soundboardId)
        }
    }

    componentWillMount() {
        let soundboardId = this.props.match.params.soundboardId;

        SoundboardActions.getSounds(soundboardId);

        SoundboardStore.on("change", () => {
            this.setState({
                soundboard: SoundboardStore.get(soundboardId)
            });
        });
    }

    render() {
        const {soundboard} = this.state;

        const Sounds = soundboard.sounds.map(sound => {
            return <Sound key={sound.id} {...sound} />;
        });

        return (
            <div>
                <p>Soundboard</p>

                <ul>{Sounds}</ul>
            </div>
        );
    }
}
