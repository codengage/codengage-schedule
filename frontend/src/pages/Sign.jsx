import { useState } from "react";
import Panel from "../components/ui/Panel";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

 

export default function Sign(){
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
   return(
     <div className="grid xl:grid-cols-2  h-[100%] bg-gray-100 dark:bg-dark-600">
        {showSignUp ? 
        <SignUp
        setShowSignUp={setShowSignUp}
        setShowSuccessAlert={setShowSuccessAlert}
        />
        :
        <SignIn 
        setShowSignUp={setShowSignUp}
        showSuccessAlert={showSuccessAlert}
        />
        }
        <Panel/>
    </div>
    )
}