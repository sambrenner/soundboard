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

export async function getSoundboard(id) {
    dispatcher.dispatch({
        type: "FETCH_SOUNDBOARD"
    });

    const rsp = await fetch("/api/v1/folders/" + id, {
        method: "get",
        credentials: "same-origin"
    });

    const json = await rsp.json();

    dispatcher.dispatch({
        type: "RECEIVE_SOUNDBOARD",
        parent: id,
        soundboard: json
    });
};

export async function reloadSoundboards() {
    dispatcher.dispatch({
        type: "FETCH_SOUNDBOARDS"
    });

    const rsp = await fetch("/api/v1/folders", {
        method: "get",
        credentials: "same-origin"
    });

    const json = await rsp.json();

    dispatcher.dispatch({
        type: "RECEIVE_SOUNDBOARDS",
        soundboards: json
    });
}
