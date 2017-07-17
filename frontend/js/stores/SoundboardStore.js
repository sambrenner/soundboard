import {EventEmitter} from "events";
import dispatcher from "../dispatcher";

class SoundboardStore extends EventEmitter {
    constructor() {
        super();

        this.soundboards = [
            {
                id: 1,
                name: "Board 1"
            },
            {
                id: 2,
                name: "Board 2"
            }
        ];
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
        }
    }
}

const soundboardStore = new SoundboardStore();

window.dispatcher = dispatcher;
export default soundboardStore;
