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
            name
        });

        this.emit("change");
    }

    getAll() {
        return this.soundboards;
    }

    handleActions(action) {
        switch (action.type) {
            case "CREATE_SOUNDBOARD":
                this.create(action.name);
                break;
            case "RECEIVE_SOUNDBOARDS":
                this.soundboards = action.soundboards;
                this.emit("change");
                break;
        }
    }
}

const soundboardStore = new SoundboardStore();
dispatcher.register(soundboardStore.handleActions.bind(soundboardStore));

export default soundboardStore;
