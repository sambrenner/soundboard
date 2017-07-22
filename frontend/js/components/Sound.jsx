import React from "react";

export default class Sound extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        const {name, size} = this.props;

        return (
            <li>
                {name} {size}b
            </li>
        );
    }
};
