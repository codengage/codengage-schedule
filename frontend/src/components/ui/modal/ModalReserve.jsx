import "../../../styles/modal.css";
import { RxCrossCircled } from "react-icons/rx";



export default function ModalEvent(props){
  const {setShowModalEvent} = props;
  const {modalInfo} = props

  return (
        <div className="modal__wrapper">
      <div className="single__modal  dark:bg-dark-400 border-2  dark:border-white">
        <span className="close__modal -top-3 -right-3 bg-white dark:bg-dark-400 rounded-full">
          
         <RxCrossCircled
         size={30} 
          onClick={() => {
            setShowModalEvent(false)
             }}/> 

        </span>
        <header className="text-center mt-2">
        <h1>{modalInfo.event._def.title}</h1>
      </header>
      <main>

      </main>
      <footer>
        
      </footer>
      </div>
    </div>
  );
};