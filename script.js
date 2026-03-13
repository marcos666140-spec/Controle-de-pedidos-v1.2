const setoresFixos = ["Bebidas","Confeitaria","Panificação"];
let setores = [];
let pedidos = {}; // pedidos armazenam só a quantidade por produto
let produtosFixos = {
  "Bebidas":["Água","Refrigerante","Suco"],
  "Confeitaria":["Bolo","Donut","Torta"],
  "Panificação":["Pão francês","Croissant","Pão de forma"]
};

// Inicialização
function init() {
  setores = [...setoresFixos];
  setores.forEach(s=>{
    pedidos[s] = {};
    produtosFixos[s].forEach(p => pedidos[s][p] = 0);
  });
  renderTabs();
}
init();

// Renderiza abas e conteúdo
function renderTabs() {
  const tabs = document.getElementById("tabs");
  tabs.innerHTML="";
  setores.forEach(setor=>{
    const div = document.createElement("div");
    div.className="tab";
    div.innerHTML=`<span>${setor}</span>`;
    if(!setoresFixos.includes(setor)){
      const btn = document.createElement("button");
      btn.textContent="X";
      btn.onclick=()=>excluirSetor(setor);
      div.appendChild(btn);
    }
    tabs.appendChild(div);
  });
  renderConteudo();
}

// Renderiza produtos com quantidade editável
function renderConteudo(){
  const conteudo = document.getElementById("conteudo");
  conteudo.innerHTML="";
  setores.forEach(setor=>{
    const div = document.createElement("div");
    div.className="setor";
    div.innerHTML=`<h3>${setor}</h3>`;

    if(!produtosFixos[setor]) produtosFixos[setor] = [];

    produtosFixos[setor].forEach(prod=>{
      if(pedidos[setor][prod] === undefined) pedidos[setor][prod]=0;

      const itemDiv = document.createElement("div");
      itemDiv.className="item";

      const span = document.createElement("span");
      span.textContent = prod;

      const qtdInput = document.createElement("input");
      qtdInput.type="number";
      qtdInput.min=0;
      qtdInput.value = pedidos[setor][prod];
      qtdInput.style.width="60px";
      qtdInput.onchange = () => {
        pedidos[setor][prod] = parseInt(qtdInput.value) || 0;
        salvar();
      };

      // Botões rápidos 1/2/3/4
      [1,2,3,4].forEach(n=>{
        const b = document.createElement("button");
        b.textContent = n;
        b.onclick = () => {
          pedidos[setor][prod] += n;
          qtdInput.value = pedidos[setor][prod];
          salvar();
        }
        itemDiv.appendChild(b);
      });

      itemDiv.appendChild(span);
      itemDiv.appendChild(qtdInput);

      div.appendChild(itemDiv);
    });

    conteudo.appendChild(div);
  });
}

// Novo setor
function novoSetor(){
  const nome = prompt("Nome do novo setor:");
  if(!nome) return;
  if(setores.includes(nome)) return alert("Setor já existe!");
  setores.push(nome);
  pedidos[nome]={};
  produtosFixos[nome]=[]; // sem produtos pré-definidos ainda
  salvar();
  renderTabs();
}

// Excluir setor
function excluirSetor(nome){
  if(!confirm(`Deseja excluir o setor ${nome}?`)) return;
  setores = setores.filter(s=>s!==nome);
  delete pedidos[nome];
  delete produtosFixos[nome];
  salvar();
  renderTabs();
}

// Modal finalizar pedido
function finalizarPedido(){
  const modal = document.getElementById("modalPedido");
  const container = document.getElementById("modalPedidos");
  container.innerHTML="";
  modal.style.display="flex";

  setores.forEach(setor=>{
    const produtosSetor = Object.keys(pedidos[setor]).filter(p=>pedidos[setor][p]>0);
    if(produtosSetor.length>0){
      const divSetor = document.createElement("div");
      divSetor.className="pedido-setor";
      const h = document.createElement("h3");
      h.textContent = `Pedido ${setor}`;
      divSetor.appendChild(h);

      produtosSetor.forEach(prod=>{
        const p = document.createElement("p");
        p.textContent = `${prod} - ${pedidos[setor][prod]}`;
        divSetor.appendChild(p);
      });

      container.appendChild(divSetor);
    }
  });

  const btnCopy = document.getElementById("copiarPedido");
  btnCopy.onclick=()=>{
    let texto="";
    const setoresModal = container.querySelectorAll(".pedido-setor");
    setoresModal.forEach(s=>{
      texto += s.querySelector("h3").textContent + "\n";
      s.querySelectorAll("p").forEach(p=>{
        texto += p.textContent + "\n";
      });
      texto += "\n";
    });
    navigator.clipboard.writeText(texto);
    alert("Pedido copiado!");
  }
}

// Fechar modal
function fecharModal(){
  document.getElementById("modalPedido").style.display="none";
}

// Salvar no localStorage
function salvar(){
  localStorage.setItem("pedidosApp_setores",JSON.stringify(setores));
  localStorage.setItem("pedidosApp_pedidos",JSON.stringify(pedidos));
  localStorage.setItem("pedidosApp_produtosFixos",JSON.stringify(produtosFixos));
}

// Recuperar do localStorage
window.onload=()=>{
  const s = localStorage.getItem("pedidosApp_setores");
  const p = localStorage.getItem("pedidosApp_pedidos");
  const pf = localStorage.getItem("pedidosApp_produtosFixos");
  if(s) setores = JSON.parse(s);
  if(p) pedidos = JSON.parse(p);
  if(pf) produtosFixos = JSON.parse(pf);
  renderTabs();
}
