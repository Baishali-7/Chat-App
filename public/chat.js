const socket = io()
const sendBtn = document.getElementById("sendBtn")
const messageInput = document.getElementById("message")
const messages = document.getElementById('messages')
const text = document.querySelector('.text')
const app = document.querySelector(".app")
const join = document.querySelector(".join")
const joinUser = document.querySelector("#joinUser")
const username = document.querySelector("#username")
const chatscreen = document.querySelector(".chatscreen")
const update = document.querySelector(".update")
const exit = document.querySelector("#exitChat")

let uname;

joinUser.addEventListener("click", e => {
    let uname = username.value
    if (uname.length === 0) {
        return
    }
    socket.emit("newuser", uname)
    join.classList.remove("active")
    chatscreen.classList.add("active")
    //update.innerHTML = `${uname} has joined`


})


// socket.on("message", (message) => {
//     const p = document.createElement('p')
//     p.innerText = message;
//     allMessages.appendChild(p)
    
//     //messages.appendChild(hi)
//     messages.appendChild(text)
// })


sendBtn.addEventListener('click', e => {
   console.log("clicked")
     const message = messageInput.value;
     console.log(message)
    if(message.length ==0){
        return;
    }
     renderMessage("my", {
        username: uname,
        text: message

    })
    // renderMessage("other", {
    //     username: uname,
    //     text: message

    // })
    socket.emit("user-message",{
        username:uname,
        text:message
    })

    messageInput.value=""
    //console.log(message)
    //socket.emit('user-message', message)
}
)



exit.addEventListener("click", function(){
    socket.emit("exiuser",uname)
    window.location.href = window.location.href;
})

socket.on("update",function(update){
    renderMessage("update",update)
})

socket.on("message",(message) =>{
    console.log("message",message)
    // renderMessage("other",{
    //     username:'you',
    //     text:"ghjkl;"
    // })
})


function renderMessage(type,message) {
    let messageContainer  = app.querySelector(".messages")

    if (type=="my"){
        let el = document.createElement("div")
        el.setAttribute("class","message myMessage")
        el.innerHTML =`<div>
        <div class="name">You</div>
        <div class="text">${message.text}</div>
    </div>`
    messageContainer.appendChild(el)
        //text.innerText = message
    }
    else if(type == "other"){
        let el = document.createElement("div")
        el.setAttribute("class","message otherMessage")
        el.innerHTML =`<div>
        <div class="name">${message.username}</div>
        <div class="text">${message.text}</div>
    </div>`
    messageContainer.appendChild(el)
    }
    
    else if(type == "update"){
        let el = document.createElement("div")
        el.setAttribute("class","update")
        el.innerText = message;
        messageContainer.appendChild(el)
    }
    //scroll caht
    messageContainer.scrollTop = messageContainer.scrollHeight-messageContainer.clientHeight;

}