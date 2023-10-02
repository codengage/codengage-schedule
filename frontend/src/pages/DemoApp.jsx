import React from "react";
import { formatDate } from '@fullcalendar/core'
import '../styles/demoApp.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {records} from '../utils/event-utils'
import SwitchTheme from '../components/SwitchTheme';
import * as Switch from '@radix-ui/react-switch';
import {AiOutlineClose} from '@react-icons/all-files/ai/AiOutlineClose.esm'
import "../styles/modal.css";
import FormModal from "../form/FormModal";



export default class DemoApp extends React.Component {

  state = {
    weekendsVisible: false,
    currentEvents: [],
    showModal: false,
    modalInfo: {},
  }


  ServerErrors = {
     title: false,
     start: false,
     end: false,
  }
  
  render() {
    return (
      <div className='flex font-bold'>
        {this.renderSidebar()}
        
       
        <div className='demo-app-main font-light '>
        
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
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={records} 
            select={this.handleDateSelect}
            eventContent={renderEventContent} 
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} 
            /*
            eventAdd={function(){}} 
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
          {this.state.showModal ? this.renderModal() : ''}
        </div> 
        
      </div>
    
    )
  }


  renderModal(){
    return(
      <div className="modal__wrapper">
      <div className="single__modal  dark:bg-dark-400 border dark:border-white">
        <span className="close__modal p-2">

          <AiOutlineClose 
          className="bg-[#0d6efd] rounded-lg  text-white"
          onClick={() => {
           this.setState({
             showModal: false
             })}}/> 
          
        </span>
        <div className="bg-[#e2e8f0] dark:bg-dark-600 p-3 rounded-md">
        <h6 className="text-center mt-2">
        
         <b>{formatDate(this.state.modalInfo.start,{timeZone: 'UTC',locale:"pt-br", weekday: 'long', omitCommas: true })}</b>
         <br/><b>{formatDate(this.state.modalInfo.start,{timeZone: 'UTC',locale:"pt-br"})}</b>
        
        </h6>
      <div className='flex justify-center '>

      
             <FormModal modalInfo={this.state.modalInfo}/>
  
         
        </div>
        </div>
      </div>
    </div>
    )
  }



  renderSidebar() {
    return (
      <div className='w-[18%] bg-[#e2e8f0] rounded-tr-xl dark:bg-dark-300  shadow-xl shadow-black dark:shadow-white dark:text-white'>
        
        <div className='p-[2rem]'>
          
        {this.renderSwitchWeekends()}

        </div>
        <div className='p-[2rem]'>
          <h2>Todas as Reservas ({this.state.currentEvents.length})</h2>
          <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
        <div className='p-[2rem]'>
        <SwitchTheme/>
        </div>
      </div>
    )
  }

  renderSwitchWeekends(){
    return(
      <form>
      <div className="flex items-center">
        <label className="dark:text-white text-[15px] leading-none pr-[15px]" htmlFor="airplane-mode">
        Mostrar Fim de semana
        </label>
        <Switch.Root
          className="w-[42px] h-[25px] bg-blackA9 dark:bg-slate-400 rounded-full relative shadow-md shadow-black dark:shadow-white focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black dark:data-[state=checked]:bg-[#e2e8f0] outline-none cursor-default"
          id="Toggle-Weekends"
          checked={this.state.weekendsVisible}
          onCheckedChange={() => {
            this.setState({
              weekendsVisible: !this.state.weekendsVisible
            })
          }}
        >
          <Switch.Thumb 
          className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" 
      
          />
        </Switch.Root>
      </div>
    </form>
    )
  }


  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    const date = selectInfo
    console.log(date)

    this.setState({
      showModal: true,
      modalInfo: date
    })
    
  }

  handleEventClick = (clickInfo) => {
    if (confirm(`Tem certeza que quer cancelar a reserva? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

  handleSubmit(){
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
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