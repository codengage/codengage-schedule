import SwitchTheme from './SwitchTheme';
import { RxListBullet } from 'react-icons/rx';
import PopoverUser from './popover/PopoverUser';
import { useState } from 'react';
import ModalUser from './modal/ModalUser';
import { formatDate } from '@fullcalendar/core';

export default function Userside(props){
    const [ShowModalUser,  setShowModalUser] = useState()
  
  return( 
    <div className='w-[5%] block dark:text-white'>   
      <div className='mt-[2%] flex flex-col items-center justify-between h-screen'>
        <div class="group flex relative">
          <span class="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute opacity-0">UserSpace</span>
          <PopoverUser/>
        </div>
        <button
          onClick={()=>{
          setShowModalUser(true);
          }}
        >
        <div class="group flex relative">
          <span class="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute opacity-0 m-4">Lista Reservas</span>
          <RxListBullet size={30}/>
        </div>
        </button>
          {ShowModalUser && <ModalUser 
          setShowModalUser={setShowModalUser}
          renderSidebarEvent={renderSidebarEvent}
        />}
        <div class="group flex relative">
          <span class="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute opacity-0 m-4">Dark/Light</span>
          <SwitchTheme/>
        </div>
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
