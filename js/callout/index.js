const typewriter = require('analytics')

export default function () {
  document.getElementById('demoForm').addEventListener('submit', function(e){
    e.preventDefault();
    const email = document.getElementById('demoEmailInput').value
    const url = window.location.href
    const location = 'Docs Footer SignUp Form'
    typewriter.leadCaptured({
      email,
      url,
      location
    })
    window.location.href = `https://segment.com/contact/demo/?email=${btoa(email)}`
  })
}