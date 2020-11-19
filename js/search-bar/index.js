const ELEMENT_NAME = '.DocsNav-search-input'

export default function() {
  const el = document.querySelectorAll(ELEMENT_NAME)[0]
  if (el) {
    el.addEventListener('input', function(e) {
      // SwiftType currently trigger based on an `input` event being fired.
      // However, we only want this to occur if there are more than 2 characters typed
      // NOTE: If the user types 0 charactes i.e. removes and cancels a search we will still trigger SwiftType so we can hide the search UX.

      if (e.target.value.length > 0 && e.target.value.length < 3) {
        e.stopImmediatePropagation()
      }
    })
  }
}
