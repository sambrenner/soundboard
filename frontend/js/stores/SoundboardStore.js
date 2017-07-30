import {EventEmitter} from "events";
import dispatcher from "../dispatcher";

class SoundboardStore extends EventEmitter {
    constructor() {
        super();

        this.soundboards = [];
    }

    create(name) {
        this.soundboards.push({
            id: Date.now(),
            sounds: [],
            name
        });

        this.emit("change");
    }

    get(id) {
        return this.soundboards.find(el => el.id === id);
    }

    getAll() {
        return this.soundboards;
    }

    inflate(id, sounds) {
        var idx = this.soundboards.findIndex(el => el.id === id);
        this.soundboards[idx].sounds = sounds;
        this.emit("change");
    }

    handleActions(action) {
        switch (action.type) {
            case "CREATE_SOUNDBOARD":
                this.create(action.name);
                break;
            case "RECEIVE_SOUNDBOARDS":
                let soundboards = action.soundboards;

                soundboards.forEach(soundboard => {
                    soundboard.sounds = [];
                });

                this.soundboards = soundboards;
                this.emit("change");
                break;
            case "RECEIVE_SOUNDS":
                this.inflate(action.parent, action.sounds);
                break;
        }
    }
}

const soundboardStore = new SoundboardStore();
dispatcher.register(soundboardStore.handleActions.bind(soundboardStore));

export default soundboardStore;
