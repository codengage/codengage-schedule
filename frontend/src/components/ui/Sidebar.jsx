import SwitchTheme from './SwitchTheme';
import * as Toggle from '@radix-ui/react-toggle';
import { Link } from 'react-router-dom';
import { BsCalendar } from '@react-icons/all-files/bs/BsCalendar'
import { BsCalendarFill } from '@react-icons/all-files/bs/BsCalendarFill'
import { RxListBullet } from 'react-icons/rx';
import PopoverUser from './PopoverUser';

export default function Sidebar(props){
    const {currentEvents} = props;
    const {weekendsVisible} = props;
    const {setWeekendsVisible} = props;
    const {renderSidebarEvent} = props;
   return( 
   <div className='w-[5%] block dark:text-white'>
        
    <div className='mt-[20%] flex flex-col items-center justify-between h-screen'>
      
    <PopoverUser/>
  
    <Toggle.Root
    defaultPressed={weekendsVisible}
    onPressedChange={(pressed)=>{
    setWeekendsVisible(!pressed);
  }}
  >
    {weekendsVisible ? <BsCalendarFill size={30}/>:<BsCalendar size={30}/>}
  </Toggle.Root>

  <RxListBullet size={30}/>
 
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