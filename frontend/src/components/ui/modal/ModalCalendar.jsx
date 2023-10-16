import { formatDate } from '@fullcalendar/core'
import FormModal from '../../form/FormModal';
import { RxCrossCircled } from 'react-icons/rx';


export default function ModalCalendar(props){
    const {modalInfo} = props;
    const {setShowModal} = props;
    const {setCurrentEvents} = props;
    console.log(modalInfo.startStr)
    return(
        <div className="modal__wrapper">
      <div className="single__modal  dark:bg-dark-400 border-2 border-[#712cf9] dark:border-white">
        <span className="close__modal -top-3 -right-3 bg-white dark:bg-dark-400 rounded-full">

        <RxCrossCircled
         size={30} 
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
