const form = document.querySelector("#chatForm");
const prompt = document.querySelector("#prompt");
const messages = document.querySelector("#messages");

function useExample(text){ prompt.value=text; prompt.focus(); }
function newChat(){ messages.innerHTML=""; welcome(); }

function welcome(){
  messages.innerHTML=`<div class="welcome">
    <div class="logo">⚡</div><h2>Que veux-tu coder ?</h2>
    <p>Décris ton projet ou colle un problème de code.</p>
    <div class="examples">
      <button onclick="useExample('Crée-moi un bouton HTML avec JavaScript')">Créer un bouton</button>
      <button onclick="useExample('Écris une fonction JavaScript simple')">Écrire une fonction</button>
    </div>
  </div>`;
}

function addMessage(text, code){
  const el=document.createElement("div");
  el.className="message";
  el.innerHTML=`<div class="user"></div><div class="ai">Voici une première proposition de code :
    <div class="codebox"><div class="codebar"><span>code</span><button>Copier</button></div><pre></pre></div>
  </div>`;
  el.querySelector(".user").textContent=text;
  el.querySelector("pre").textContent=code;
  el.querySelector("button").onclick=()=>navigator.clipboard.writeText(code);
  messages.appendChild(el);
  messages.scrollTop=messages.scrollHeight;
}

form.addEventListener("submit", async e=>{
  e.preventDefault();
  const text=prompt.value.trim();
  if(!text)return;
  prompt.value="";
  const loading=document.createElement("div");
  loading.className="message ai";
  loading.textContent="CodeAI réfléchit…";
  messages.appendChild(loading);
  try{
    const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:text})});
    const data=await r.json();
    loading.remove();
    if(!r.ok) throw new Error(data.error||"Erreur");
    addMessage(text,data.code);
  }catch(err){loading.textContent="Erreur : "+err.message}
});
