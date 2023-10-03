import React, { useCallback, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePocket } from "../contexts/PocketContext";
import SwitchTheme from "../components/SwitchTheme";
import * as Form from '@radix-ui/react-form';
import Panel from "../components/Panel";
import {ChevronLeftIcon} from '@radix-ui/react-icons'

export default function SignUp () {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { register } = usePocket();
  const navigate = useNavigate();

  const handleOnSubmit = useCallback(
    async (evt) => {
      evt?.preventDefault();
      await register(
        emailRef.current.value, 
        passwordRef.current.value, 
        passwordConfirmRef.current.value
        );
      navigate("/");
    },
    [register]
  );

  return (
    
    <div className="grid grid-cols-2 h-screen bg-gray-50 dark:bg-dark-600">
   
    <div>
       <ChevronLeftIcon />
      <div className="my-[16%] mx-[26%]">
       
        <main className="flex flex-col mt-28 gap-10 w-full ">
          <header className="flex flex-col gap-4 w-full text-center ">
            <h1 className="font-sans text-4xl font-bol ">
              Criar Usuário
            </h1>
            <p className="font-sans font-normal text-base text-gray-600 dark:text-gray-300">
              Dados do Usuário
            </p>
          </header>
      <Form.Root onSubmit={handleOnSubmit} className="bg-[#e2e8f0] dark:bg-dark-700 rounded-xl relative p-[30px]">
      <Form.Field className="grid mb-[5%]" name="email">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] dark:text-white">Email</Form.Label>
        <Form.Message className="text-[13px] text-red-500 opacity-[0.8]" match="valueMissing">
          * Please enter your email
        </Form.Message>
        <Form.Message className="text-[13px] text-red-500 opacity-[0.8]" match="typeMismatch">
          * Please provide a valid email
        </Form.Message>
      </div>
      <Form.Control asChild >
        <input
          className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-12 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900 selection:color-white selection:bg-blackA9"
          type="email"
          required
          ref={emailRef}
        />
      </Form.Control>
    </Form.Field>
    <Form.Field className="grid mb-[5%]" name="password">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] dark:text-white">Senha</Form.Label>
        <Form.Message className="text-[13px] text-red-500 opacity-[0.8]" match="valueMissing">
          * Please enter your password
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-12 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900 selection:color-white selection:bg-blackA9"
          type="password"
          required
          ref={passwordRef}
        />
      </Form.Control>
    </Form.Field>
    <Form.Field className="grid mb-[10px]" name="password">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] dark:text-white">Confirmar senha</Form.Label>
        <Form.Message className="text-[13px] text-red-500 opacity-[0.8]" match="valueMissing">
          * Please confirm your password
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-12 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900 selection:color-white selection:bg-blackA9"
          type="password"
          required
          ref={passwordConfirmRef}
        />
      </Form.Control>
    </Form.Field>
       <div className="text-center grid">
       <button className='mb-[5%] h-12 bg-purple-500 dark:bg-purple-700 dark:hover:bg-purple-900 text-white hover:bg-purple-900 my-2 box-border w-full shadow-blackA7 dark:shadow-slate-500 inline-flex items-center justify-center rounded-lg px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
         Criar Usuário
        </button>
        <Link to="/">Ir para login</Link>
        
        </div>
        </Form.Root>
        </main>
        </div>
        
        </div>
      <Panel/>
    </div>
  );
};
