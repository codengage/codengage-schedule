import React, { useCallback, useState } from "react";
import { formatDate } from '@fullcalendar/core'
import '../styles/schedule.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import "../styles/modal.css";
import ModalCalendar from "../components/ui/modal/ModalCalendar";
import Sidebar from "../components/ui/Sidebar";
import { usePocket } from "../contexts/PocketContext";
import { useNavigate } from "react-router-dom";
import Delet from "../components/ui/modal/Delet";
import Drag from "../components/Drag";
import { records } from "../utils/event-utils";


export default function Schedule(){
      const {user} = usePocket();
      const navigate = useNavigate();
      if(!user){
        navigate('/')
      }
      
      const [ weekendsVisible, setWeekendsVisible] = useState(false);
      const [ showModal, setShowModal] = useState(false);
      const [modalInfo, setModalInfo] = useState({});
      const [ showDelet, setShowDelet] = useState(false)
      const [ showDrag, setShowDrag] = useState(false)
      const [currentEvents, setCurrentEvents] = useState(records)
      

    return(
       
        <div className='flex flex-bold '>
               <Sidebar 
         currentEvents={currentEvents} 
         weekendsVisible={weekendsVisible}
         setWeekendsVisible={setWeekendsVisible}
         />
          <div className='demo-app-main w-[100%] border-l-2 border-black dark:border-white rounded-l-3xl font-light px-[2%] pt-[6%] shadow-xl shadow-black dark:shadow-white'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            slotMinTime={'06:00:00'}
            slotMaxTime={'19:00:00'}
            height='90%'
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
            eventClick={(clickInfo)=>{
            console.log(clickInfo)
              setShowDelet(true);
              setModalInfo(clickInfo);
           }}
            eventsSet={(events)=>setCurrentEvents(events)} 
            eventDrop={(eventInfo)=>{
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
           <b> {eventInfo.event.extendedProps.sala}</b>
        <i> {eventInfo.event.title} </i>
        
        <>{eventInfo.eventColor}</>
      </>
    )
}

