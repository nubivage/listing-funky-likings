const addBtn=document.getElementById("addBtn")
const taskInput=document.getElementById("taskInput")
const list=document.getElementById("taskList")

let tasks=JSON.parse(localStorage.getItem("nubivages_tasks"))||[]

render()

addBtn.onclick=()=>{

const text=taskInput.value.trim()
if(!text) return

const task={
text:text,
done:false,
files:[]
}

tasks.push(task)

save()
render()

taskInput.value=""

}

function save(){
localStorage.setItem("nubivages_tasks",JSON.stringify(tasks))
}

function render(){

list.innerHTML=""

tasks.forEach((task,i)=>{

const card=document.createElement("div")
card.className="task"

const top=document.createElement("div")
top.className="taskTop"

const symbol=document.createElement("div")
symbol.className="symbol"

if(task.done) symbol.classList.add("done")

symbol.onclick=()=>{
tasks[i].done=!tasks[i].done
save()
render()
}

const label=document.createElement("span")
label.textContent=task.text

const attach=document.createElement("span")
attach.className="attach"
attach.textContent="+"

attach.onclick=()=>{

const input=document.createElement("input")
input.type="file"

input.onchange=(e)=>{

const file=e.target.files[0]
if(!file) return

const reader=new FileReader()

reader.onload=()=>{

tasks[i].files.push({
name:file.name,
data:reader.result,
type:file.type
})

save()
render()

}

reader.readAsDataURL(file)

}

input.click()

}

const del=document.createElement("span")
del.className="delete"
del.textContent="×"

del.onclick=()=>{
tasks.splice(i,1)
save()
render()
}

top.appendChild(symbol)
top.appendChild(label)
top.appendChild(attach)
top.appendChild(del)

card.appendChild(top)

if(task.files){

task.files.forEach(f=>{

const preview=document.createElement("div")
preview.className="filePreview"

if(f.type.startsWith("image")){

const img=document.createElement("img")
img.src=f.data
preview.appendChild(img)

}

else if(f.type.startsWith("video")){

const vid=document.createElement("video")
vid.src=f.data
vid.controls=true
preview.appendChild(vid)

}

else if(f.type.startsWith("audio")){

const aud=document.createElement("audio")
aud.src=f.data
aud.controls=true
preview.appendChild(aud)

}

card.appendChild(preview)

})

}

list.appendChild(card)

})

}
