import React, { useCallback } from "react";
import { usePocket } from "../contexts/PocketContext";

export default function Delet(props) {
    const {modalInfo} = props;
    const { del } = usePocket();

    const faz = useCallback(
        async (evt) => {
            evt?.preventDefault();
            await del(props.modalInfo);
        },
        [del]
    )

    return( 
        faz()
    );
};