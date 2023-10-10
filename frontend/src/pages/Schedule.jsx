import React, { useState, useCallback } from "react";
import { formatDate } from '@fullcalendar/core'
import '../styles/schedule.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {records} from '../utils/event-utils'
import "../styles/modal.css";
import ModalCalendar from "../components/ModalCalendar";
import Delet from "../components/form/Delet";
import Drag from "../components/form/Drag";
import Sidebar from "../components/Sidebar";
import { usePocket } from "../contexts/PocketContext";



export default function Schedule(){
      const {user} = usePocket();
      const navigate = useNavigate();
      if(!user){
        navigate('/')
      } 
      
      const [ weekendsVisible, setWeekendsVisible] = useState(false)
      const [ showModal, setShowModal] = useState(false)
      const [ showDelet, setShowDelet] = useState(false)
      const [ showDrag, setShowDrag] = useState(false)
      const [currentEvents, setCurrentEvents] = useState(records)
      const [modalInfo, setModalInfo] = useState({})
       
      

    return(
        <div className='flex font-bold'>
         <Sidebar 
         currentEvents={currentEvents} 
         weekendsVisible={weekendsVisible}
         setWeekendsVisible={setWeekendsVisible}
         renderSidebarEvent= {renderSidebarEvent}
         />
        <div className='demo-app-main border-l-2 border-black dark:border-white rounded-l-3xl font-light px-[2%] pt-[2%] shadow-xl shadow-black dark:shadow-white'>
        
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            slotMinTime={'06:00:00'}
            slotMaxTime={'19:00:00'}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            buttonText={{
              today: "Hoje",
              month: "Mês",
              week: "Semana",
              day: "Dia",
              list: "Lista",
            }}
                
            locale={"pt-br"}
            timeZone={"UTF"}
            titleFormat={{ year: "2-digit", month: 'short'}}
            eventTimeFormat={{hour: 'numeric',minute: '2-digit',meridiem: 'short' }}
            dayHeaderFormat={{day: "2-digit", weekday: 'short', omitCommas: true }}
            initialView='timeGridWeek'
            fixedWeekCount={false}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            initialEvents={currentEvents} 
            select={(selectInfo)=>{
                setShowModal(true);
                setModalInfo(selectInfo);
            }}
            eventContent={renderEventContent} 
            eventClick={(clickInfo)=>{
               setShowDelet(true);
               setModalInfo(clickInfo);
            }}
            eventsSet={(events)=>{setCurrentEvents(events)}} 
            eventChange={(eventInfo)=>{
              setShowDrag(true);
              setModalInfo(eventInfo);
            }}
            /*
            eventAdd={function(){}} 
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
          {showModal && <ModalCalendar 
          modalInfo={modalInfo} 
          setShowModal={setShowModal}
          setCurrentEvents={setCurrentEvents}
          />}
          {showDelet && <Delet 
          modalInfo={modalInfo}
          setShowDelet={setShowDelet}
          />}
           {showDrag && <Drag 
          modalInfo={modalInfo}
          setShowDrag={setShowDrag}
          />}
        </div> 
        
      </div>
    )
}

function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        <b>{eventInfo.event.extendedProps.sala}</b>
        <>{eventInfo.eventColor}</>
      </>
    )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{ 
        
      formatDate(event.start, {timeZone: 'UTC',locale:"pt-br", hour: 'numeric', month: 'short',minute: '2-digit', day: 'numeric', meridiem: 'short'}
      
      )}</b>
      <i>{event.title}</i>
    </li>
  )
}