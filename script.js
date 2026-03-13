const setores = ["Bebidas","Confeitaria","Panificação"]

let dados = JSON.parse(localStorage.getItem("pedidos")) || {}

setores.forEach(s=>{
if(!dados[s]) dados[s] = {}
})

function salvar(){
localStorage.setItem("pedidos",JSON.stringify(dados))
}

function render(){

const container = document.getElementById("setores")

container.innerHTML=""

setores.forEach(setor=>{

const box = document.createElement("div")
box.className="setor"

const header = document.createElement("div")
header.className="setorHeader"

const titulo = document.createElement("span")
titulo.innerText=setor

const limpar = document.createElement("button")
limpar.innerText="🗑"
limpar.className="lixeira"

limpar.onclick=()=>{

for(let p in dados[setor]){
dados[setor][p] = ""
}

salvar()
render()

}

header.appendChild(titulo)
header.appendChild(limpar)

box.appendChild(header)

for(let prod in dados[setor]){

const linha = document.createElement("div")
linha.className="produto"

const nome = document.createElement("span")
nome.innerText=prod

const qtd = document.createElement("input")
qtd.type="number"
qtd.value=dados[setor][prod]

qtd.oninput=()=>{
dados[setor][prod] = qtd.value
salvar()
}

const btns = document.createElement("div")
btns.className="qtdBtns"

;[1,2,5,10,20].forEach(n=>{

const b = document.createElement("button")

b.innerText=n

b.onclick=()=>{

let atual = parseInt(qtd.value) || 0

qtd.value = atual + n

dados[setor][prod] = qtd.value

salvar()

}

btns.appendChild(b)

})

linha.appendChild(nome)
linha.appendChild(qtd)
linha.appendChild(btns)

box.appendChild(linha)

}

const add = document.createElement("button")

add.innerText="+ Produto"

add.className="addProduto"

add.onclick=()=>{

let nome = prompt("Produto")

if(!nome) return

dados[setor][nome] = ""

salvar()

render()

}

box.appendChild(add)

container.appendChild(box)

})

}

render()

document.getElementById("finalizarBtn").onclick=()=>{

const final = document.getElementById("pedidoFinal")

final.innerHTML=""

for(let setor in dados){

let itens=""

for(let prod in dados[setor]){

if(dados[setor][prod] > 0){

itens += `<div>${prod} - ${dados[setor][prod]}</div>`

}

}

if(itens){

final.innerHTML += `<h3>${setor}</h3>${itens}`

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

for(let prod in dados[setor]){

if(dados[setor][prod] > 0){

itens += `${prod} - ${dados[setor][prod]}\n`

}

}

if(itens){

texto += `${setor}\n${itens}\n`

}

}

navigator.clipboard.writeText(texto)

alert("Copiado")

}
