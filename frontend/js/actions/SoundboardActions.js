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

export async function reloadSoundboards() {
    dispatcher.dispatch({
        type: "FETCH_SOUNDBOARDS"
    });

    const rsp = await fetch("/api/v1/dropbox/folders", {
        method: "get",
        credentials: "same-origin"
    });

    const json = await rsp.json();

    dispatcher.dispatch({
        type: "RECEIVE_SOUNDBOARDS",
        soundboards: json.entries
    });
}
