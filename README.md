# codengage-schedule
The intern project using open source stack

# [Careers Codengage](https://carrers.codengage.com/)

## ✨ Code-base structure

The project is coded using a simple and intuitive structure presented below:

```bash
📦src
 ┣ 📂assets
 ┃ ┣ 📜Logo.jsx			# Codengage Logo
 ┃ ┣ 📜panel-logo.svg		# Logo for the panel
 ┃ ┗ 📜react.svg		# A React component that injects SVG into the DOM
 ┣ 📂components
 ┃ ┣ 📂form
 ┃ ┃ ┣ 📜Delet.jsx		# Update/Delete events
 ┃ ┃ ┣ 📜Drag.jsx		# Function to update when events are dragged
 ┃ ┃ ┣ 📜FormModal.jsx		# Create events
 ┃ ┣ 📂ui
 ┃ ┃ ┣ 📂alerts
 ┃ ┃ ┃ ┣ 📜AlertDanger.jsx	# Called when error in SignIn/SignUp occur
 ┃ ┃ ┃ ┗ 📜AlertSuccess.jsx	# Called on sucefull SignUp
 ┃ ┃ ┣ 📂modal
 ┃ ┃ ┃ ┣ 📜Delet.jsx		# Modal for Delet
 ┃ ┃ ┃ ┣ 📜ModalCalendar.jsx	# Modal for the Calendar
 ┃ ┃ ┃ ┣ 📜ModalList.jsx	# Modal for SideList
 ┃ ┃ ┃ ┗ 📜ModalReserve.jsx	# Modal for Reserve
 ┃ ┃ ┣ 📂popover
 ┃ ┃ ┃ ┗ 📜PopoverUser.jsx	# PopUp icon to see user and logout
 ┃ ┃ ┣ 📜Panel.jsx		# Sidebar Element
 ┃ ┃ ┣ 📜Sidebar.jsx		# Sidebar Element
 ┃ ┃ ┗ 📜SwitchTheme.jsx	# Change between Dark/Light mode
 ┃ ┣ 📜ForgotPassword.jsx	# Remenber the user password
 ┃ ┣ 📜RequireAuth.jsx		# Require SignIn to call Schedule
 ┃ ┣ 📜SignIn.jsx		# SignIn page
 ┃ ┗ 📜SignUp.jsx		# SignUp page
 ┣ 📂contexts
 ┃ ┗ 📜PocketContext.jsx	# Peform the pockbase operations
 ┣ 📂pages
 ┃ ┣ 📜Protected.jsx		# Demand User Logged to enter pages
 ┃ ┣ 📜Schedule.jsx		# Calendar view and operations calls
 ┃ ┗ 📜Sign.jsx			# SignIn function
 ┣ 📂routes
 ┃ ┗ 📜Routes.jsx		# Define Pages routes and protected pages
 ┣ 📂styles
 ┃ ┣ 📜modal.css		# Style for the modals
 ┃ ┗ 📜schedule.css		# Style for the calendar
 ┣ 📂utils
 ┃ ┣ 📜event-utils.js		# Colect Events from pockbase 
 ┃ ┗ 📜useDarkSide.js		# SwitchTheme component
 ┣ 📜App.jsx			# Start the routes
 ┣ 📜index.css			# Tailwind component
 ┗ 📜main.jsx			# Main
```

### Default development server:

The project will be available at [198.168.1.184:8090](http://198.168.1.184:8090). Can navigate to http://198.168.1.184:8090/admin/.

Change in /src/contexts/PocketContex.jsx and src/utils/event-utils.js in case of server changes.
