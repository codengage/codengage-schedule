import React, { useState } from "react";
import { formatDate } from '@fullcalendar/core'
import '../styles/schedule.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {records} from '../utils/event-utils'
import "../styles/modal.css";
import ModalCalendar from "../components/ModalCalendar";
import Sidebar from "../components/Sidebar";



export default function Schedule(){
    
      const [ weekendsVisible, setWeekendsVisible] = useState(false)
      const [ showModal, setShowModal] = useState(false)
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
        <div className='demo-app-main font-light px-[2%] pt-[2%] '>
        
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
                setShowModal(true)
                setModalInfo(selectInfo)
            }}
            eventContent={renderEventContent} 
            eventClick={handleEventClick}
            eventsSet={(events)=>{setCurrentEvents(events)}} 
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
        </div> 
        
      </div>
    )
}

function handleEventClick  (clickInfo){
  const id = clickInfo.event.id
    if (confirm(`Tem certeza que quer cancelar a reserva? '${clickInfo.event.title}'`)) {
      /*this.setState({
        showDel: true,
        modalInfo: id
      })*/
    }
   console.log(clickInfo.event.extendedProps.sala)
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