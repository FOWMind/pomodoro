import { timeSettings } from './config.js'

const activitySelector = document.getElementById('pomodoro-activity')
const activityMore = activitySelector.querySelector('[data-identifier="more"]')
const activityLess = activitySelector.querySelector('[data-identifier="less"]')
const activityTime = activitySelector.querySelector('[data-identifier="time"]')

const breakSelector = document.getElementById('pomodoro-break')
const breakMore = breakSelector.querySelector('[data-identifier="more"]')
const breakLess = breakSelector.querySelector('[data-identifier="less"]')
const breakTime = breakSelector.querySelector('[data-identifier="time"]')

document.addEventListener('click', handleClick)

function handleClick({ target }) {
  if (target === activityMore) incrementTime('activity', 1)
  else if (target === activityLess) decrementTime('activity', 1)
  else if (target === breakMore) incrementTime('break', 1)
  else if (target === breakLess) decrementTime('break', 1)
}

function updateSettingsGUITime() {
  activityTime.value = timeSettings.activity
  breakTime.value = timeSettings.break
}

function incrementTime(key, amount) {
  timeSettings[key] += amount
  updateSettingsGUITime()
}

function decrementTime(key, amount) {
  if (timeSettings[key] <= timeSettings[`min_${key}`]) return
  timeSettings[key] -= amount
  updateSettingsGUITime()
}

updateSettingsGUITime()
