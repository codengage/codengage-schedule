import React, { useCallback, useRef } from "react";
import { usePocket } from "../contexts/PocketContext";

export default function Drag(props) {
    const {modalInfo} = props;
    const { drag } = usePocket();
    const sta = (props.modalInfo.event.start);
    const end = (props.modalInfo.event.end);
    const id = props.modalInfo.event.id;

    const handleFunction = useCallback(
        async (evt) => {
            evt?.preventDefault();
            await drag(id, sta, end);
            window.location.reload();
        },
        [drag]
    )

    return( 
        
        <div>
        {handleFunction()}</div>
    );
};