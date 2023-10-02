
import "../styles/modal.css";
import {AiOutlineClose} from '@react-icons/all-files/ai/AiOutlineClose.esm'
import * as Form from '@radix-ui/react-form';

const Modal = ({setShowModal}) => {
    console.log(setShowModal)
  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal bg-purple-600">
        <AiOutlineClose 
          className="bg-blue-600 rounded-lg  text-white"
          onClick={() => setShowModal(true)}/>
        </span>
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
         Criar usuario
        </button>
        </div>
        
      </Form.Root>
      </div>
    </div>
  );
};

export default Modal;