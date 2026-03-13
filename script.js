const setores = ["Bebidas","Confeitaria","Panificação"]

let dados = JSON.parse(localStorage.getItem("pedidos")) || {}

setores.forEach(setor=>{
if(!dados[setor]){
dados[setor]={}
}
})

function salvar(){
localStorage.setItem("pedidos",JSON.stringify(dados))
}

function render(){

const container = document.getElementById("setores")

container.innerHTML=""

setores.forEach(setor=>{

const box=document.createElement("div")
box.className="setor"

const header=document.createElement("div")
header.className="setorHeader"

const titulo=document.createElement("span")
titulo.innerText=setor

const limparSetor=document.createElement("button")
limparSetor.innerText="🗑"
limparSetor.className="lixeira"

limparSetor.onclick=()=>{

for(let produto in dados[setor]){
dados[setor][produto]=""
}

salvar()
render()

}

header.appendChild(titulo)
header.appendChild(limparSetor)

box.appendChild(header)

for(let produto in dados[setor]){

const linha=document.createElement("div")
linha.className="produto"

const nome=document.createElement("span")
nome.innerText=produto

const input=document.createElement("input")
input.type="number"
input.value=dados[setor][produto]

input.oninput=()=>{
dados[setor][produto]=input.value
salvar()
}

const botoes=document.createElement("div")
botoes.className="qtdBtns"

;[1,2,5,10,20].forEach(valor=>{

const b=document.createElement("button")
b.innerText=valor

b.onclick=()=>{

let atual=parseInt(input.value)||0

input.value=atual+valor

dados[setor][produto]=input.value

salvar()

}

botoes.appendChild(b)

})

const limparItem=document.createElement("button")
limparItem.innerText="🧹"

limparItem.onclick=()=>{

input.value=""

dados[setor][produto]=""

salvar()

}

const excluirItem=document.createElement("button")
excluirItem.innerText="❌"

excluirItem.onclick=()=>{

if(confirm("Excluir produto?")){

delete dados[setor][produto]

salvar()

render()

}

}

linha.appendChild(nome)
linha.appendChild(input)
linha.appendChild(botoes)
linha.appendChild(limparItem)
linha.appendChild(excluirItem)

box.appendChild(linha)

}

const add=document.createElement("button")
add.innerText="+ Produto"
add.className="addProduto"

add.onclick=()=>{

let nome=prompt("Nome do produto")

if(!nome) return

dados[setor][nome]=""

salvar()

render()

}

box.appendChild(add)

container.appendChild(box)

})

}

render()

document.getElementById("finalizarBtn").onclick=()=>{

const final=document.getElementById("pedidoFinal")

final.innerHTML=""

for(let setor in dados){

let itens=""

for(let produto in dados[setor]){

if(dados[setor][produto]>0){

itens+=`<div>${produto} - ${dados[setor][produto]}</div>`

}

}

if(itens){

final.innerHTML+=`<h3>${setor}</h3>${itens}`

}

}

document.getElementById("modal").style.display="flex"

}

function fecharModal(){

document.getElementById("modal").style.display="none"

}

function copiarPedido(){

let texto=""

for(let setor in dados){

let itens=""

for(let produto in dados[setor]){

if(dados[setor][produto]>0){

itens+=`${produto} - ${dados[setor][produto]}\n`

}

}

if(itens){

texto+=`${setor}\n${itens}\n`

}

}

navigator.clipboard.writeText(texto)

alert("Pedido copiado")

}
