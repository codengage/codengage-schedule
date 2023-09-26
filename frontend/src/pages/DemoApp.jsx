import React from 'react'
import { formatDate } from '@fullcalendar/core'
import '../styles/demoApp.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {records} from '../utils/event-utils'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import Switcher from '../components/SwitchTheme';
import * as Switch from '@radix-ui/react-switch';
import {AiOutlineClose} from '@react-icons/all-files/ai/AiOutlineClose.esm'
import "../styles/modal.css";
import * as Form from '@radix-ui/react-form';


export default class DemoApp extends React.Component {
 
  state = {
    weekendsVisible: false,
    currentEvents: [],
    showModal: false,
    modalInfo: {},
   
  }

  data = {
    sala: "",
    title: "",
    start: "",
    end: "",
    backgroundColor: "",
    borderColor: "",
    textColor: "",
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
      <div className="single__modal dark:bg-dark-600 border border-blue-600">
        <span className="close__modal p-2">

          <AiOutlineClose 
          className="bg-blue-600 rounded-lg  text-white"
          onClick={() => {
           this.setState({
             showModal: false
             })}}/> 
          
        </span>
        <h6 className="text-center mt-2">
        
         <b>{formatDate(this.state.modalInfo.start,{timeZone: 'UTC',locale:"pt-br", weekday: 'long', omitCommas: true })}</b>
         <br/><b>{formatDate(this.state.modalInfo.start,{timeZone: 'UTC',locale:"pt-br"})}</b>
        
        </h6>
      <div className='flex justify-center'>

      
      
    
      {this.renderFormCreateReserve()}
  
         
        </div>
      </div>
    </div>
    )
  }

  renderFormCreateReserve(){
    return(

      <Form.Root className="w-[260px]" 
      // `onSubmit` only triggered if it passes client-side validation
      onSubmit={(event) => {
        const data = Object.fromEntries(new FormData(event.currentTarget));
        {console.log(data.start)}
  
        // Submit form data and catch errors in the response
        submitForm(data)
          .then(() => {
          })
          /**
           * Map errors from your server response into a structure you'd like to work with.
           */
          .catch((errors) => this.setServerErrors(this.mapServerErrors(errors)));

        // prevent default form submission
        event.preventDefault();
      }}
      onClearServerErrors={() =>
       this.setServerErrors({
        title: false,
        start: false,
       end: false,
       })
      }
  >
     <Form.Field className="grid mb-[10px]" name="meeting room" >
   
    
    <Form.Label className="text-[15px] font-medium leading-[35px] text-white">Salas</Form.Label>
    <Form.Control asChild>
    <div>
    <select name="salas" className="w-full dark:bg-dark-800 rounded-md ">
      <option value="Sala 1">Sala 1</option>
      <option value="Sala 2">Sala 2</option>
      <option value="Sala 3">Sala 3</option>
      </select>
    </div>
    </Form.Control>
    </Form.Field>
    <Form.Field className="grid mb-[10px]" name="title">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] text-white">Título</Form.Label>
        <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
           adicione um Título
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
          type="text"
          required
        />
      </Form.Control>
    </Form.Field>
    <Form.Field className="grid mb-[10px]" name="start">
    <div className="flex items-baseline justify-between">
      <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
        Inicio
      </Form.Label>
      <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
          Adicione uma Data de Inicio
      </Form.Message>
      </div>
      <Form.Control asChild>
      <input 
      type="datetime-local" 
      value={this.state.modalInfo.startStr} 
      className="w-full dark:bg-dark-800 rounded-md"
      required
      />
      </Form.Control>
      
    </Form.Field>
     <Form.Field className="grid mb-[10px]" name="end">
     <div className="flex items-baseline justify-between">
    <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
       Fim 
      </Form.Label>
      <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
           Adicione uma Data Final
        </Form.Message>
        </div>
      <Form.Control asChild>
      <input 
      type="datetime-local" 
      value={this.state.modalInfo.endStr} 
      className="w-full dark:bg-dark-800 rounded-md"
      required
      />
      </Form.Control>
    </Form.Field>
    <Form.Submit asChild>
      <button className="box-border w-full text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]" >
        Post 
      </button>
    </Form.Submit>
  </Form.Root>
    )
  }

  renderSidebar() {
    return (
      <div className='w-[18%] bg-slate-300  dark:bg-dark-400  border-r-2 dark:text-white'>
        <div className='p-[2rem] bg-slate-400'>
        
        </div>
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
        <Switcher/>
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
          className="w-[42px] h-[25px] bg-blackA9 rounded-full relative shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
          id="Toggle-Weekends"
          style={{ '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)' }}
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
    const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const salas = form.querySelector("select").value;
  const title = form.querySelector("input[name='title']").value;
  const start = form.querySelector("input[name='start']").value;
  const end = form.querySelector("input[name='end']").value;
  

  const data = {
    salas,
    title,
    start,
    end,
  };

  const json = JSON.stringify(data);

  console.log(json)
});
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