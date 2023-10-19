import React, { useCallback, useRef } from "react";
import { usePocket } from "../../contexts/PocketContext";
import * as Form from '@radix-ui/react-form';
import { useQuery } from "@tanstack/react-query";

export default function Pop(props) {
    const { criador } = usePocket();
    const title = (props.modalInfo.event.title);
    const creator = (props.modalInfo.event.extendedProps.creator);
    const sala = (props.modalInfo.event.extendedProps.sala);
    
    const dono = useCallback(
        async (evt) => {
            await criador(creator)
        },
        [criador]
    )

    return(     
        dono(creator),
        <div className="pop__wrapper">
            <Form.Root>
                <Form.Field className="grid mb-[10px]" name="title">
                <Form.Label className="text-[15px] font-medium leading-[35px] text-white ">Title: </Form.Label>
                    <Form.Control asChild>
                        <input className="box-border w-full bg-[#e2e8f0] dark:bg-black  shadow-blackA9 inline-flex h-10 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900"
                        type="text"
                        defaultValue={title}
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="grid mb-[10px]" name="creator">
                <Form.Label className="text-[15px] font-medium leading-[35px] text-white ">Sala: </Form.Label>
                    <Form.Control asChild>
                        <input className="box-border w-full bg-[#e2e8f0] dark:bg-black  shadow-blackA9 inline-flex h-10 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900"
                        type="text"
                        defaultValue={sala}
                        />
                    </Form.Control>
                </Form.Field>
            </Form.Root>   
        </div>
    );
};