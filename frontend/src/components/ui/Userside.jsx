import SwitchTheme from './SwitchTheme';
import * as Toggle from '@radix-ui/react-toggle';
import { Link } from 'react-router-dom';
import { BsCalendar } from '@react-icons/all-files/bs/BsCalendar'
import { BsCalendarFill } from '@react-icons/all-files/bs/BsCalendarFill'
import { RxListBullet } from 'react-icons/rx';
import PopoverUser from './popover/PopoverUser';
import { useState } from 'react';
import ModalUser from './modal/ModalUser';
import { formatDate } from '@fullcalendar/core';
import Upmod from './modal/Upmod';

export default function Userside(props){
    const [ShowModalUser,  setShowModalUser] = useState()
  
  return( 
    <div className='w-[5%] block dark:text-white'>   
      <div className='mt-[2%] flex flex-col items-center justify-between h-screen'>
        <PopoverUser/>
        <button
          onClick={()=>{
          setShowModalUser(true);
          }}
        >
        <RxListBullet size={30}/>
        </button>
          {ShowModalUser && <ModalUser 
          setShowModalUser={setShowModalUser}
          renderSidebarEvent={renderSidebarEvent}
        />}
        <SwitchTheme/>
      </div>
    </div>
  )
}

function renderSidebarEvent(event) {
    const [modalInfo, setModalInfo] = useState({});
  
    return (
        console.log(event),
      <li key={event}>
        <div>
        <i>Id: {event.reserva}</i>
        </div>
        <label>-------------------------------------------------------</label>
      </li>
    )
  }
