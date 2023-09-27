# codengage-schedule
The intern project using open source stack

# [Careers Codengage](https://carrers.codengage.com/)

## ✨ Code-base structure

The project is coded using a simple and intuitive structure presented below:

📦frontend
┃
📦src	
┣ 📂assets
┃ ┗ 📜react.svg		
┣ 📂components
┃ ┣ 📜RequireAuth.jsx          	#Defines logged to access demoapp	
┃ ┗ 📜SwitchTheme.jsx		        #Darkside component
┣ 📂contexts
┃ ┗ 📜PocketContext.jsx		      #Connects to PocketBase
┣ 📂pages
┃ ┣ 📜DemoApp.jsx		            #Calendar
┃ ┣ 📜Protected.jsx		          #Logged page return information
┃ ┣ 📜SignIn.jsx		            #Login page	
┃ ┗ 📜SignUp.jsx		            #Register page
┣ 📂styles
┃ ┣ 📜demoApp.css		            #Style for demoApp
┃ ┗ 📜modal.css		              #Style mode
┣ 📂utils
┃ ┣ 📜event-utils.js		        #Return events to Calendar
┃ ┗ 📜useDarkSide.js		        #Darkside component
┣ 📜App.jsx		                  #Main defines and call routes 
┣ 📜index.css		                #Tailwind component
┗ 📜main.jsx		                #Call App

### Default development server:

The project will be available at [198.168.1.184:8090](http://198.168.1.184:8090). Can navigate to http://198.168.1.184:8090/admin/.

Change in /src/contexts/PocketContex.jsx and src/utils/event-utils.js in case of server changes.
