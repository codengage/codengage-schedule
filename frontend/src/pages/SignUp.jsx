import React, { useCallback, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePocket } from "../contexts/PocketContext";
import SwitchTheme from "../components/SwitchTheme";
import * as Form from '@radix-ui/react-form';

export const SignUp = () => {
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
    <section>
      <div className="bg-[#e2e8f0] dark:bg-dark-700 rounded-xl relative top-[50%] left-[50%] w-[500px] h-[500px] -translate-x-[50%] translate-y-[50%] p-[30px]">
      <Form.Root onSubmit={handleOnSubmit}>
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
      <Form.Control asChild>
        <input
          className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
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
          className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
          type="password"
          required
          ref={passwordRef}
        />
      </Form.Control>
    </Form.Field>
    <Form.Field className="grid mb-[10px]" name="password">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] dark:text-white">Confirmar senha</Form.Label>
        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
          Please confirm your password
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
          type="password"
          required
          ref={passwordConfirmRef}
        />
      </Form.Control>
    </Form.Field>
       <div className="text-center grid">
       <button className='bg-green-500 my-2 box-border w-full dark:text-white shadow-blackA7 dark:shadow-slate-500 hover:bg-green-400 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
          Criar
        </button>
        <Link to="/">Ir para login</Link>
        <Link to="/demoapp">Ir Calendario</Link>
        </div>
        </Form.Root>
        </div>
      <SwitchTheme/>
    </section>
  );
};
