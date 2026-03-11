const addBtn = document.getElementById("addBtn")
const taskInput = document.getElementById("taskInput")
const list = document.getElementById("taskList")

addBtn.onclick = addTask

function addTask(){

const text = taskInput.value

if(text === "") return

const card = document.createElement("div")
card.className = "task"

const top = document.createElement("div")
top.className = "taskTop"

const icon = document.createElement("span")
icon.className = "icon"
icon.textContent = "🌱"

icon.onclick = () => {

icon.textContent =
icon.textContent === "🌱" ? "🌸" : "🌱"

}

const label = document.createElement("span")
label.textContent = text

const attach = document.createElement("span")
attach.className = "attach"
attach.textContent = "+"

attach.onclick = () => {

const input = document.createElement("input")
input.type = "file"

input.onchange = (e) => {

const file = e.target.files[0]

if(!file) return

const preview = document.createElement("div")
preview.className = "filePreview"

const url = URL.createObjectURL(file)

if(file.type.startsWith("image")){

const img = document.createElement("img")
img.src = url
preview.appendChild(img)

}

else if(file.type.startsWith("video")){

const vid = document.createElement("video")
vid.src = url
vid.controls = true
preview.appendChild(vid)

}

else if(file.type.startsWith("audio")){

const aud = document.createElement("audio")
aud.src = url
aud.controls = true
preview.appendChild(aud)

}

card.appendChild(preview)

}

input.click()

}

top.appendChild(icon)
top.appendChild(label)
top.appendChild(attach)

card.appendChild(top)
list.appendChild(card)

taskInput.value = ""

}
