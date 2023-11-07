import React, { useCallback } from "react";
import { usePocket } from "../../contexts/PocketContext";
import { Calendar } from "@fullcalendar/core";

export default function Drag(props) {
    const { drag } = usePocket();
    const sta = (props.modalInfo.event.start);
    const end = (props.modalInfo.event.end);
    const id = (props.modalInfo.event.id);

    const faz = useCallback(
        async (evt) => {
            evt?.preventDefault();
            await drag(id, sta, end);
            location.reload(false);
        },
        [drag]
    )

    return(     
        <div>
            {faz()}
        </div>
    );
};