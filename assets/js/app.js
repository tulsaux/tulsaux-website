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
  const cardArr = Array.from(document.querySelectorAll(".speaker-card"));

  var loadMoreSpeakers = function(){
    indexCount++;
    const activeCardArrCount = indexCount * 3;
    if (activeCardArrCount >= cardArr.length){
      loadMoreButton.classList.add("invisible", "opacity-0");
    }
    for (const card of cardArr.slice(0, activeCardArrCount)) {
      card.classList.remove("hidden");
    }
    animateLoadMoreButton();
  }

  var animateLoadMoreButton = function() {
    const loadMoreButtonIcon = loadMoreButton.querySelector("svg, i");
    loadMoreButtonIcon?.classList.toggle("fa-spin");
  }

  loadMoreButton.addEventListener("click", function(e){
    e.preventDefault();
    animateLoadMoreButton();
    setTimeout(loadMoreSpeakers, 2000);

  }, false);

  function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  }

function buildEventData(data) {
  // console.log("buildEventData: ", data);

  const eventTemplate = document.querySelector(".js-event-template");
  const eventTemplateSpeakerTitle = eventTemplate.querySelector(".js-data-speaker-title");
  const eventTemplateDate = eventTemplate.querySelector(".js-data-date");
  const eventTemplateTime = eventTemplate.querySelector(".js-data-time");
  const eventTemplateLocation = eventTemplate.querySelector(".js-data-location");
  const eventTemplateLink = eventTemplate.querySelector(".js-data-link");
  const eventTemplateLumaLink = eventTemplate.querySelector(".js-data-luma-link");
  const currentDate = getCurrentDate();

  for (const event of data) {
    if ( event.date >= currentDate ) {

      let speakerCopy = "This month’s speaker is " + event.speaker + ". "; 


      if (event.meetupType == "lightning") {
        // console.log("lightning")
        speakerCopy = `This meetup is Tulsa UX's ${event.title} semiannual lightning talks. ${event.description}`;
      } else if (event.meetupType == "noSpeaker") {
        speakerCopy = [event.title, event.description].filter(Boolean).join(": ");
      } else if (event.title && event.description) {
        speakerCopy += "Their talk, “"  + event.title + "” will cover " + event.description;
      } else if ( event.title && !event.description ) {
        speakerCopy += "They will give their talk, “"  + event.title + "”.";
      } else if ( !event.title && event.description ) {
        speakerCopy += event.description;
      } else if ( event.bio ) {
        speakerCopy += event.bio;
      } else {
        speakerCopy = speakerCopy;
      }

      eventTemplateSpeakerTitle.textContent = speakerCopy;

      if (event.meetupType == "lightning") {
        const speakerSignUpLink = document.createElement("a");
        speakerSignUpLink.href = "https://tulsaux.com/lightning";
        speakerSignUpLink.textContent = "https://tulsaux.com/lightning";
        eventTemplateSpeakerTitle.appendChild(speakerSignUpLink);
      }

      const weekday = new Date(event.date).toLocaleDateString("en-US", {
        weekday: "long",
        timeZone: "UTC",
      });
      eventTemplateDate.dateTime = event.date;
      eventTemplateDate.textContent = `${weekday}, ${event.month} ${event.day}`;
      eventTemplateTime.textContent = event.time ? ` · ${event.time}` : "";
      eventTemplateLocation.textContent = event.location ?? "";
      if (event.url) {
        eventTemplateLink.href = event.url;
        if (event.lumaUrl) {
          eventTemplateLink.querySelector(".js-data-link-label").textContent = "RSVP on Meetup";
          eventTemplateLink.classList.replace("btn--red", "btn--ghost-red");
        }
        eventTemplateLink.classList.remove("hidden");
      }
      if (event.lumaUrl) {
        eventTemplateLumaLink.href = event.lumaUrl;
        eventTemplateLumaLink.classList.remove("hidden");
      }
      
      eventTemplate.classList.remove("hidden");
      return;
    }
  }

};

window.setTimeout( ()=> {

  fetch("/assets/data/events.json")
  .then(response => response.json())
  .then(json => buildEventData(json.events));

  // console.log("setTimeout");
  // const current = new Date();
  // const expiry = new Date(2020, 1, 13);
  // const expiry2 = new Date(2020, 2, 10);
  // const expiry3 = new Date(2020, 3, 14);
  // const expiry4 = new Date(2020, 7, 11);
  // const expiry5 = new Date(2020, 8, 8);
  // const expiry6 = new Date(2020, 9, 13);
  // const expiry7 = new Date(2020, 10, 10);
  // const expiry8 = new Date(2020, 11, 8);
  // const expiry9 = new Date(2021, 0, 12);

  // const eventInfoPlaceholder = document.getElementById("eventInfoPlaceholder");
  // // const eventInfoFeb = document.getElementById("eventInfoFeb");
  // // const eventInfoMar = document.getElementById("eventInfoMar");
  // // const eventInfoApr = document.getElementById("eventInfoApr");
  // const eventInfoMay = document.getElementById("eventInfoMay");

  // // const eventInfoAug = document.getElementById("eventInfoAug");
  // // const eventInfoSept = document.getElementById("eventInfoSept");
  // // const eventInfoOct = document.getElementById("eventInfoOct");
  // // const eventInfoNov = document.getElementById("eventInfoNov");
  // // const eventInfoDec = document.getElementById("eventInfoDec");
  // // const eventInfoJan = document.getElementById("eventInfoJan");

  // console.log("getTime");

  // if (current.getTime() > expiry9.getTime()) {
  //   console.log("expiry9");
  //   eventInfoMay.style.display = "block";
  // }
  // } else if (current.getTime() > expiry5.getTime()) {
  //   console.log("expiry5");
  //   eventInfoJan.style.display = "block";
  // // } else if (current.getTime() > expiry7.getTime()) {
  // //   eventInfoDec.style.display = "block";
  // // } else if (current.getTime() > expiry6.getTime()) {
  // //   eventInfoNov.style.display = "block";
  // // } else if (current.getTime() > expiry5.getTime()) {
  // //   eventInfoOct.style.display = "block";
  // } else if (current.getTime() > expiry4.getTime()) {
  //   eventInfoSept.style.display = "block";
  // } else if (current.getTime() > expiry3.getTime()) {
  //   eventInfoAug.style.display = "block";
  // } else if (current.getTime() > expiry2.getTime()) {
  //   eventInfoApr.style.display = "block";
  // } else if (current.getTime() > expiry.getTime()) {
  //   eventInfoMar.style.display = "block";
  // } else {
  //   console.log("else");
  //   eventInfoFeb.style.display = "block";
  // }
  // console.log("not-else");
  document.getElementById("eventInfoPlaceholder").classList.add("hidden");
}, 1000);

})();
