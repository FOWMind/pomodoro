// Constants
const DESKTOP_BREAKPOINT = 900 // px
const MODAL = {
	ANIMATION_DURATION: 500, // ms
	VISIBLE_CLASS: 'visible',
	HIDDEN_CLASS: 'hidden',
}

// Settings button
let canClick = true
const openSettingsBtn = document.getElementById('open-settings')
openSettingsBtn.addEventListener('click', handleClick)

function handleClick() {
	if (!canClick) return
	toggleSettingsModal()

	// Cannot click for <animation duration> time
	canClick = false
	setTimeout(() => {
		canClick = true
	}, MODAL.ANIMATION_DURATION)
}

// Settings modal
const settingsModal = document.getElementById('settings-modal')
const settingsModalHeight = settingsModal.clientHeight

// Handle touch on modal
settingsModal.addEventListener('touchmove', (e) => {
	if (window.innerWidth > DESKTOP_BREAKPOINT) return
	handleTouchMove(e)
})

settingsModal.addEventListener('touchend', (e) => {
	handleTouchEnd(e)
})

function handleTouchMove(e) {
	// Get the vertical touch position inside the settings modal box
	const verticalTouchPosition = e.changedTouches[0].clientY

	// Move only the Y axis based on the touch movement
	settingsModal.style.transform = `translate(-50%, clamp(-${settingsModalHeight}px, ${verticalTouchPosition}px, 0px))`

	// TODO: Start settings modal movement before the touch cross the line (outside the viewport)
}

function handleTouchEnd(e) {
	// Get the settings modal transform and extract its "transformY"
	const settingsModalTransform = getComputedStyle(settingsModal).getPropertyValue('transform')
	const settingsModalHiddenSize = new WebKitCSSMatrix(settingsModalTransform).m42

	// Check if the half of the modal is not visible
	const halfOrMoreIsHidden = settingsModalHiddenSize < -settingsModalHeight / 2

	// Remove the transform added in "touchmove" event
	settingsModal.removeAttribute('style')

	// If the half of the modal is not visible then hide it, otherwise keep it visible
	halfOrMoreIsHidden ? hideSettingsModal() : showSettingsModal()
}

// Visibility utility functions
function hideSettingsModal() {
	settingsModal.classList.remove(MODAL.VISIBLE_CLASS)
	settingsModal.classList.add(MODAL.HIDDEN_CLASS)
}

function showSettingsModal() {
	settingsModal.classList.remove(MODAL.HIDDEN_CLASS)
	settingsModal.classList.add(MODAL.VISIBLE_CLASS)
}

function toggleSettingsModal() {
	const isVisible = settingsModal.classList.contains(MODAL.VISIBLE_CLASS)
	isVisible ? hideSettingsModal() : showSettingsModal()
}
