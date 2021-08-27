// mathjs import


// import { create, all } from 'mathjs';
// // const { create, all} = require('mathjs');

// const config = { };
// const math = create(all, config);

// // test mathjs on web console
// console.log(math.sqrt(-4).toString);



var sendForm = document.querySelector('#chatform'),
    textInput = document.querySelector('.chatbox'),
    imageInput = document.querySelector('input[type=file]'),
    chatList = document.querySelector('.chatlist'),
    userBubble = document.querySelectorAll('.userInput'),
    botBubble = document.querySelectorAll('.bot__output'),
    animateBotBubble = document.querySelectorAll('.bot__input--animation'),
    overview = document.querySelector('.chatbot__overview'),
    hasCorrectInput,
    imgLoader = false,
    animationCounter = 1,
    animationBubbleDelay = 600,
    input,
    previousInput,
    isReaction = false,
    unkwnCommReaction = "I didn't quite get that.";

// //fixed that when you scroll to end it doesnt scroll window
// chatList.addEventListener('mouseover', function(){
//   document.body.style.overflow='hidden';
// })
// //
// chatList.addEventListener('mouseout', function(){
//   document.body.style.overflow='auto';
//   document.body.style.overflowX='hidden';
// })

sendForm.onkeydown = function(e){
  if(e.keyCode == 13){
    e.preventDefault();

    //No mix ups with upper and lowercases
    var text_input = textInput.value.toLowerCase();
    var image_input = imageInput.files;

    //Empty textarea fix
    if(text_input.length > 0) {
      createBubble(text_input)
    }
    if (image_input.length > 0){
      createBubble(image_input)
    }
  }
};

sendForm.addEventListener('submit', function(e) {
  //so form doesnt submit page (no page refresh)
  e.preventDefault();

  //No mix ups with upper and lowercases
  var text_input = textInput.value.toLowerCase();
  var image_input = imageInput.files;

  //Empty textarea fix
  if(text_input.length > 0) {
    createBubble(text_input)
  }
  if (image_input.length > 0){
    createBubble(image_input)
  }
}) //end of eventlistener



var createBubble = function(input) {
  //create input bubble

  var chatBubble = document.createElement('li');
  chatBubble.classList.add('userInput');

  if (typeof(input) === 'string'){
    //adds input of textarea to chatbubble list item
    chatBubble.innerHTML = input;
    console.log('input = '+input);
    chatList.appendChild(chatBubble);
  } else {
    var image = new Image();
    image.src = window.URL.createObjectURL(input[0]);
    image.classList.add('userInput');
    image.classList.add('userInputImg');
    chatList.appendChild(image);
  }
  
  checkInput(input);
}

var checkInput = function(input) {
  hasCorrectInput = false;
  isReaction = false;
  //Checks all text values in possibleInput
  if (typeof(input) === 'string'){
    for(var textVal in possibleInput){

      // if(input.includes(textVal) == true){
      //   console.log("include succes");
      // }

      //If user reacts with "yes" and the previous input was in textVal
      if(input == "yes" || input.indexOf("yes") >= 0){
        if(previousInput == textVal) {
          console.log("sausigheid");

          isReaction = true;
          hasCorrectInput = true;
          botResponse(textVal);
        }
      }
      if(input == "no" && previousInput == textVal){
        unkwnCommReaction = "For a list of commands type: Commands";
        unknownCommand("I'm sorry to hear that :(")
        unknownCommand(unkwnCommReaction);
        hasCorrectInput = true;
      }
      //Is a word of the input also in possibleInput object?
      if(input == textVal || input.indexOf(textVal) >=0 && isReaction == false){
        console.log("succes");
        hasCorrectInput = true;
        botResponse(textVal);
      }
    }
    //When input is not in possibleInput
    if(hasCorrectInput == false){
      console.log("failed");
      unknownCommand(unkwnCommReaction);
      hasCorrectInput = true;
    }
  } else {
    botResponse(responseText("Image is being processed."))
  }
}

// debugger;

