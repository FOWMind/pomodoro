// Constants
const LOCAL_STORAGE_KEY = 'pomodoro-dark-mode'
const DARK_MODE_CLASS = 'dark'
const SWITCH_TRIGGERED_CLASS = 'triggered'

const darkModeSwitch = document.getElementById('dark-mode-switch')
darkModeSwitch.addEventListener('click', toggleDarkMode)

// Get the dark mode status from localStorage
// If there is nothing on localStorage, set to false
const darkMode = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || false

// Setting up the dark mode status for the first time
setInitialDarkMode()

function toggleDarkMode() {
	darkModeSwitch.classList.toggle(SWITCH_TRIGGERED_CLASS)
	document.documentElement.classList.toggle(DARK_MODE_CLASS)
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(!darkMode))
}

function setInitialDarkMode() {
	if (!darkMode) return
	document.documentElement.classList.add(DARK_MODE_CLASS)
	darkModeSwitch.classList.add(SWITCH_TRIGGERED_CLASS)
}
