class Person {
  name = 'James'
  age = 23
}

const person = new Person()
const $clickMeBtn = document.getElementById('clickMeBtn')

$clickMeBtn.addEventListener('click', function() {
  alert('Yayyy... you clicked me')
})
