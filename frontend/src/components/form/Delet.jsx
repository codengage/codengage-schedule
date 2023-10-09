import React, { useCallback, useRef } from "react";
import { usePocket } from "../../contexts/PocketContext";
import * as Form from '@radix-ui/react-form';
import {AiOutlineClose} from '@react-icons/all-files/ai/AiOutlineClose.esm'

export default function Delet(props) {
    const {modalInfo} = props;
    const {setShowDelet} = props;
    const { del } = usePocket();

    const handleOnSubmit = useCallback(
        async (evt) => {
            evt?.preventDefault();
            await del(props.modalInfo.event.id);
            window.location.reload(true);
        },
        [del]
    )

    return( 
        <div className="modal__wrapper">
            <div className="single__modal  dark:bg-dark-400 border-2 border-[#712cf9] dark:border-white">
            <span className="close__modal p-2">
                <AiOutlineClose 
                    className="bg-[#712cf9] rounded-lg  text-white"
                    onClick={() => {
                    setShowDelet(false)
                }}/> 
            </span>
                <Form.Root className="w-[260px]" onSubmit={handleOnSubmit}>
                    <Form.Submit asChild>
                        <button className='mt-3 dark:bg-dark-900 my-2 box-border w-full dark:text-white shadow-blackA7 dark:shadow-slate-500 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
                            Clique para Deletar
                        </button>
                    </Form.Submit>
                </Form.Root>
                <button onClick={() => {
                    setShowDelet(false)
                }}className='mt-3 dark:bg-dark-900 my-2 box-border w-full dark:text-white shadow-blackA7 dark:shadow-slate-500 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
                    Clique para Voltar
                </button>
            </div>
        </div>
    );
};