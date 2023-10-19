import React from "react";
import SwitchTheme from './SwitchTheme'
import PanelLogo from '../../assets/panel-logo.svg';

export default function Panel () {
    return(
  <>
    <div className="relative ml-[90%] mt-[3%] ">
    <SwitchTheme/>
    </div>
    <img src={PanelLogo} className="relative  mx-auto mt-80 h-[14%]"/> 
  </>
  );
};
