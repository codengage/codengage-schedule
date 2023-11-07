import React, { useCallback, useRef } from "react";
import { usePocket } from "../../contexts/PocketContext";
import * as Form from '@radix-ui/react-form';
import * as RadioGroup from '@radix-ui/react-radio-group';

export default function FormModal(props){
  const {modalInfo} = props;
  const titleRef = useRef();
  const salaRef = useRef();
  const startRef = useRef();
  const endRef = useRef();
  let backgroundColor = '#8247f5'
  const { registerReserve } = usePocket();
  const { user } = usePocket();
  const creator = user.id;

  const handleOnSubmit =  useCallback(
      async (evt) => {
        evt?.preventDefault();
        await registerReserve(
          titleRef.current.value,
          creator, 
          salaRef.current.value,
          startRef.current.value,
          endRef.current.value,
          backgroundColor
        );
        window.location.reload();
      },
      [registerReserve]
    );

  return(
    <Form.Root className="w-[260px]" onSubmit={handleOnSubmit}>
      <Form.Field className="grid mb-[10px]" name="title">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] ">Evento</Form.Label>
          <Form.Message className="text-[13px]  opacity-[0.8]" match="valueMissing">
            Adicione um Título
          </Form.Message>
          <Form.Message className="text-[13px]  opacity-[0.8]"  match={(value, formData)=> value.length > 25}>
            o Título deve ser curto  
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input  className="box-border w-full bg-[#e2e8f0] dark:bg-blackA6  shadow-blackA9 inline-flex h-10 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900"
          type="text"
          required
          ref={titleRef}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-[10px]" name="title">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] ">Sala</Form.Label>
        </div>
        <Form.Control asChild>
          <select ref = {salaRef} className="box-border w-full bg-[#e2e8f0] dark:bg-blackA6  shadow-blackA9 inline-flex h-10 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900">
            <option type="nome" value="Sala1" >Sala1 </option>
            <option type="nome" value="Sala2" >Sala2</option>
            <option type="nome" value="Sala3" >Sala3</option>
          </select>
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-[10px]" name="start">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] ">
            Inicio
          </Form.Label>
          <Form.Message className="text-[13px]  opacity-[0.8]" match="valueMissing">
            Adicione uma Data de Inicio
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input 
          type="datetime-local" 
          defaultValue={modalInfo.startStr}
          className="box-border w-full bg-[#e2e8f0] dark:bg-blackA6  shadow-blackA9 inline-flex h-10 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900"
          required
          ref={startRef}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-[10px]" name="end">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] ">
            Fim 
          </Form.Label>
          <Form.Message className="text-[13px]  opacity-[0.8]" match="valueMissing">
            Adicione uma Data Final
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input 
          type="datetime-local" 
          defaultValue={modalInfo.endStr}
          className="box-border w-full bg-[#e2e8f0] dark:bg-blackA6  shadow-blackA9 inline-flex h-10 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900"
          required
          ref={endRef}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>
          Cor do evento
        </Form.Label>
        <RadioGroup.Root className="flex pt-1 gap-2.5 justify-center align-middle outline-none cursor-default"
          aria-label="View density"
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
        <button className='dark:bg-dark-900 my-2 box-border w-full dark:text-white shadow-blackA7 dark:shadow-slate-500 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-lg bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
          Criar
        </button>
      </Form.Submit>
    </Form.Root>
    )
}