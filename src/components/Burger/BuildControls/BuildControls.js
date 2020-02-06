import "./BuildControls.css";
import React from "react";
import BuildControl from "./BuildControl/BuildControl";


const controls = [
    { label: "Salad", type: "salad"},
    { label: "Bacon", type: "bacon"},
    { label: "Cheese", type: "cheese"},
    { label: "Meat", type: "meat"}
]

const BuildControls = (props) => (
    <div className="BuildControls">
        { controls.map(ctrl => (
            <BuildControl label={ctrl.label} key={ctrl.label} />
        ))}
    </div>
);

export default BuildControls