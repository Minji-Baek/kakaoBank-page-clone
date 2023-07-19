
 // title & letter change
 const listStyleChangeStartY = 373;
 const listStyleChangeEndY = 1585;


 const listItems = document.querySelectorAll('.list-item');
 const division = (listStyleChangeEndY - listStyleChangeStartY) / listItems.length; // 한 item 당 가지는 scoll 값

 //santa
 const panel1Img = document.getElementById('panel1-img');
 const flyingSantaImg = document.getElementById('flying-santa-image');
 //viedo
  const videoPlayBack = 500;

 const videoElement = document.getElementById('video');
 const videoSection = document.getElementById("video-section");

 const fixedWrapper = document.getElementById("fixed-wrapper");

 const fixedDescription = document.getElementById("fixed-description");

 const fixedDescriptionAppearTiming = 3470;
 const fixedDescriptionAppearEnds = 3800;


 //center fix function
 function centerElement(elementId, video) {
   const element = document.getElementById(elementId);
   const parent = element.parentElement;

   if (window.scrollY > parent.offsetTop - ((document.documentElement.clientHeight - element.offsetHeight) / 2)) { //중앙에 도착했을때,,,,
     element.style.position = "fixed";
     element.style.top = "50%"
     element.style.left = "50%"
     element.style.transform = "translate(-50%, -50%)"

     if (video) video.currentTime = (window.scrollY - videoSection.offsetTop) / videoPlayBack
   } else {
     element.style.position = "relative"
     element.style.top = "initial"
     element.style.left = "initial"
     element.style.transform = "initial"
   }
 }

 //***********
 //video 
 videoElement.addEventListener("loadedmetadata", () => {
   document.getElementById("video-section").style.height = videoElement.duration * videoPlayBack + "px";
 })

 //scroll event
 window.addEventListener("scroll", () => {
   // console.log(document.getElementById("list-item-wrapper").offsetTop)
   
   // letter on&off
   if(document.getElementById("on")) 
     document.getElementById("on").removeAttribute("id")

   if(window.scrollY > listStyleChangeStartY && window.scrollY < listStyleChangeEndY ){
     const targetIndex = Math.round((window.scrollY - listStyleChangeStartY ) / division);
     if(listItems[targetIndex]) listItems[targetIndex].id="on";
   }
   

   //santa move event
   const scrollYBottom = window.scrollY + document.documentElement.clientHeight  //현재 스크롤 bottom 값
   if(scrollYBottom >  panel1Img.offsetTop && scrollYBottom < ( panel1Img.offsetTop + panel1Img.offsetHeight + 100 )) {
     // 각각의 숫자는 css에서 준 초기값이다.
     const translateX = 100 - 100 * 1.8 * (scrollYBottom - panel1Img.offsetTop) / (panel1Img.offsetHeight + 100);// 예상영역높이
     const translateY = 20 - 20 * (scrollYBottom - panel1Img.offsetTop) / (panel1Img.offsetHeight + 100);
     const rotationDegree = 30 - 30 * 1.8 * (scrollYBottom - panel1Img.offsetTop) / (panel1Img.offsetHeight + 100);
     
     flyingSantaImg.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotationDegree}deg)`;
     
   }

   //video
   centerElement("fixed-wrapper", videoElement)

   if (window.scrollY > videoSection.offsetTop + videoSection.offsetHeight - (fixedWrapper.offsetHeight + (document.documentElement.clientHeight - fixedWrapper.offsetHeight) / 2)) {
     fixedWrapper.style.position = "relative"
     fixedWrapper.style.top = "initial"
     fixedWrapper.style.left = "initial"
     fixedWrapper.style.transform = `translateY(${videoSection.offsetHeight - fixedWrapper.offsetHeight}px)`
   }

   if (window.scrollY > fixedDescriptionAppearTiming && window.scrollY < fixedDescriptionAppearEnds) {
     fixedDescription.style.transform = `translateY(${fixedDescriptionAppearEnds - window.scrollY}px)`

     fixedDescription.style.opacity = (window.scrollY - fixedDescriptionAppearTiming) / 300
   } else if (window.scrollY > fixedDescriptionAppearEnds) {
     fixedDescription.style.transform = `translateY(0px)`
     fixedDescription.style.opacity = 1
   } else {
     fixedDescription.style.transform = `translateY(100px)`
     fixedDescription.style.opacity = 0
   }

   //bottom image center
   centerElement("bank-beyond")

 })

 //slider
 let currentImage = 0

 const sliderImages = document.querySelectorAll('.slider-image')

 const sliderIndex = document.getElementById('slider-index')

 const handleSlideChange = (step) => {
   currentImage += step

   if (currentImage < 0) {
     currentImage = sliderImages.length - 1
   } else if (currentImage >= sliderImages.length) {
     currentImage = 0
   }

   sliderContentWrapper.scrollLeft = sliderImages[currentImage].offsetLeft
 }

 document.getElementById("left-button").addEventListener("click", () => {
   handleSlideChange(-1)
 })
 document.getElementById("right-button").addEventListener("click", () => {
   handleSlideChange(1)
 })

 const sliderContentWrapper = document.getElementById("slider-content-wrapper")

 sliderContentWrapper.addEventListener("scroll", () => {
   const imageWidth = document.querySelectorAll('.slider-image')[0].offsetWidth

   currentImage = Math.round(sliderContentWrapper.scrollLeft / imageWidth)
   sliderIndex.innerText = `${currentImage + 1}/${sliderImages.length}`
 })
