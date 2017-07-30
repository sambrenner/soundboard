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

export async function getSounds(id) {
    dispatcher.dispatch({
        type: "FETCH_SOUNDBOARD"
    });

    const rsp = await fetch("/api/v1/folders/" + id, {
        method: "get",
        credentials: "same-origin"
    });

    const sounds = await rsp.json();

    for (let [i, sound] of sounds.entries()) {
        const soundDetail = await fetch("/api/v1/sounds/" + sound.id, {
            method: "get",
            credentials: "same-origin"
        });

        const json = await soundDetail.json();

        sounds[i].url = json.link;
    }

    dispatcher.dispatch({
        type: "RECEIVE_SOUNDS",
        parent: id,
        sounds
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
