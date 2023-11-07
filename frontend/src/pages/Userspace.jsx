import React, { useCallback, useRef, useState } from "react";
import { usePocket } from "../contexts/PocketContext"; 
import * as Form from '@radix-ui/react-form';
import { Logo } from "../assets/Logo";
import { ClientResponseError } from "pocketbase";
import { useNavigate } from "react-router-dom";
import Userside from "../components/ui/Userside";
import AlertSuccess from "../components/ui/alerts/AlertSuccess";
import Panel from "../components/ui/Panel";

export default function Userspace (props) {
  const usernameRef = useRef();
  const emailRef = useRef();
  const { upuser, pb } = usePocket();
  const { logout, user, upavat } = usePocket();
  const navigate = useNavigate();
  const {setShowSuccessAlert, showSuccessAlert} = props;
  const [file, setFile] = useState();

  const handleClick = () => navigate("/Schedule")

  const handleOnSubmit = useCallback(
    async (evt) => {
      evt?.preventDefault();
      try{
      if(usernameRef.current.value.length > 2){
        await upuser(
          user.id,
          usernameRef.current.value,
          emailRef.current.value, 
          );
        alert('Usuário Atualizado')
        }else{
          alert('Nome de Usuario precisa de 3 caracteres')
        }
    } catch(e) {
        if(e instanceof ClientResponseError){
        setMessageAlert('Nome de usuário ou Email ja cadastrado')
      }else{
        setMessageAlert(e.message)
      }
      }
    },
    [upuser]
  );

  function handleChange(e) {
    setFile(e.target.files[0])
    //blob = setFile(URL.createObjectURL(e.target.files[0]))
  }

  const faz= useCallback(
    async (evt) => {
      evt?.preventDefault();
      try{
        await upavat(
        user.id,
        file
        )}catch(e){
          alert("Imagem invalida")
        }
    [upavat]
    })

  const [messageAlert, setMessageAlert] = useState("");

  return (
    <div className='flex'>
      <Userside/>
      <div className='border-l-2 border-black dark:border-white rounded-3xl font-light px-[2%] pt-[6%] shadow-xl shadow-black dark:shadow-white'>
        <Logo/> 
        {showSuccessAlert && <AlertSuccess message="Usuário cadastrado"/>}
        <main className="flex flex-col mt-3 gap-10 w-full ">
          <header className="text-center flex flex-col gap-4 w-full">
            <h1 className="font-sans text-4xl font-bol ">
              Alterar dados do Usuário
            </h1>
          </header>             
          <Form.Root onSubmit={handleOnSubmit} className="rounded-xl relative p-[30px]">
            <label className=" text-[15px] font-medium dark:text-white custum-file-upload" for="file">Avatar Atual
              <img className="rounded-full" src={pb.files.getUrl(user, user.avatar)} onError={(e) =>
                (
                  (e.target.src =
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Oxygen480-apps-preferences-contact-list.svg/128px-Oxygen480-apps-preferences-contact-list.svg.png")
                )
              } 
              style={{ width: '200px', }}/>
              <input type="file" onChange={handleChange}/>
              <button className='mb-[5%] h-12 bg-purple-500 dark:bg-purple-700 dark:hover:bg-purple-900 text-white hover:bg-purple-900 my-2 box-border w-full shadow-blackA7 dark:shadow-slate-500 inline-flex items-center justify-center rounded-lg px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' onClick={faz}>Mudar Avatar</button>
            </label>
            <Form.Field className="FormField grid mb-[5%]" name="name">
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px] dark:text-white">Nome de usuário</Form.Label>
                <Form.Message className="text-[13px] text-red-500 opacity-[0.8]" match="valueMissing">
                  * Insira o nome do usuário
                </Form.Message>
                <Form.Message className="text-[13px] text-red-500 opacity-[0.8]" match="typeMismatch">
                  * Nome de usuário invalido
                </Form.Message>
              </div>
              <Form.Control asChild >
                <input className="box-border w-full bg-[#e2e8f0] dark:bg-blackA6  shadow-blackA9 inline-flex h-12 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900"
                defaultValue={user.username}
                type="text"
                minLength="3"
                required
                ref={usernameRef}
                />
              </Form.Control>
            </Form.Field>
            <Form.Field className="FormField grid mb-[5%]" name="email">
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-[15px] font-medium leading-[35px] dark:text-white">Email</Form.Label>
                <Form.Message className="text-[13px] text-red-500 opacity-[0.8]" match="valueMissing">
                  * Insira seu email
                </Form.Message>
                <Form.Message className="text-[13px] text-red-500 opacity-[0.8]" match="typeMismatch">
                  * Email inválido
                </Form.Message>
              </div>
              <Form.Control asChild >
                <input className="box-border w-full bg-[#e2e8f0] dark:bg-blackA6  shadow-blackA9 inline-flex h-12 focus:border-[2px] focus:border-purple-600 appearance-none items-center justify-center rounded-lg px-[10px] text-[15px] leading-none outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-md focus:shadow-purple-900"
                  defaultValue={user.email}
                  type="email"
                  minLength="7"
                  required
                  ref={emailRef}
                />
              </Form.Control>
            </Form.Field>
            <div className="text-center grid">
              <button type="submit" className='mb-[5%] h-12 bg-purple-500 dark:bg-purple-700 dark:hover:bg-purple-900 text-white hover:bg-purple-900 my-2 box-border w-full shadow-blackA7 dark:shadow-slate-500 inline-flex items-center justify-center rounded-lg px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
                Update Usuário
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
      <div className="flex-auto translate-x-0.5 max-xl:hidden col-span-2 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-300 dark:via-purple-800 dark:to-purple-950 bg-cover bg-no-repeat">
        <Panel />
      </div>
    </div>
  );
};