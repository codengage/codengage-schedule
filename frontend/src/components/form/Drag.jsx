import React, { useCallback } from "react";
import { usePocket } from "../../contexts/PocketContext";

export default function Drag(props) {
    const {modalInfo} = props;
    const {setShowDrag} = props;
    const { drag } = usePocket();

    const faz = useCallback(
        async (evt) => {
            evt?.preventDefault();
            await drag(props.modalInfo.event.id, props.modalInfo.event.start, props.modalInfo.event.end);
            window.location.reload(true);
        },
        [drag]
    )

    return( 
        //console.log(props.modalInfo.event.start)
        faz()
    );
};