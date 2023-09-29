import React, { useCallback, useRef } from "react";
import { useNavigate} from "react-router-dom";
import { usePocket } from "../contexts/PocketContext";
import * as Form from '@radix-ui/react-form';
import * as RadioGroup from '@radix-ui/react-radio-group';



export default function FormModal(props){
    const {modalInfo} = props;
    const titleRef = useRef();
    const startRef = useRef();
    const endRef = useRef();
     let backgroundColor = ''
    const { registerReserve } = usePocket();
    const navigate = useNavigate();

    const handleOnSubmit =  useCallback(
        async (evt) => {
          evt?.preventDefault();
          await registerReserve(
            titleRef.current.value, 
            startRef.current.value,
            endRef.current.value,
            backgroundColor
            );
            window.location.reload();
        },
        [registerReserve]
      );

       
    return(

        <Form.Root className="w-[260px]" 
        // `onSubmit` only triggered if it passes client-side validation
        onSubmit={handleOnSubmit}
    >
      <Form.Field className="grid mb-[10px]" name="title">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] ">Título</Form.Label>
          <Form.Message className="text-[13px]  opacity-[0.8]" match="valueMissing">
             adicione um Título
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="w-full dark:bg-dark-800 inline-flex h-[35px] appearance-none items-center justify-center rounded-md"
            type="text"
            required
            ref={titleRef}
          />
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
        className="w-full dark:bg-dark-800 rounded-md"
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
        defaultValue={modalInfo.startStr}
        className="w-full dark:bg-dark-800 rounded-md"
        required
        ref={endRef}
        />
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Label>
          Cor do evento
        </Form.Label>

        <RadioGroup.Root
      className="flex pt-1 gap-2.5"
      defaultValue="#0ae8f0"
      aria-label="View density"
      onValueChange={(value)=>{
        backgroundColor = value
      }}
      
    >
       
<div className="flex items-center">
  <RadioGroup.Item
    className="bg-[#ff4f00] w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
    value="#ff4f00"
    id={0}
  >
    <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[100%] after:bg-white"></RadioGroup.Indicator>
  </RadioGroup.Item>
</div>

 
<div className="flex items-center">
  <RadioGroup.Item
    className="bg-[#e55cff] w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
    value="#e55cff"
    id={1}
  >
    <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[100%] after:bg-white"></RadioGroup.Indicator>
  </RadioGroup.Item>
</div>


<div className="flex items-center">
  <RadioGroup.Item
    className="bg-[#8247f5] w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
    value="#8247f5"
    id={2}
  >
    <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[100%] after:bg-white"></RadioGroup.Indicator>
  </RadioGroup.Item>
</div>

 
<div className="flex items-center">
  <RadioGroup.Item
    className="bg-[#0099ff] w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
    value="#0099ff"
    id={3}
  >
    <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[100%] after:bg-white"></RadioGroup.Indicator>
  </RadioGroup.Item>
</div>

 
<div className="flex items-center">
  <RadioGroup.Item
    className="bg-[#0ae8f0] w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
    value="#0ae8f0"
    id={4}
  >
    <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[100%] after:bg-white"></RadioGroup.Indicator>
  </RadioGroup.Item>
</div>

<div className="flex items-center">
  <RadioGroup.Item
    className={`bg-[#17e885] w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default`}
    value="#17e885"
    id={5}
  >
    <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[100%] after:bg-white"></RadioGroup.Indicator>
  </RadioGroup.Item>
</div>

<div className="flex items-center">
  <RadioGroup.Item
    className={`bg-[#ffa600] w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default`}
    value="#ffa600"
    id={6}
  >
    <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[100%] after:bg-white"></RadioGroup.Indicator>
  </RadioGroup.Item>
</div>
      
    </RadioGroup.Root>
        
      </Form.Field>
      <Form.Submit asChild>
        <button className="box-border w-full text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]" >
          Post 
        </button>
      </Form.Submit>
    </Form.Root>
      )

}