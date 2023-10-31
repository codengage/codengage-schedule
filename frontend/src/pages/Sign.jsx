import { useState } from "react";
import Panel from "../components/ui/Panel";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import ForgotPassword from "../components/ForgotPassword";

export default function Sign(){
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
   return(
     <div className="grid xl:grid-cols-3  h-screen bg-gray-100 dark:bg-dark-600">
        {showForgotPassword ? 
        <ForgotPassword
        setShowForgotPassword={setShowForgotPassword}
        /> 
        :
        showSignUp ? 
        <SignUp
        setShowSignUp={setShowSignUp}
        setShowSuccessAlert={setShowSuccessAlert}
        />
        :
        <SignIn 
        setShowSignUp={setShowSignUp}
        showSuccessAlert={showSuccessAlert}
        setShowForgotPassword={setShowForgotPassword}
        />
        }
        <div className="max-xl:hidden col-span-2 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-300 dark:via-purple-800 dark:to-purple-950 bg-cover bg-no-repeat">
        <Panel />
        </div>
    </div>
    )
}