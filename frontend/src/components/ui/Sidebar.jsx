import SwitchTheme from './SwitchTheme';
import * as Toggle from '@radix-ui/react-toggle';
import { Link } from 'react-router-dom';
import { BsCalendar } from '@react-icons/all-files/bs/BsCalendar'
import { BsCalendarFill } from '@react-icons/all-files/bs/BsCalendarFill'
import PopoverUser from './PopoverUser';

export default function Sidebar(props){
    const {currentEvents} = props;
    const {weekendsVisible} = props;
    const {setWeekendsVisible} = props;
    const {renderSidebarEvent} = props;
   return( 
   <div className='w-[18%] block bg-[#e2e8f0] rounded-tr-xl dark:bg-dark-300  shadow-xl shadow-black dark:shadow-white dark:text-white'>
        
    <div className='mt-[13%] flex items-baseline justify-around'>
      
    <Toggle.Root
    className=''
    defaultPressed={weekendsVisible}
    onPressedChange={(pressed)=>{
    setWeekendsVisible(!pressed);
  }}
  >
    {weekendsVisible ? <BsCalendarFill size={30}/>:<BsCalendar size={30}/>}
  </Toggle.Root>

  <PopoverUser/>
  
  <SwitchTheme/>

    </div>
    <div className='p-[2rem]'>
      <h2>Todas as Reservas ({currentEvents.length})</h2>
      <ul>
        {currentEvents.map(renderSidebarEvent)}
      </ul>
    </div>
    <div className='p-[2rem]'>
  
    </div>
  </div>
  )
}