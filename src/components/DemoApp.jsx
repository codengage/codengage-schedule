import React from 'react'
import { formatDate } from '@fullcalendar/core'
import '../styles/demoApp.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../utils/event-utils'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import Switcher from './SwitcherTheme'




 const RESOURCES = [
  { id: 'a', title: 'Auditorium A'},
  { id: 'b', title: 'Auditorium B', eventColor: 'green' },
  { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
]

export default class DemoApp extends React.Component {
  

  state = {
    weekendsVisible: false,
    currentEvents: []
  }

  render() {
    return (
      <div className='flex font-bold dark:bg-dark-700 dark:text-white'>
        {this.renderSidebar()}
       
        <div className='demo-app-main font-light'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}
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
            dayHeaderFormat={{ weekday: 'short', omitCommas: true }}
            initialView='timeGridWeek'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} 
            resources={RESOURCES}
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
        </div>
      </div>
    )
  }

  renderSidebar() {
    return (
      <div className='w-[18%] bg-slate-300  dark:bg-dark-400  border-r-2 dark:text-white'>
        <div className='p-[2rem] bg-slate-400'>
        
        </div>
        <div className='p-[2rem]'>
          <label>
            <input
             className='mr-[1rem]'
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            Mostrar Fim de semana
          </label>
        </div>
        <div className='p-[2rem]'>
          <h2>Todas as Reservas ({this.state.currentEvents.length})</h2>
          <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
        <div className='p-[2rem]'>
        <Switcher/>
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('selecione qual sala quer reservar')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: '#554733', // mudar para colocar a cor na hora de criar reserva
        borderColor: '#554733',
      })
    }
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