const tabs=document.getElementById("tabs")
const conteudo=document.getElementById("conteudo")

let setores=JSON.parse(localStorage.getItem("setores"))||[
"Bebidas",
"Confeitaria",
"Panificação"
]

let dados=JSON.parse(localStorage.getItem("dados"))||{}

function salvar(){
localStorage.setItem("setores",JSON.stringify(setores))
localStorage.setItem("dados",JSON.stringify(dados))
}

function criarTabs(){

tabs.innerHTML=""

setores.forEach((nome,i)=>{

let t=document.createElement("div")
t.className="tab"
t.innerText=nome

t.onclick=()=>abrirSetor(i)

tabs.appendChild(t)

})

}

function abrirSetor(i){

document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"))
tabs.children[i].classList.add("active")

conteudo.innerHTML=""

let setor=setores[i]

if(!dados[setor]) dados[setor]=[]

let div=document.createElement("div")
div.className="setor"

dados[setor].forEach(produto=>{
div.appendChild(criarItem(setor,produto))
})

let botao=document.createElement("button")
botao.innerText="+ Produto"

botao.onclick=()=>{

let nome=prompt("Nome do produto")

if(!nome) return

dados[setor].push({
produto:nome,
qtd:""
})

salvar()
abrirSetor(i)

}

div.appendChild(botao)

conteudo.appendChild(div)

}

function criarItem(setor,item){

let div=document.createElement("div")
div.className="item"

let nome=document.createElement("div")
nome.className="nomeProduto"
nome.innerText=item.produto

let qtd=document.createElement("input")
qtd.type="number"
qtd.placeholder="Qtd"
qtd.value=item.qtd||""

qtd.oninput=()=>{
item.qtd=qtd.value
salvar()
}

let botoes=document.createElement("div")
botoes.className="botoesQtd"

;[1,2,3,4].forEach(n=>{

let b=document.createElement("button")
b.innerText="+"+n

b.onclick=()=>{

let atual=parseInt(qtd.value)||0
let novo=atual+n

qtd.value=novo
item.qtd=novo

salvar()

}

botoes.appendChild(b)

})

div.appendChild(nome)
div.appendChild(qtd)
div.appendChild(botoes)

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

setores.forEach(setor=>{

let lista=dados[setor]

if(!lista) return

let ativos=lista.filter(p=>p.qtd)

if(ativos.length==0) return

texto+=setor.toUpperCase()+"\n"

ativos.forEach(p=>{
texto+=`${p.qtd} x ${p.produto}\n`
})

texto+="\n"

})

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
