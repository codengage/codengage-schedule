import React from "react";
import SwitchTheme from '../components/SwitchTheme'
import PanelLogo from '../assets/panel-logo.svg';



export default function Panel () {
    return(
    <div className="max-xl:hidden bg-gradient-to-br from-purple-600 via-purple-500 to-purple-300 dark:via-purple-800 dark:to-purple-950 bg-cover bg-no-repeat">
    <div className="relative ml-[90%] mt-[3%] ">
    <SwitchTheme/>
    </div>
    <img src={PanelLogo} className="relative m-[40%] h-[9%]"/>
  </div>
  );
};
