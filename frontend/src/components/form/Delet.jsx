import React, { useCallback, useRef } from "react";
import { usePocket } from "../../contexts/PocketContext";
import * as Form from '@radix-ui/react-form';
import * as RadioGroup from '@radix-ui/react-radio-group';
import {AiOutlineClose} from '@react-icons/all-files/ai/AiOutlineClose.esm';

export default function Delet(props){
    const {modalInfo} = props;
    const {setShowDelet} = props;
    const titleRef = useRef();
    const salaRef = useRef();
    const startRef = useRef();
    const endRef = useRef();
    let backgroundColor = modalInfo.event._def.ui.backgroundColor
    const { del, update } = usePocket();
    
    const deleteEvent = useCallback(
        async (evt) => {
            evt?.preventDefault();
            await del(props.modalInfo.event.id);
            location.reload(false);
        },
        [del]
    )

    const updateOnSubmit =  useCallback(
      async (evt) => {
        try{
            evt?.preventDefault();
            await update(
                props.modalInfo.event.id,
                titleRef.current.value, 
                salaRef.current.value,
                startRef.current.value,
                endRef.current.value,
                backgroundColor,
            );
            location.reload(false);
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
                <Form.Root className="grid justify-items-center" onSubmit={updateOnSubmit}>
                <Form.Field className="grid mb-[10px]" name="head">
                    <Form.Label className="mx-20 text-[35px] ">Dados do Evento</Form.Label>
                </Form.Field>
                    <Form.Field className="grid mb-[10px]" name="title">
                        <div className="flex items-baseline justify-between">
                            <Form.Label className="mx-20 text-[15px] font-medium leading-[35px] ">Título</Form.Label>
                            <Form.Message className="text-[13px]  opacity-[0.8]" match="valueMissing">
                                adicione um Título
                            </Form.Message>
                            <Form.Message className="text-[13px]  opacity-[0.8]"  match={(value, formData)=> value.length > 25}>
                                o Título deve ser curto  
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <input className="box-border w-full bg-[#e2e8f0] dark:bg-blackA6  shadow-blackA9 inline-flex h-10 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900"
                            type="text"
                            defaultValue={modalInfo.event._def.title}
                            required
                            ref={titleRef}
                            />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field className="grid mb-[10px]" name="title">
                        <div className="flex items-baseline justify-between">
                            <Form.Label className="mx-6 text-[15px] font-medium leading-[35px] ">Sala</Form.Label>
                            <Form.Message className="text-[13px]  opacity-[0.8]" match="valueMissing">
                                adicione uma sala
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <select ref = {salaRef} defaultValue={modalInfo.event._def.extendedProps.sala} className="box-border w-full bg-[#e2e8f0] dark:bg-blackA6  shadow-blackA9 inline-flex h-10 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900">
                                <option type="nome" value="Sala1" >Sala1 </option>
                                <option type="nome" value="Sala2" >Sala2</option>
                                <option type="nome" value="Sala3" >Sala3</option>
                            </select>
                        </Form.Control>
                    </Form.Field>
                    <Form.Field className="grid mb-[10px]" name="start">
                        <div className="flex items-baseline justify-between">
                            <Form.Label className="mx-20 text-[15px] font-medium leading-[35px] ">
                                Inicio
                            </Form.Label>
                            <Form.Message className="text-[13px]  opacity-[0.8]" match="valueMissing">
                                Adicione uma Data de Inicio
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <input 
                            type="datetime-local" 
                            defaultValue={modalInfo.el.fcSeg.eventRange.range.start?.toISOString().slice(0, 16)}
                            className="box-border w-full bg-[#e2e8f0] dark:bg-blackA6  shadow-blackA9 inline-flex h-10 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900"
                            required
                            ref={startRef}
                            />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field className="grid mb-[10px]" name="end">
                        <div className="flex items-baseline justify-between">
                            <Form.Label className="mx-20 text-[15px] font-medium leading-[35px]">
                                Fim 
                            </Form.Label>
                            <Form.Message className="text-[13px]  opacity-[0.8]" match="valueMissing">
                                Adicione uma Data Final
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <input 
                            type="datetime-local" 
                            defaultValue={modalInfo.el.fcSeg.eventRange.range.end?.toISOString().slice(0, 16)}
                            className="box-border w-full bg-[#e2e8f0] dark:bg-blackA6  shadow-blackA9 inline-flex h-10 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900"
                            required
                            ref={endRef}
                            />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label className="mx-20 text-[15px] font-medium leading-[35px]">
                            Cor do evento
                        </Form.Label>
                        <RadioGroup.Root className="flex pt-1 gap-2.5 my-2 justify-center align-middle outline-none cursor-default"
                            aria-label="View density"
                            defaultValue={backgroundColor}
                            onValueChange={(value)=>{     
                                if(value){                   
                                    backgroundColor = value;
                                }
                            }}
                            >
                            <div className="flex items-center">
                                <RadioGroup.Item className="bg-[#ff4f00] w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
                                value="#ff4f00"
                                id={0}
                                >
                                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[100%] after:bg-white"></RadioGroup.Indicator>
                                </RadioGroup.Item>
                            </div>
                            <div className="flex items-center">
                                <RadioGroup.Item className="bg-[#e55cff] w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
                                value="#e55cff"
                                id={1}
                                >
                                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[100%] after:bg-white"></RadioGroup.Indicator>
                                </RadioGroup.Item>
                            </div>
                            <div className="flex items-center">
                                <RadioGroup.Item className="bg-[#8247f5] w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
                                value="#8247f5"
                                id={2}
                                >
                                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[100%] after:bg-white"></RadioGroup.Indicator>
                                </RadioGroup.Item>
                            </div>
                            <div className="flex items-center">
                                <RadioGroup.Item className="bg-[#0099ff] w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
                                value="#0099ff"
                                id={3}
                                >
                                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[100%] after:bg-white"></RadioGroup.Indicator>
                                </RadioGroup.Item>
                            </div>
                            <div className="flex items-center">
                                <RadioGroup.Item className="bg-[#60ffff] w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
                                value="#60ffff"
                                id={4}
                                >
                                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[100%] after:bg-white"></RadioGroup.Indicator>
                                </RadioGroup.Item>
                            </div>
                            <div className="flex items-center">
                                <RadioGroup.Item className={`bg-[#17e885] w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default`}
                                value="#17e885"
                                id={5}
                                >
                                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[100%] after:bg-white"></RadioGroup.Indicator>
                                </RadioGroup.Item>
                            </div>
                            <div className="flex items-center">
                                <RadioGroup.Item className={`bg-[#ffa600] w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default`}
                                value="#ffa600"
                                id={6}
                                >
                                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[100%] after:bg-white"></RadioGroup.Indicator>
                                </RadioGroup.Item>
                            </div>
                        </RadioGroup.Root>
                    </Form.Field>
                    <Form.Submit asChild>
                        <button className='mt-3 dark:bg-dark-900 my-2 box-border w-full dark:text-white shadow-blackA7 dark:shadow-slate-500 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
                            Atualizar Evento
                        </button>
                    </Form.Submit>
                </Form.Root>
                <button className='bg-red-600 my-2 box-border w-full text-white shadow-blackA7 hover:dark:shadow-slate-500  inline-flex h-[35px] items-center justify-center rounded-lg px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' 
                onClick={() => {
                    if(window.confirm('Delete the Event?')){deleteEvent()};}}>
                    Deletar Evento
                </button>
                <button onClick={() => {
                    setShowDelet(false)
                    }}className='mt-3 dark:bg-dark-900 my-2 box-border w-full dark:text-white shadow-blackA7 dark:shadow-slate-500 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
                        Voltar
                </button>
            </div>
        </div>
    )
}