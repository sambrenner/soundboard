import dispatcher from "../dispatcher";

export function createSoundboard(name) {
    dispatcher.dispatch({
        type: "CREATE_SOUNDBOARD",
        name
    });
}

export function deleteSoundboard(id) {
    dispatcher.dispatch({
        type: "DELETE_SOUNDBOARD",
        id
    });
}
