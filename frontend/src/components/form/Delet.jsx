import React, { useCallback, useRef } from "react";
import { usePocket } from "../../contexts/PocketContext";
import * as Form from '@radix-ui/react-form';
import {AiOutlineClose} from '@react-icons/all-files/ai/AiOutlineClose.esm'

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
            <div className="single__modal  dark:bg-dark-400 border-2 border-[#712cf9] dark:border-white">
            <span className="close__modal p-2">
                <AiOutlineClose 
                    className="bg-[#712cf9] rounded-lg  text-white"
                    onClick={() => {
                    setShowDelet(false)
                }}/> 
            </span>
            <div className="p-6 max-w-sm mx-auto bg-gray-500 rounded-xl shadow-md flex items-center space-x-4">
                <section>
                <label className="block uppercase tracking-wide text-gray-700 text-center font-bold mb-2">
                    Evento:
                </label>
                <input className="w-full bg-[#e2e8f0] dark:bg-dark-800 inline-flex h-10 appearance-none items-center justify-center rounded-md" defaultValue={props.modalInfo.event.title} ref={titleRef}></input>
                <select  className="w-full dark:bg-dark-800 inline-flex h-[35px] appearance-none items-center justify-center rounded-md" placeholder={props.modalInfo.event.sala} ref={salaRef}>
                    <option type="nome" value="Sala1" >Sala1 </option>
                    <option type="nome" value="Sala2" >Sala2</option>
                    <option type="nome" value="Sala3" >Sala3</option>
                </select>
                </section>
            </div>
                <Form.Root onSubmit={handleOnSubmit}>
                    <Form.Submit asChild>
                        <button className='mt-3 dark:bg-dark-900 my-2 box-border w-full dark:text-white shadow-blackA7 dark:shadow-slate-500 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
                            Clique para Deletar
                        </button>
                    </Form.Submit>
                </Form.Root>
                <button onClick={() => {
                    up()
                }}className='mt-3 dark:bg-dark-900 my-2 box-border w-full dark:text-white shadow-blackA7 dark:shadow-slate-500 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
                    Clique para Atualizar
                </button>
                <button onClick={() => {
                    setShowDelet(false)
                }}className='mt-3 dark:bg-dark-900 my-2 box-border w-full dark:text-white shadow-blackA7 dark:shadow-slate-500 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
                    Clique para Voltar
                </button>
            </div>
        </div>
    );
};