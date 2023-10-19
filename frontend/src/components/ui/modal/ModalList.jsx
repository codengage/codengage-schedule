import "../../../styles/modal.css";
import { RxCrossCircled } from "react-icons/rx";

export default function ModalList(props){
  const {setShowModalList} = props;
  const {currentEvents} = props;
  const {renderSidebarEvent} = props;

  return (
    <div className="list__wrapper">
      <div className="list__modal hover:overflow-y-auto overflow-hidden dark:bg-dark-400 border-2 border-[#712cf9] dark:border-white">
        <span className="close__modal bg-white dark:bg-dark-400 rounded-full">
          <RxCrossCircled
          size={30} 
          onClick={() => {setShowModalList(false)}}/> 
        </span>
        <div className='p-[2rem]'>
          <h2>Todas as Reservas ({currentEvents.length})</h2>
          <ul>
            {currentEvents.map(renderSidebarEvent)}
          </ul>
          <button onClick={() => {
                    setShowModalList(false)
                    }}className='mt-3 dark:bg-dark-900 my-2 box-border w-full dark:text-white shadow-blackA7 dark:shadow-slate-500 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
                        Voltar
                </button>
        </div>
      </div>
    </div>
  );
};
