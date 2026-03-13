const tabs = document.getElementById("tabs")
const conteudo = document.getElementById("conteudo")

let setores = JSON.parse(localStorage.getItem("setores")) || [
"Bebidas",
"Confeitaria",
"Panificação"
]

let dados = JSON.parse(localStorage.getItem("dados")) || {}

function salvar(){

localStorage.setItem("setores",JSON.stringify(setores))
localStorage.setItem("dados",JSON.stringify(dados))

}

function criarTabs(){

tabs.innerHTML=""

setores.forEach((nome,i)=>{

let t=document.createElement("div")
t.className="tab"
t.innerHTML=nome

t.onclick=()=>abrirSetor(i)

tabs.appendChild(t)

})

}

function abrirSetor(i){

document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"))
tabs.children[i].classList.add("active")

conteudo.innerHTML=""

let setor=setores[i]

let div=document.createElement("div")
div.className="setor active"

let lista=dados[setor] || []

lista.forEach(item=>{

div.appendChild(criarItem(setor,item))

})

let botao=document.createElement("button")
botao.innerHTML="+ Produto"

botao.onclick=()=>{

let novo={produto:"",qtd:"",vendedor:""}

if(!dados[setor]) dados[setor]=[]

dados[setor].push(novo)

div.insertBefore(criarItem(setor,novo),botao)

salvar()

}

div.appendChild(botao)

conteudo.appendChild(div)

}

function criarItem(setor,item){

let div=document.createElement("div")
div.className="item"

let produto=document.createElement("input")
produto.placeholder="Produto"
produto.value=item.produto

produto.oninput=()=>{
item.produto=produto.value
salvar()
}

let qtd=document.createElement("input")
qtd.placeholder="Qtd"
qtd.value=item.qtd

qtd.oninput=()=>{
item.qtd=qtd.value
salvar()
}

let vendedor=document.createElement("input")
vendedor.placeholder="Vendedor"
vendedor.value=item.vendedor

vendedor.oninput=()=>{
item.vendedor=vendedor.value
salvar()
}

div.appendChild(produto)
div.appendChild(qtd)
div.appendChild(vendedor)

return div

}

function novoSetor(){

let nome=prompt("Nome do setor")

if(!nome) return

setores.push(nome)

salvar()

criarTabs()

}

function finalizarPedido(){

let texto=""

for(let setor of setores){

let lista=dados[setor]

if(!lista) continue

let itens=lista.filter(i=>i.produto)

if(itens.length==0) continue

texto+=setor.toUpperCase()+"\n"

itens.forEach(i=>{

texto+=`${i.qtd || "-"} x ${i.produto}`

if(i.vendedor) texto+=` (${i.vendedor})`

texto+="\n"

})

texto+="\n"

}

document.getElementById("pedidoFinal").classList.remove("hidden")

document.getElementById("textoPedido").value=texto

}

function copiarPedido(){

let txt=document.getElementById("textoPedido")

txt.select()

document.execCommand("copy")

alert("Pedido copiado!")

}

criarTabs()

abrirSetor(0)
