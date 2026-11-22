if(supabaseConfigured&&window.supabase)window.supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
const form=document.querySelector("#noticiaForm"),list=document.querySelector("#adminLista"),statusEl=document.querySelector("#status");
let session=null;
function esc(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
async function init(){
 if(!supabaseConfigured){statusEl.textContent="Configure o Supabase no config.js.";form.style.display="none";return;}
 const {data}=await window.supabaseClient.auth.getSession();session=data.session;
 if(!session){location.href="login.html";return;} await load();
}
async function load(){const {data,error}=await window.supabaseClient.from("news").select("*").order("created_at",{ascending:false});if(error){statusEl.textContent=error.message;return;}
 list.innerHTML=(data||[]).map(n=>`<article><h3>${esc(n.title)}</h3><small>${esc(n.category)}</small><div><button class="btn btn-sec" data-edit="${n.id}">Editar</button> <button class="btn btn-danger" data-del="${n.id}">Excluir</button></div></article>`).join("")||"<p>Nenhuma notícia cadastrada.</p>";
 list.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>edit(data.find(n=>String(n.id)===b.dataset.edit)));
 list.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>del(b.dataset.del));}
function edit(n){document.querySelector("#id").value=n.id;document.querySelector("#titulo").value=n.title;document.querySelector("#categoria").value=n.category;document.querySelector("#resumo").value=n.summary||"";document.querySelector("#conteudo").value=n.content||"";document.querySelector("#imagem").value=n.image||"";document.querySelector("#formTitulo").textContent="Editar notícia";window.scrollTo({top:0,behavior:"smooth"});}
async function del(id){if(!confirm("Excluir esta notícia?"))return;const {error}=await window.supabaseClient.from("news").delete().eq("id",id);if(error)statusEl.textContent=error.message;else load();}
form.addEventListener("submit",async e=>{e.preventDefault();const obj={title:titulo.value,category:categoria.value,summary:resumo.value,content:conteudo.value,image:imagem.value||null,author_id:session.user.id};
const id=document.querySelector("#id").value;const res=id?await window.supabaseClient.from("news").update(obj).eq("id",id):await window.supabaseClient.from("news").insert(obj);if(res.error){statusEl.textContent=res.error.message;return;}statusEl.textContent="Notícia salva.";form.reset();document.querySelector("#id").value="";document.querySelector("#formTitulo").textContent="Nova notícia";load();});
document.querySelector("#cancelar").onclick=()=>{form.reset();document.querySelector("#id").value="";document.querySelector("#formTitulo").textContent="Nova notícia";};
document.querySelector("#sair").onclick=async()=>{await window.supabaseClient.auth.signOut();location.href="index.html";};
init();
