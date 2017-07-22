import React from "react";
import {Link} from "react-router-dom";

export default class SoundboardList extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        const {id, name} = this.props;

        return (
            <li>
                <Link to={"/soundboard/" + id}>{name}</Link>
            </li>
        );
    }
};
