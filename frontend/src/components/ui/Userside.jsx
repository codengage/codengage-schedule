import SwitchTheme from './SwitchTheme';
import { RxListBullet } from 'react-icons/rx';
import PopoverUser from './popover/PopoverUser';
import { useState } from 'react';
import ModalUser from './modal/ModalUser';
import { formatDate } from '@fullcalendar/core';
import { records } from '../../utils/event-use';

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
  
  return (
    <li key={event.id}>
      <div>
      <i>In: {event.sala} - Event: {event.title}</i>
      </div>
      <b>From: { 
        formatDate(event.start,{timeZone: 'UTC',locale:"pt-br", hour: 'numeric', month: 'short',minute: '2-digit', day: 'numeric', meridiem: 'short'}
      )}</b> 
      <b> Until: { 
        formatDate(event.end,{timeZone: 'UTC',locale:"pt-br", hour: 'numeric', month: 'short',minute: '2-digit', day: 'numeric', meridiem: 'short'}
      )}</b>
      <div>

      </div>
      <label>-------------------------------------------------------</label>
    </li>
  )
}
