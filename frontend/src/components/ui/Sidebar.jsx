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
  return (
    <li key={event.id}>
      <b>{ 
        formatDate(event.start,{timeZone: 'UTC',locale:"pt-br", hour: 'numeric', month: 'short',minute: '2-digit', day: 'numeric', meridiem: 'short'}
      )}</b>
      <i> {event.title}</i>
    </li>
  )
}