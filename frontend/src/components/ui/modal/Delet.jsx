import React, { useCallback, useRef } from "react";
import { usePocket } from "../../../contexts/PocketContext";
import { formatDate } from "@fullcalendar/core";
import { RxCrossCircled } from "react-icons/rx";
import FormUpdateModal from "../../form/FormUpdateModal";

export default function Delet(props) {
    const {modalInfo} = props;
    const {setShowDelet} = props;
    const {setShowSchedule} = props;
    const titleRef = useRef();
    const salaRef = useRef();
    const { del , update} = usePocket();

  return( 
    <div className="modal__wrapper">
      <div className="single__modal  dark:bg-dark-400 border-2 border-[#712cf9] dark:border-white">
        <span className="close__modal -top-3 -right-3 bg-white dark:bg-dark-400 rounded-full">
        <RxCrossCircled size={30} 
        onClick={() => {setShowDelet(false)}}/> 
        </span>
        <div className="p-3 rounded-md">
          <h6 className="text-center mt-2">
            <b>{modalInfo.event._def.title}</b>
            <br/><b>{modalInfo.event._def.extendedProps.sala}</b>
          </h6>
          <div className='flex justify-center '>
            <FormUpdateModal 
            modalInfo={modalInfo}
            setShowSchedule={setShowSchedule}
            />
          </div> 
        </div> 
      </div>
    </div> 
  );
};