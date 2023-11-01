import "../../../styles/modal.css";
import { RxCrossCircled } from "react-icons/rx";
import { usePocket } from "../../../contexts/PocketContext"; 
import { records } from "../../../utils/event-use";

export default function ModalUser(props){
  const {setShowModalUser} = props;
  const { user } = usePocket();
  const {renderSidebarEvent} = props;
  
  if (records[0].reserva <= 0) {
    alert("Reservas do Usuário Vazia");
    setShowModalUser(false);
  }

  return (
    <div className="modal__wrapper">
      <div className="list__modal overflow-y-auto overflow-hidden dark:bg-dark-400 border-2 border-[#712cf9] dark:border-white">
        <span className="close__modal bg-white dark:bg-dark-400 rounded-full">
          <RxCrossCircled
          size={30} 
          onClick={() => {setShowModalUser(false)}}/> 
        </span>
        <div className='p-[2rem]'>
          <h2>Reservas de {user.username}: </h2>
          <h2>-------------------------------------------------------</h2>
            {records.map(val => {
              return(
                <ul>
              {val.expand.reserva.map(renderSidebarEvent)}
              </ul>
              )
              })}
          <button onClick={() => {
              setShowModalUser(false)
              }}className='mt-3 dark:bg-dark-900 my-2 box-border w-full dark:text-white shadow-blackA7 dark:shadow-slate-500 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
                Voltar
          </button>
        </div>
      </div>
    </div>
  );
};
