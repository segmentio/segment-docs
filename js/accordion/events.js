/**
 * Creates a custom DOM event.
 *
 * @param  {String} name
 * @return {Event}
 */
function createEvent (name) {
  const event = document.createEvent('Event')

  event.initEvent(name, true, true)

  return event
}

/**
 * First visit
 *
 * Example:
 *   el.addEventListener('cookies.firstVisit', () => { ... })
 *
 * @type {Event}
 */
const accordionTriggered = createEvent('accordion.triggered')



export {
  accordionTriggered
}
