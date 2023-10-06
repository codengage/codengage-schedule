import {AiOutlineClose} from '@react-icons/all-files/ai/AiOutlineClose.esm'
import { formatDate } from '@fullcalendar/core'
import FormModal from './form/FormModal';

export default function ModalCalendar(props){
    const {modalInfo} = props;
    const {setShowModal} = props;
    const {setCurrentEvents} = props;
    return(
        <div className="modal__wrapper">
      <div className="single__modal  dark:bg-dark-400 border-2 border-[#712cf9] dark:border-white">
        <span className="close__modal p-2">

          <AiOutlineClose 
          className="bg-[#712cf9] rounded-lg  text-white"
          onClick={() => {
            setShowModal(false)
             }}/> 
          
        </span>
        <div className="p-3 rounded-md">
        <h6 className="text-center mt-2">
        
         <b>{formatDate(modalInfo.start,{timeZone: 'UTC',locale:"pt-br", weekday: 'long', omitCommas: true })}</b>
         <br/><b>{formatDate(modalInfo.start,{timeZone: 'UTC',locale:"pt-br"})}</b>
        
        </h6>
      <div className='flex justify-center '>

      
             <FormModal 
             modalInfo={modalInfo} 
             setShowModal={setShowModal}
             setCurrentEvents={setCurrentEvents}
             />
  
         
        </div>
        </div>
      </div>
    </div>
    )
}
