var searchBox = document.querySelector('.searchBox')
var searchBtn = document.querySelector('.searchBtn')
var closeBtn = document.querySelector('.closeBtn')
var header = document.querySelector('header')
var navigation = document.querySelector('.navigation')
var menuToggle = document.querySelector('.menuToggle')
console.log('Saddam')







// 


  var stickyHeader =  document.getElementByClassName(".header");
  var scrollUp = document.getElementByClassName(".scroll-up-btn");
  // document.ready(function(){
// document.addEventListener("DOMContentLoaded", function () {
  // Window.scroll()

  window.addEventListener("scroll",function(){
    var scrollY = window.scrollY;
      if(scrollY > 20){
        stickyHeader.classList.add("sticky");
      }else{
        stickyHeader.classList.remove("sticky");
      }
      
    });
      // if(this.scrollY > 500){
      //   scrollUp.classList.add("show");
      // }else{
      //   scrollUp.classList.remove("show");
      // }
  
// });





// 
















searchBtn.addEventListener('click', function () {
  searchBox.classList.add('active')
  closeBtn.classList.add('active')
  searchBtn.classList.add('active')
  menuToggle.classList.add('hide')
  header.classList.remove('open')
})
closeBtn.addEventListener('click', function () {
  searchBox.classList.remove('active')
  closeBtn.classList.remove('active')
  searchBtn.classList.remove('active')
  menuToggle.classList.remove('hide')
})

menuToggle.addEventListener('click', function () {
  header.classList.toggle('open')
  // searchBox.classList.remove("active");
  // closeBtn.classList.remove("active");
  // searchBtn.classList.remove("active");
})

// Text ANimation Start here

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
    } 
    // else {
    //   entry.target.classList.remove('show')
    // }
  })
})
const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach((el) => observer.observe(el))
// console.log("Saddam")

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1'
    } else {
      entry.target.style.opacity = '0'
    }
  })
})

const charHolder = document.querySelectorAll('.char-holder')
charHolder.forEach((el) => observer2.observe(el))(
  // console.log("Saddam")
  // Text ANimation ENd here

  // Image SLider STart Here

  (function () {
    var $slides = document.querySelectorAll('.slide')
    var $controls = document.querySelectorAll('.slider__control')
    var numOfSlides = $slides.length
    var slidingAT = 1300 // sync this with scss variable
    var slidingBlocked = false
    var nextSlide = document.querySelector('.slider__control--right')
    setInterval(() => {
      nextSlide.click()
    }, 4000)
    ;[].slice.call($slides).forEach(function ($el, index) {
      var i = index + 1
      $el.classList.add('slide-' + i)
      $el.dataset.slide = i
    })

    ;[].slice.call($controls).forEach(function ($el) {
      $el.addEventListener('click', controlClickHandler)
    })

    function controlClickHandler() {
      if (slidingBlocked) return
      slidingBlocked = true

      var $control = this
      var isRight = $control.classList.contains('m--right')
      var $curActive = document.querySelector('.slide.s--active')
      var index = +$curActive.dataset.slide
      isRight ? index++ : index--
      if (index < 1) index = numOfSlides
      if (index > numOfSlides) index = 1
      var $newActive = document.querySelector('.slide-' + index)

      $control.classList.add('a--rotation')
      $curActive.classList.remove('s--active', 's--active-prev')
      document.querySelector('.slide.s--prev').classList.remove('s--prev')

      $newActive.classList.add('s--active')
      if (!isRight) $newActive.classList.add('s--active-prev')

      var prevIndex = index - 1
      if (prevIndex < 1) prevIndex = numOfSlides

      document.querySelector('.slide-' + prevIndex).classList.add('s--prev')

      setTimeout(function () {
        $control.classList.remove('a--rotation')
        slidingBlocked = false
      }, slidingAT * 0.75)
    }
  })(),
)

//   Image SLider End Here

// Text ANimation Start here

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     console.log(entry)
//     if (entry.isIntersecting) {
//       entry.target.classList.add('show')
//     } else {
//       entry.target.classList.remove('show')

//     }
//   })
// })

// Image Slider Start Here

var repeat = function (activeClass) {
  let active = document.getElementsByClassName('.active')
  let i = 1
  var repeater = () => {
    setTimeout(function () {
      slides.forEach((activeSlide) => {
        activeSlide.classList.remove('active')
      })
      btns.forEach((activeSlide) => {
        activeSlide.classList.remove('active')
      })

      slides[i].classList.add('active')
      btns[i].classList.add('active')
      i++

      if (slides.length == i) {
        i = 0
      }
      if (i >= slides.length) {
        return
      }
      repeater()
    }, 5000)
  }
  repeater()
}
repeat()

// Image Slider End Here



















