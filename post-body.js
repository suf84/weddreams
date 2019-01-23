console.log("running post-body.js from jsdelivr");

// Disable zoom on mobile Chrome
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

// Disable zoom on mobile Safari
document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});

// Code for incrementing how many times button pressed
var steps = 0;
var ucFlag = 0;

function stepUp() {
  steps += 1;
  validate();
  noTab();
  noLeft();
  scrollUp();
  if (ucFlag == 0) { addUcListener(); }
}

function stepDown() {
  steps -= 1;
}

// Scroll up on each new form slide
function scrollUp() {
  window.scrollTo(0, 0);
}

// Removing the left slide nav button
function noLeft() {
	document.getElementById('prevButton').style.removeProperty('display');
  console.log("noLeft() just ran");
}

// Calling of the validation script
$(document).ready(function() {
  validate();
  noTab();
  //$('#Invite-Code').change(validateButton);
});

// Validate whether inputs empty or not on input
var slides = document.getElementById("formSlides").childNodes;

function validate() {
  //var inputs = slides[steps].querySelectorAll('input');
  var inputs = slides[steps].querySelectorAll('.form-input');
  var flag = 0;

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value.length > 0) {
      flag = 1;
    } else {
      flag = 0;
      break;
    }
  }

  var nextButton = document.getElementById("nextButton");
  // initially the next button is disabled
  nextButton.disabled = true;

  if (flag == 0) {
    nextButton.disabled = true;
    nextButton.classList.add("next-button--disabled");
  } else {
    nextButton.disabled = false;
    nextButton.classList.remove("next-button--disabled");
  }

}

// Setting notab on all other slides except current one
function noTab() {
  console.log("run notab");
  for (i = 0; i < slides.length; i++) {
    console.log(i + " vs " + slides.length);
    if (i != steps) {
      var fields = slides[i].querySelectorAll('input[type=text], input[type=tel], textarea');
      //console.log(fields);
      for (j = 0; j < fields.length; j++) {
        fields[j].tabIndex = "-1";
      }
      console.log("noTab on slide " + i);
    } else {
      var fields = slides[i].querySelectorAll('input[type=text], input[type=tel], textarea');
      for (j = 0; j < fields.length; j++) {
        fields[j].tabIndex = j + 1;
      }
      console.log("tabulation on slide " + i);
    }
  }
}

// Submit button visibility code
var ucSlide = document.getElementById("ucSlide");
var ucWidgets = ucSlide.getElementsByClassName("uploadcare--widget");
var subButton = document.getElementById("submit-button");
var revButton = document.getElementById("review-button");

console.log("this ran");
console.log(ucWidgets.length + " no. of UC widgets");

function ucFileCheck() {
  var files = ucSlide.querySelectorAll(".uploadcare--link");
  console.log("run ucFileCheck");
  console.log("no of links: " + files.length);
  if (files.length < 3) {
    revButton.disabled = true;
    revButton.classList.add("review-button--disabled");
  } else {
    revButton.disabled = false;
    revButton.classList.remove("review-button--disabled");
  }

}

function addUcListener() {
  for (i = 0; i < ucWidgets.length; i++) {
    ucWidgets[i].addEventListener('click', ucFileCheck);
    ucWidgets[i].addEventListener('drop', ucFileCheck);
    //ucWidgets[i].addEventListener('change', ucFileCheck);
    //ucWidgets[i].addEventListener('drag', ucFileCheck);
    //ucWidgets[i].addEventListener('dragenter', ucFileCheck);
    //ucWidgets[i].addEventListener('focus', ucFileCheck);
    console.log("added event listener for " + i);
  }
  ucFlag = 1;
}

// Move all the fields for review to the last slide
function reviewFields() {
  console.log("run reviewFields");
  slide1 = document.getElementById("div-slide-1");
  slide2 = document.getElementById("div-slide-2");
  slide3 = document.getElementById("div-slide-3");

  ucSlide.prepend(slide3);
  ucSlide.prepend(slide2);
  ucSlide.prepend(slide1);

  revButton.classList.add("review-button--none");
  console.log("add class to review button");

  subButton.classList.remove("submit-button--disabled");
  console.log("remove class from submit button");

  scrollUp();
  noTab();
}
