const socket = io();

// socket.on('countUpdated', (count) => {
//     console.log("The count has been updated", count);
// });

// document.querySelector("#increment").addEventListener("click", () => {
//     console.log("Clicked");
//     socket.emit("increment");
// });

//Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $messages = document.querySelector("#messages");

//Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;

socket.on('welcomeMessage', (message) => {
    console.log(message);
});

$messageForm.addEventListener("submit", (e) => {
    e.preventDefault();

    $messageFormButton.setAttribute("disabled", "disabled");
    //const message = document.querySelector("input").value;
    const message = e.target.elements.message.value;
    socket.emit("sendMessage", message, (msg) =>{

        $messageFormButton.removeAttribute("disabled");
        $messageFormInput.value = "";
        $messageFormInput.focus();
        console.log("The message was delivered", msg);

        const html = Mustache.render(messageTemplate, {
            message
        });

        $messages.insertAdjacentHTML("beforeend", html)
    });
});

$sendLocationBtn = document.querySelector("#send-location");
$sendLocationBtn.addEventListener("click", () => {
    $sendLocationBtn.setAttribute("disabled", "disabled");
    if(!navigator.geolocation){
        return alert("Geo location is not supported by your browser.");
    }

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        socket.emit("sendLocation",{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        $sendLocationBtn.removeAttribute("disabled");
    });
});

socket.on('message', (message) => {
    console.log(message);
    
});
