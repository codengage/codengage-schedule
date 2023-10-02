import React, { useRef, useCallback, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePocket } from "../contexts/PocketContext";
import * as Form from '@radix-ui/react-form';
import SwitchTheme from '../components/SwitchTheme'
import useDarkSide from "../utils/useDarkSide";
import LightLogo from '../assets/logo-codengage.svg';
import DarkLogo from '../assets/logo-codengage-dark.svg';
import Modal from "../components/ModalSigUp";


export const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = usePocket();
  const navigate = useNavigate();

  const handleOnSubmit = useCallback(
    async (evt) => {
      evt?.preventDefault();
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/demoapp");
    },
    [login]
  );

  
  const [showModal, setShowModal] = useState(false);
  const [themeLogo, setThemeLogo] = useState(true);

  return (
    <div className="grid grid-cols-2 h-screen bg-gray-50 dark:bg-dark-600">
      {showModal && <Modal setShowModal={setShowModal}/>}
    <div>
      <div className="py-10 px-28">
       
        <main className="flex flex-col mt-28 gap-10 w-full max-w-[384px]">
          <header className="flex flex-col gap-4 w-full max-w-[350px]">
            <h1 className="font-sans text-4xl font-bol">
              Acesse a plataforma
            </h1>
            <p className="font-sans font-normal text-base text-gray-600 dark:text-gray-300">
              Faça login ou registre-se.
            </p>
          </header>
      <Form.Root onSubmit={handleOnSubmit} className="bg-[#e2e8f0] dark:bg-dark-700 rounded-xl relative p-[30px]">
      <Form.Field className="grid mb-[10px]" name="email">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] dark:text-white">Email</Form.Label>
        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
          Please enter your email
        </Form.Message>
        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </div>
      <Form.Control asChild >
        <input
          className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900 selection:color-white selection:bg-blackA9"
          type="email"
          required
          ref={emailRef}
        />
      </Form.Control>
    </Form.Field>
    <Form.Field className="grid mb-[10px]" name="password">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] dark:text-white">Senha</Form.Label>
        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
          Please enter your password
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900 selection:color-white selection:bg-blackA9"
          type="password"
          required
          ref={passwordRef}
        />
      </Form.Control>
    </Form.Field>
    <div className="text-center">
    <button className='bg-purple-700 text-white hover:bg-purple-900 my-2 box-border w-full shadow-blackA7 dark:shadow-slate-500 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
         Fazer Login
        </button>
        <br></br>
        Ainda não é usuário?
        <Link className="text-purple-700 hover:text-purple-500" onClick={setShowModal(true)}><strong> Crie seu usuário!</strong></Link>

        </div>
        
      </Form.Root>
    
    </main>
    </div>
    </div>
    <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-purple-300 dark:via-purple-800 dark:to-purple-950 bg-cover bg-no-repeat">
    <div className="ml-[90vh] mt-[3vh]">
    <SwitchTheme/>
    </div>
    <img src={DarkLogo} alt="Codengage" className="m-[40vh]"/>
  </div>
  </div>
  );
};
