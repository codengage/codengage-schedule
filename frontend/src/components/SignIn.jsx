import React, { useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePocket } from "../contexts/PocketContext";
import * as Form from '@radix-ui/react-form';
import * as Toggle from '@radix-ui/react-toggle';
import SwitchTheme from './ui/SwitchTheme'
import { Logo } from "../assets/Logo";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import AlertDanger from "./ui/alerts/AlertDanger";
import { ClientResponseError } from "pocketbase";
import AlertSuccess from "./ui/alerts/AlertSuccess";

export default function SignIn(props) {
  const {setShowSignUp} = props;
  const {showSuccessAlert} = props;
  const {setShowForgotPassword} = props;
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = usePocket();
  const navigate = useNavigate();

  const handleOnSubmit = useCallback(
    async (evt) => {
      try{
        evt?.preventDefault();
        await login(emailRef.current.value, passwordRef.current.value);
        navigate("/schedule")
      }catch(e){
        setShowAlert(true)
        if(e instanceof ClientResponseError){
          setMessageAlert("E-mail ou senha incorreta. Tente novamente ou ")
        }else{
          setMessageAlert(e.message)
        }
      }
    },
    [login]
  );

  const [messageAlert, setMessageAlert] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showDangerAlert, setShowAlert] = useState(false);

  return (
    <div>
      <div className="absolute ml-[90%] mt-[3%] ">
        <SwitchTheme/>
      </div>
      <div className="mt-[20%] mx-4 xl:mt-[26%] xl:mx-[6%] ">
        <Logo/>
        {showSuccessAlert && <AlertSuccess message="Usuário cadastrado"/>}
        {showDangerAlert && <AlertDanger
          message={messageAlert} 
          signIn={true}
          setShowSignUp={setShowSignUp}
          />
        }
        <main className="flex flex-col mt-3 gap-10 w-full ">
          <header className="flex flex-col gap-4 w-full ">
            <h1 className="font-sans text-4xl font-bol ">
              Acesse a plataforma
            </h1>
            <p className="font-sans font-normal text-base text-gray-600 dark:text-gray-300">
              Faça login ou registre-se.
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
                <input className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-12 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900 selection:color-white selection:bg-blackA9"
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
              <div className="flex items-baseline justify-between">
                <Form.Control asChild>
                  <input className="w-full bg-blackA5 shadow-blackA9 inline-flex h-12 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900 selection:color-white selection:bg-blackA9"
                    type={showPassword ? 'text' : 'password'}
                    required
                    ref={passwordRef}
                  />
                </Form.Control>  
                <Toggle.Root className="flex items-center justify-center w-10 h-10"
                  onClick={() => setShowPassword(!showPassword)}
                  >
                  {showPassword ? <EyeOpenIcon/> : <EyeClosedIcon/>}
                </Toggle.Root>  
              </div>
            </Form.Field>
            <div className="text-center">
              <button className='mb-[5%] h-12 bg-purple-500 dark:bg-purple-700 dark:hover:bg-purple-900 text-white hover:bg-purple-900 my-2 box-border w-full shadow-blackA7 dark:shadow-slate-500 inline-flex items-center justify-center rounded-lg px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
                Fazer Login
              </button>
              <label>Ainda não é usuário? </label>
              <button className="text-purple-700 hover:text-purple-500" 
                onClick={()=>{setShowSignUp(true)}}
                >
                <strong>Crie seu usuário!</strong>
              </button>
            </div>
          </Form.Root>
          <button className="text-purple-700 hover:text-purple-500"
            onClick={()=>{setShowForgotPassword(true)}}
            >
            Esqueci minha senha
          </button>
        </main>
      </div>
    </div>
  );
};
