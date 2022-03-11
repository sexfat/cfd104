function sum(x , y) {
  return x + y
}

console.log(sum(1,3));

// import $ from 'jquery';
import './css/style.css';
import './css/header.css';
// sass 資源
import './sass/style.scss';

import gsap from 'gsap';

//jquery
$('body').css('background-color' , 'red');

gsap.from('h1' , {
   y: -190,
   color: 'green',
   duration : 1,
   opacity: 0
})


