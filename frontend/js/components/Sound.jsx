import React from "react";

export default class Sound extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        const {id, name, size, url} = this.props;

        return (
            <li>
                {id}: {name} {size}b
                <audio src={url} controls />
            </li>
        );
    }
};