function botResponse(textVal) {
  //create response bubble
  var userBubble = document.createElement('li');
  userBubble.classList.add('bot__output');

  console.log(isReaction);
  console.log("previnp= "+previousInput);
  console.log("texval= "+textVal);
  if(isReaction == true){
    if (typeof reactionInput[textVal] === "function") {
    //adds input of textarea to chatbubble list item
      userBubble.innerHTML = reactionInput[textVal]();
    } else {
      userBubble.innerHTML = reactionInput[textVal];
    }
  }

  if(isReaction == false){
    //Is the command a function?
    if (typeof possibleInput[textVal] === "function") {
      // console.log(possibleInput[textVal] +" is a function");
    //adds input of textarea to chatbubble list item
      userBubble.innerHTML = possibleInput[textVal]();
    } else {
      userBubble.innerHTML = possibleInput[textVal];
    }
  }
  //add list item to chatlist
  chatList.appendChild(userBubble) //adds chatBubble to chatlist

  // reset text area input
  textInput.value = "";
  imageInput.value = "";
}

function unknownCommand(unkwnCommReaction) {
  // animationCounter = 1;

  //create response bubble
  var failedResponse = document.createElement('li');

  failedResponse.classList.add('bot__output');
  failedResponse.classList.add('bot__output--failed');

  //Add text to failedResponse
  failedResponse.innerHTML = unkwnCommReaction; //adds input of textarea to chatbubble list item

  //add list item to chatlist
  chatList.appendChild(failedResponse) //adds chatBubble to chatlist

  animateBotOutput();

  // reset text area input
  textInput.value = "";
  imageInput.value = "";

  //Sets chatlist scroll to bottom
  chatList.scrollTop = chatList.scrollHeight;

  animationCounter = 1;
}

function responseText(e) {

  var response = document.createElement('li');

  response.classList.add('bot__output');

  //Adds whatever is given to responseText() to response bubble
  response.innerHTML = e;

  chatList.appendChild(response);

  animateBotOutput();

  console.log(response.clientHeight);

  //Sets chatlist scroll to bottom
  setTimeout(function(){
    chatList.scrollTop = chatList.scrollHeight;
  //   // chatList.scrollTop = chatList.scrollTop + response.clientHeight;
  //   // console.log(chatList.scrollTop = chatList.scrollTop + response.clientHeight);
    console.log(response.clientHeight);
  }, 0)
}

function responseImg(e) {
  var image = new Image();
  var path = document.location.pathname;
  var directory = path.substring(path.indexOf('/'), path.lastIndexOf('/'));

  image.classList.add('bot__output');
  //Custom class for styling
  image.classList.add('bot__outputImage');
  //Gets the image
  image.src = directory + e;
  chatList.appendChild(image);

  animateBotOutput()
  if(image.completed) {
    console.log(image.scrollHeight);
    // chatList.scrollTop = chatList.scrollHeight;
    chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
  }
  else {
    image.addEventListener('load', function(){
      console.log(image.scrollHeight);
      chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
    })
  }
  //Load image so height gets checked after chatlist add

}

//change to SCSS loop
function animateBotOutput() {
  // chatList.scrollTop = chatList.scrollTop + response.scrollHeight;
  chatList.lastElementChild.style.animationDelay= (animationCounter * animationBubbleDelay)+"ms";
  animationCounter++;
  chatList.lastElementChild.style.animationPlayState = "running";
}

function commandReset(e){
  animationCounter = 1;
  previousInput = Object.keys(possibleInput)[e];

  console.log(previousInput);
}


var possibleInput = {
  "about" : function(){
    responseText("This is the bot to solve fomular automatically.");
    responseText("Please upload the fomular image.");

    //Outputs an image
    // responseImg("/images/rsz_meesface.jpg");
    // responseText("I'm a 20 year old Communication and Multimedia Design student");
    // responseText("My ambition is to become a great Creative Front-End Developer");
    // responseText("Would you like to know about Mees' vision? (Yes/No)");
    commandReset(0);
    return
    },
}

var reactionInput = {
  // "best work" : function(){
  //   responseText("On this GitHub page you'll find everything about Navvy");
  //   responseText("<a href='https://github.com/meesrutten/chatbot'>Navvy on GitHub</a>")
  //   animationCounter = 1;
  //   return
  // },
  // "about" : function(){
  //   responseText("Things I want to learn or do:");
  //   responseText("Get great at CSS & JS animation");
  //   responseText("Create 3D browser experiences");
  //   responseText("Learn Three.js and WebGL");
  //   responseText("Combine Motion Design with Front-End");
  //   animationCounter = 1;
  //   return
  //   },
  // "experience" : function(){
  //   responseText("I will redirect you to Mees' CV");
  //   setTimeout(function(){
  //     window.location.href = "/images/CV-MeesRutten-2017-februari.png"; }, 3000);
  //   animationCounter = 1;
  //   return
  // }
}


