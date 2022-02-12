import React from "react";
import "./inputoptions.css";

const InputOptions = (props) => {
    const { Icon, title, color } = props;
    return (
        <div className="inputoptions">
            <Icon style={{ color: `${color}` }} />
            <h4>{title}</h4>
        </div>
    );
};

export default InputOptions;
