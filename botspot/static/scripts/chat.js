// Collapsible
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function () {
		this.classList.toggle("active");

		var content = this.nextElementSibling;

		if (content.style.maxHeight) {
			content.style.maxHeight = null;
		} else {
			content.style.maxHeight = content.scrollHeight + "px";
		}
	});
}

function readOutLoud(message) {
	var speech = new SpeechSynthesisUtterance();

	// Set the text and voice attributes.
	speech.text = message;
	speech.volume = 1;
	speech.rate = 1;
	speech.pitch = 1;

	window.speechSynthesis.speak(speech);
}

function getTime() {
	let today = new Date();
	hours = today.getHours();
	minutes = today.getMinutes();

	if (hours < 10) {
		hours = "0" + hours;
	}

	if (minutes < 10) {
		minutes = "0" + minutes;
	}

	let time = hours + ":" + minutes;
	return time;
}

// Gets the first message
function firstBotMessage() {
	let firstMessage = "How's it going?";
	document.getElementById("botStarterMessage").innerHTML =
		'<p class="botText"><span>' + firstMessage + "</span></p>";
	readOutLoud(firstMessage);
	let time = getTime();

	$("#chat-timestamp").append(time);
	document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();

// Retrieves the response
function getHardResponse(userText) {
	let botResponse = getBotResponse(userText);
	readOutLoud(botResponse);
	let botHtml = '<p class="botText"><span>' + botResponse + "</span></p>";
	$("#chatbox").append(botHtml);

	document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

//Gets the text text from the input box and processes it
function getResponse() {
	let userText = $("#textInput").val();

	if (userText == "") {
		userText = "hello";
	}

	let userHtml = '<p class="userText"><span>' + userText + "</span></p>";

	$("#textInput").val("");
	$("#chatbox").append(userHtml);
	document.getElementById("chat-bar-bottom").scrollIntoView(true);

	setTimeout(() => {
		getHardResponse(userText);
	}, 1000);
}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
	let userHtml = '<p class="userText"><span>' + sampleText + "</span></p>";

	$("#textInput").val("");
	$("#chatbox").append(userHtml);
	document.getElementById("chat-bar-bottom").scrollIntoView(true);

	//Uncomment this if you want the bot to respond to this buttonSendText event
	// setTimeout(() => {
	//     getHardResponse(sampleText);
	// }, 1000)
}

function sendButton() {
	getResponse();
}

function microphoneButton() {
	// buttonSendText("Heart clicked!");
	// get output div reference
	var output = document.getElementById("output");
	// get action element reference
	var action = document.getElementById("action");
	// new speech recognition object
	var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
	var recognition = new SpeechRecognition();

	// This runs when the speech recognition service starts
	recognition.onstart = function () {
		// action.innerHTML = "<small>listening, please speak...</small>";
	};

	recognition.onspeechend = function () {
		// action.innerHTML = "<small>stopped listening, hope you are done...</small>";
		recognition.stop();
	};

	var transcript;

	// This runs when the speech recognition service returns result
	recognition.onresult = function (event) {
		transcript = event.results[0][0].transcript;
		var confidence = event.results[0][0].confidence;
		// output.innerHTML =
		// 	"<b>Text:</b> " +
		// 	transcript +
		// 	"<br/> <b>Confidence:</b> " +
		// 	confidence * 100 +
		// 	"%";
		// output.classList.remove("hide");
	};

	// start recognition
	recognition.start();
	setTimeout(() => {
		document.getElementById("textInput").value = transcript;
		sendButton();
	}, 5000);
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
	if (e.which == 13) {
		getResponse();
	}
});
