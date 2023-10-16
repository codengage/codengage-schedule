import React, { useCallback, useRef, useState} from "react";
import { usePocket } from "../contexts/PocketContext";
import SwitchTheme from "./ui/SwitchTheme";
import * as Form from '@radix-ui/react-form';
import { Logo } from "../assets/Logo";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import * as Toggle from '@radix-ui/react-toggle';
import AlertDanger from "./ui/alerts/AlertDanger";
import { ClientResponseError } from "pocketbase";

export default function SignUp (props) {
  const {setShowSignUp} = props;
  const {setShowSuccessAlert} = props;
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { register } = usePocket();

  const handleOnSubmit = useCallback(
    async (evt) => {
      evt?.preventDefault();
      try{
      await register(
        usernameRef.current.value,
        emailRef.current.value, 
        passwordRef.current.value, 
        passwordConfirmRef.current.value
        );
      setShowSuccessAlert(true);
      setShowSignUp(false);
    }
      catch(e){
        setShowAlert(true)
        if(e instanceof ClientResponseError){
        setMessageAlert('Nome de usuário ou Email ja cadastrado')
      }else{
        setMessageAlert(e.message)
      }
      }
     
    },
    [register]
  );

  const [messageAlert, setMessageAlert] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  return (
    <div>
      <div className="xl:hidden absolute ml-[90%] mt-[3%]  ">
        <SwitchTheme/>
      </div>
      <div className=" mx-4 mt-[10%] xl:mt-[10%] xl:mx-[6%] ">
        <Logo/> 
        {showAlert && <AlertDanger message={messageAlert} signIn={false}/>}
        <main className="flex flex-col mt-3 gap-10 w-full ">
          <header className="flex flex-col gap-4 w-full ">
            <h1 className="font-sans text-4xl font-bol ">
              Criar Usuário
            </h1>
            <p className="font-sans font-normal text-base text-gray-600 dark:text-gray-300">
              Dados do Usuário
            </p>
          </header>
          <Form.Root onSubmit={handleOnSubmit} className="rounded-xl relative p-[30px]">
            <Form.Field className="grid mb-[5%]" name="email">
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px] dark:text-white">Nome de usuário</Form.Label>
                <Form.Message className="text-[13px] text-red-500 opacity-[0.8]" match="valueMissing">
                  * Please enter your Username
                </Form.Message>
                <Form.Message className="text-[13px] text-red-500 opacity-[0.8]" match="typeMismatch">
                  * This Username is invalid
                </Form.Message>
              </div>
              <Form.Control asChild >
                <input className="box-border w-full bg-[#e2e8f0] dark:bg-blackA6  shadow-blackA9 inline-flex h-12 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900"
                type="text"
                required
                ref={usernameRef}
                />
              </Form.Control>
            </Form.Field>
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
                <input className="box-border w-full bg-[#e2e8f0] dark:bg-blackA6  shadow-blackA9 inline-flex h-12 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900"
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
                  * Please enter your password.
                </Form.Message>
                <Form.Message className="text-[13px] text-red-500 opacity-[0.8]" match={(value, formData)=> value.length < 8 || value.length > 72}>
                  * The length must be between 8 and 72.
                </Form.Message>
              </div>
              <div className="flex items-baseline justify-between">
                <Form.Control asChild>
                  <input
                    name="password"
                    className="box-border w-full bg-[#e2e8f0] dark:bg-blackA6  shadow-blackA9 inline-flex h-12 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900"
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
            <Form.Field className="grid mb-[10px]" name="passwordConfirm">
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px] dark:text-white">Confirmar senha</Form.Label>
                <Form.Message className="text-[13px] text-red-500 opacity-[0.8]" match="valueMissing">
                  * Please confirm your password.
                </Form.Message>
                <Form.Message className="text-[13px] text-red-500 opacity-[0.8]" match={(value, formData)=> value !== passwordRef.current.value}>
                  * Values don't match.
                </Form.Message>
                {}
              </div>
              <div className="flex items-baseline justify-between">
                <Form.Control asChild>
                  <input
                    name="passwordConfirm" className="box-border w-full bg-[#e2e8f0] dark:bg-blackA6  shadow-blackA9 inline-flex h-12 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900"
                    type={showPassword ? 'text' : 'password'}
                    required
                    ref={passwordConfirmRef}
                  />
                </Form.Control>
                <Toggle.Root className="flex items-center justify-center w-10 h-10"
                  onClick={() => setShowPassword(!showPassword)}
                  >
                  {showPassword ? <EyeOpenIcon/> : <EyeClosedIcon/>}
                </Toggle.Root> 
              </div>
            </Form.Field>
            <div className="text-center grid">
              <button type="submit" className='mb-[5%] h-12 bg-purple-500 dark:bg-purple-700 dark:hover:bg-purple-900 text-white hover:bg-purple-900 my-2 box-border w-full shadow-blackA7 dark:shadow-slate-500 inline-flex items-center justify-center rounded-lg px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
                Criar Usuário
              </button>
              <button onClick={()=> setShowSignUp(false)}>
                Ir para login
              </button>
            </div>
          </Form.Root>
        </main>
      </div>
    </div>
  );
};
