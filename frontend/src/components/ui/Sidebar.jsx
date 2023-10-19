import SwitchTheme from './SwitchTheme';
import * as Toggle from '@radix-ui/react-toggle';
import { Link } from 'react-router-dom';
import { BsCalendar } from '@react-icons/all-files/bs/BsCalendar'
import { BsCalendarFill } from '@react-icons/all-files/bs/BsCalendarFill'
import { RxListBullet } from 'react-icons/rx';
import PopoverUser from './popover/PopoverUser';
import { useState } from 'react';
import ModalList from './modal/ModalList';
import { formatDate } from '@fullcalendar/core';
import Delet from "../form/Delet";

export default function Sidebar(props){
  const {currentEvents} = props;
  const {weekendsVisible} = props;
  const {setWeekendsVisible} = props;
  const [showModalList,  setShowModalList] = useState()
  
  return( 
    <div className='w-[5%] block dark:text-white'>   
      <div className='mt-[2%] flex flex-col items-center justify-between h-screen'>
        <PopoverUser/>
        <Toggle.Root
          defaultPressed={weekendsVisible}
          onPressedChange={(pressed)=>{
          setWeekendsVisible(!pressed);
          }}
        >
        {weekendsVisible ? <BsCalendarFill size={30}/>:<BsCalendar size={30}/>}
        </Toggle.Root>
          <button
          onClick={()=>{
          setShowModalList(true);
          }}
        >
        <RxListBullet size={30}/>
        </button>
          {showModalList && <ModalList 
          setShowModalList={setShowModalList}
          currentEvents={currentEvents}
          renderSidebarEvent={renderSidebarEvent}
        />}
        <SwitchTheme/>
      </div>
    </div>
  )
}

function renderSidebarEvent(event) {
  const [ showDelet, setShowDelet] = useState(false)
  const [modalInfo, setModalInfo] = useState({})

  return (
    <li key={event.id}>
      <div>
      <i>In: {event.extendedProps.sala} - Event:</i>
      <i> {event.title}  </i>
      <button onClick={() => {
                    console.log("go to delet modal")
                    //setShowDelet(true);
                    //setModalInfo(currentEvents);
                    }}className='mt-3 dark:bg-dark-900 my-2 box-border dark:text-white shadow-blackA7 dark:shadow-slate-500 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none' >
                        Update
                </button>
          {showDelet && <Delet 
          modalInfo={modalInfo}
          setShowDelet={setShowDelet}
          />}
      </div>
      <b>From: { 
        formatDate(event.start,{timeZone: 'UTC',locale:"pt-br", hour: 'numeric', month: 'short',minute: '2-digit', day: 'numeric', meridiem: 'short'}
      )}</b> until: 
      <b> { 
        formatDate(event.end,{timeZone: 'UTC',locale:"pt-br", hour: 'numeric', month: 'short',minute: '2-digit', day: 'numeric', meridiem: 'short'}
      )}</b>
      <br></br>
      <label>-------------------------------------------------------</label>
    </li>
  )
}