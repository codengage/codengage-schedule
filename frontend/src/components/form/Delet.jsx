import React, { useCallback, useRef } from "react";
import { usePocket } from "../../contexts/PocketContext";
import * as Form from '@radix-ui/react-form';
import {AiOutlineClose} from '@react-icons/all-files/ai/AiOutlineClose.esm'
import "../../styles/modal.css";

export default function Delet(props) {
    const {modalInfo} = props;
    const {setShowDelet} = props;
    const titleRef = useRef();
    const salaRef = useRef();
    const { del , update} = usePocket();

    const handleOnSubmit = useCallback(
        async (evt) => {
            evt?.preventDefault();
            await del(props.modalInfo.event.id);
            window.location.reload(true);
        },
        [del]
    )

    const up =  useCallback(
        async (evt) => {
          try{
          evt?.preventDefault();
          await update(
            props.modalInfo.event.id,
            titleRef.current.value, 
            salaRef.current.value,
            );
          window.location.reload();
          }catch(e){
          console.log(e.message)
          }
        },
        [update]
      );

    return( 
        <div className="modal__wrapper">
            <div className="simple__modal  dark:bg-dark-400 border-2 border-[#712cf9] dark:border-white">
            <span className="close__modal p-2">
                <AiOutlineClose 
                    className="bg-[#712cf9] rounded-lg  text-white"
                    onClick={() => {
                    setShowDelet(false)
                }}/> 
            </span>
            <Form.Root className="" >
                <Form.Field className="FormField" name="atualiza">
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <Form.Label className="FormLabel" >Titulo</Form.Label>
                </div>
                <Form.Control asChild>
                    <input className="w-full bg-[#e2e8f0] dark:bg-dark-800 inline-flex h-10 appearance-none items-center justify-center rounded-md" defaultValue={props.modalInfo.event.title} ref={titleRef}/>
                </Form.Control>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <Form.Label className="FormLabel">Sala</Form.Label>
                </div>
                <Form.Control asChild>
                    <input className="w-full bg-[#e2e8f0] dark:bg-dark-800 inline-flex h-10 appearance-none items-center justify-center rounded-md" defaultValue={props.modalInfo.event.extendedProps.sala} ref={salaRef}/>
                </Form.Control>
                </Form.Field>
            </Form.Root>

                <Form.Root className="" onSubmit={handleOnSubmit}>
                    <Form.Field className="grid mb-[10px]" name="title">
                        <div className="flex items-baseline justify-between">
                            <Form.Submit asChild>
                                <button className='mt-3 dark:bg-dark-900 my-2 box-border w-full dark:text-white shadow-blackA7 dark:shadow-slate-500 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
                                    Deletar
                                </button>
                            </Form.Submit>
                            <button onClick={() => {
                                up()
                            }}className='mt-3 dark:bg-dark-900 my-2 box-border w-full dark:text-white shadow-blackA7 dark:shadow-slate-500 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
                                Atualizar
                            </button>
                            <button onClick={() => {
                                setShowDelet(false)
                            }}className='mt-3 dark:bg-dark-900 my-2 box-border w-full dark:text-white shadow-blackA7 dark:shadow-slate-500 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
                                Voltar
                            </button>
                        </div>
                    </Form.Field>
                </Form.Root>
            </div>
        </div>
    );
};