import "../../../styles/modal.css";
import { RxCrossCircled } from "react-icons/rx";



export default function ModalList(props){
  const {setShowModalList} = props;
  const {currentEvents} = props;
  const {renderSidebarEvent} = props;

  return (
        <div className="modal__wrapper">
      <div className="single__modal  dark:bg-dark-400 border-2 border-[#712cf9] dark:border-white">
        <span className="close__modal -top-3 -right-3 bg-white dark:bg-dark-400 rounded-full">
         <RxCrossCircled
         size={30} 
          onClick={() => {
            setShowModalList(false)
             }}/> 

        </span>
        <div className='p-[2rem]'>
      <h2>Todas as Reservas ({currentEvents.length})</h2>
      <ul>
        {currentEvents.map(renderSidebarEvent)}
      </ul>
    </div>
      </div>
    </div>
  );
};
