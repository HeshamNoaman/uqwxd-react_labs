import React from "react";
import { useSelector } from "react-redux";

const DivPanel = () => {
    // used to select the state from the store
    let counterVal = useSelector(state => state.counter);

    return (
        <div>The present value of counter is {counterVal}</div>
    )
}

export default DivPanel;
