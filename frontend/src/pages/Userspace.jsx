import React, { useCallback, useRef, useState} from "react";
import { usePocket } from "../contexts/PocketContext"; 
import SwitchTheme from "../components/ui/SwitchTheme";
import * as Form from '@radix-ui/react-form';
import { Logo } from "../assets/Logo";
import AlertDanger from "../components/ui/alerts/AlertDanger";
import { ClientResponseError } from "pocketbase";
import { useNavigate } from "react-router-dom";
import Userside from "../components/ui/Userside";

export default function Userspace (props) {
  const {setShowSuccessAlert} = props;
  const usernameRef = useRef();
  const emailRef = useRef();
  const { upuser, pb } = usePocket();
  const { logout, user } = usePocket();
  const navigate = useNavigate();

  const handleClick = () => navigate("/Schedule")

  const handleOnSubmit = useCallback(
    async (evt) => {
      evt?.preventDefault();
      try{
      await upuser(
        user.id,
        usernameRef.current.value,
        emailRef.current.value, 
        );
      setShowSuccessAlert(true);
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
    [upuser]
  );

  const [messageAlert, setMessageAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className='flex flex-bold '>
      <Userside/>
      <div className='w-[100%] border-l-2 border-black dark:border-white rounded-l-3xl font-light px-[2%] pt-[6%] shadow-xl shadow-black dark:shadow-white'>
        <Logo/> 
        {showAlert && <AlertDanger message={messageAlert} signIn={false}/>}
        <main className="flex flex-col mt-3 gap-10 w-full ">
          <header className="text-center flex flex-col gap-4 w-full">
            <h1 className="font-sans text-4xl font-bol ">
              Alterar dados do Usuário
            </h1>
          </header>
          <Form.Root onSubmit={handleOnSubmit} className="rounded-xl relative p-[30px]">
            <Form.Field className="grid mb-[5%]" name="avatar">
              <Form.Control asChild >
                <Form.Label className="text-[15px] font-medium leading-[35px] dark:text-white custum-file-upload" for="file">Avatar
                  <img className="" src={pb.files.getUrl(user, user.avatar)} alt="Avatar" style={{ width: '200px', }}/>
                  <input type="file" id="file"/>
                </Form.Label>
              </Form.Control>
            </Form.Field>
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
                defaultValue={user.username}
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
                  defaultValue={user.email}
                  type="email"
                  required
                  ref={emailRef}
                />
              </Form.Control>
            </Form.Field>
            <div className="text-center grid">
              <button type="submit" className='mb-[5%] h-12 bg-purple-500 dark:bg-purple-700 dark:hover:bg-purple-900 text-white hover:bg-purple-900 my-2 box-border w-full shadow-blackA7 dark:shadow-slate-500 inline-flex items-center justify-center rounded-lg px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
                Alterar Usuário
              </button>
              <button className='mb-[5%] h-12 bg-purple-500 dark:bg-purple-700 dark:hover:bg-purple-900 text-white hover:bg-purple-900 my-2 box-border w-full shadow-blackA7 dark:shadow-slate-500 inline-flex items-center justify-center rounded-lg px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' 
              onClick={handleClick}>
                Voltar
              </button>
              <button className='bg-red-600 my-2 box-border w-full text-white shadow-blackA7 hover:dark:shadow-slate-500  inline-flex h-[35px] items-center justify-center rounded-lg px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' onClick={logout}>
                Deslogar
              </button>
            </div>
          </Form.Root>
        </main>
      </div>
    </div>
  );
};