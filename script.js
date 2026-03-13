let setores = JSON.parse(localStorage.getItem("setores")) || [
{nome:"Bebidas",icone:"fa-wine-bottle"},
{nome:"Confeitaria",icone:"fa-cake-candles"},
{nome:"Panificação",icone:"fa-bread-slice"}
]

let dados = JSON.parse(localStorage.getItem("dados")) || {}

function salvar(){

localStorage.setItem("setores",JSON.stringify(setores))
localStorage.setItem("dados",JSON.stringify(dados))

}

function render(){

let tabs = document.getElementById("tabs")
let conteudo = document.getElementById("conteudo")

tabs.innerHTML=""
conteudo.innerHTML=""

setores.forEach((s,i)=>{

tabs.innerHTML+=`
<div class="tab ${i==0?"active":""}" onclick="abrir(${i})">
<i class="fa-solid ${s.icone}"></i> ${s.nome}
</div>
`

conteudo.innerHTML+=`
<div class="setor ${i==0?"active":""}" id="setor${i}">
<div class="lista"></div>
<button onclick="novoItem(${i})">+ Produto</button>
</div>
`

if(!dados[i]) dados[i]=[]

dados[i].forEach(item=>{

criarItem(i,item.produto,item.qtd,item.vendedor)

})

})

salvar()

}

function abrir(i){

document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"))
document.querySelectorAll(".setor").forEach(s=>s.classList.remove("active"))

document.querySelectorAll(".tab")[i].classList.add("active")
document.getElementById("setor"+i).classList.add("active")

}

function criarItem(sec,produto="",qtd="",vendedor=""){

let lista=document.querySelector(`#setor${sec} .lista`)

let div=document.createElement("div")

div.className="item"

div.innerHTML=`
<input placeholder="Produto" value="${produto}">
<input type="number" placeholder="Qtd" style="width:60px" value="${qtd}">
<input placeholder="Vendedor" value="${vendedor}">
`

div.addEventListener("input",atualizar)

lista.appendChild(div)

}

function novoItem(sec){

criarItem(sec)

atualizar()

}

function atualizar(){

dados={}

setores.forEach((s,i)=>{

dados[i]=[]

let itens=document.querySelectorAll(`#setor${i} .item`)

itens.forEach(it=>{

let inputs=it.querySelectorAll("input")

dados[i].push({

produto:inputs[0].value,
qtd:inputs[1].value,
vendedor:inputs[2].value

})

})

})

salvar()

}

function novoSetor(){

let nome=prompt("Nome do setor")

if(nome){

setores.push({nome:nome,icone:"fa-box"})

salvar()

render()

}

}

function finalizarPedido(){

let texto="PEDIDO\n\n"

setores.forEach((s,i)=>{

let itens=dados[i]

if(itens && itens.length){

texto+=s.nome+"\n"

itens.forEach(it=>{

if(it.produto){

texto+=`${it.qtd}x ${it.produto} - ${it.vendedor}\n`

}

})

texto+="\n"

}

})

document.getElementById("textoPedido").value=texto

document.getElementById("pedidoFinal").classList.remove("hidden")

}

function copiarPedido(){

let texto=document.getElementById("textoPedido")

texto.select()

document.execCommand("copy")

alert("Pedido copiado!")

}

render()