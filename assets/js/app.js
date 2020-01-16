(function () {
  // Really basic check for the ios platform
  // https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  // Get the device pixel ratio
  var ratio = window.devicePixelRatio || 1;

  // Define the users device screen dimensions
  var screen = {
    width: window.screen.width * ratio,
    height: window.screen.height * ratio
  };

  // iPhone X Detection
  if (iOS && screen.width == 1125 && screen.height === 2436) {
    document.body.className += ' ' + 'ios-safearea-exists';
  }

  let indexCount = 1;
  const loadMoreButton = document.querySelector(".js-loadMore");
  const cardArr = document.querySelectorAll(".c-presenters__card");

  var loadMoreSpeakers = function(){
    indexCount++;
    const activeCardArrCount = indexCount * 3;
    if (activeCardArrCount >= cardArr.length){
      loadMoreButton.classList.add("fadeOut");
    }
    for (var i = 0; i < activeCardArrCount; i++) {
      cardArr[i].style.display = "block";
    }
    animateLoadMoreButton();
  }

  var animateLoadMoreButton = function() {
    const loadMoreButtonIcon = document.querySelector(".js-loadMore svg");
    loadMoreButtonIcon.classList.toggle("fa-spin");
  }

  loadMoreButton.addEventListener("click", function(e){
    e.preventDefault();
    animateLoadMoreButton();
    setTimeout(loadMoreSpeakers, 2000);

  }, false);

window.setTimeout( ()=> {
  const current = new Date();
  const expiry = new Date(2020, 1, 13);
  const expiry2 = new Date(2020, 2, 10);
  const expiry3 = new Date(2020, 3, 14);


  const eventInfoPlaceholder = document.getElementById("eventInfoPlaceholder");
  const eventInfoFeb = document.getElementById("eventInfoFeb");
  const eventInfoMar = document.getElementById("eventInfoMar");
  const eventInfoApr = document.getElementById("eventInfoApr");
  const eventInfoMay = document.getElementById("eventInfoMay");

  if (current.getTime() > expiry3.getTime()) {
    eventInfoMay.style.display = "block";
  } else if (current.getTime() > expiry2.getTime()) {
    eventInfoApr.style.display = "block";
  } else if (current.getTime() > expiry.getTime()) {
    eventInfoMar.style.display = "block";
  } else {
    eventInfoFeb.style.display = "block";
  }

  eventInfoPlaceholder.style.display = "none";
}, 2000);


})();
