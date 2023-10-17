import React, { useCallback, useRef } from "react";
import { usePocket } from "../contexts/PocketContext";
import { RxChevronLeft } from "react-icons/rx";
import * as Form from '@radix-ui/react-form';

export default function ForgotPassword(props){
  const {setShowForgotPassword} = props;
  const { retrive } = usePocket();
  const emailRef = useRef();

  const retriveOnSubmit = useCallback(
    async (evt) => {
        evt?.preventDefault();
        await retrive(emailRef.current.value,);
    },
    [retrive]
  )

  return(
    <div>
      <button
        className="m-[2%]"
        onClick={()=>{
            setShowForgotPassword(false)
        }}
        ><RxChevronLeft
        className="text-codengage-purple"
      /></button>
      <div>
        <Form.Root className="bg-[#e2e8f0 mt-[48%] dark:bg-dark-700 rounded-xl relative p-[30px]" onSubmit={retriveOnSubmit}>
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
          <Form.Submit asChild>
          <div className="text-center">
            <button type="submit" className="bg-codengage-purple p-2 rounded-xl justify-end">
                Recuperar senha
            </button>
          </div>
          </Form.Submit>
        </Form.Root>
      </div>
    </div>
  )
}