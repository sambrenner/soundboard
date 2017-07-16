import React from "react";

export default class SoundboardList extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        const { name } = this.props;

        return (
            <li>
                {name}
            </li>

        );
    }
};
