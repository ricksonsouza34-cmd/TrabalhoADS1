const samples = [
 {id:"d1",title:"Projeto de mobilidade propõe novas alternativas para deslocamentos urbanos",category:"Brasil",summary:"Texto demonstrativo sobre planejamento urbano e alternativas de transporte.",content:"Este é um texto demonstrativo para o projeto acadêmico Portal Notícias. O conteúdo não representa uma notícia real.",image:"https://images.unsplash.com/photo-1449824907227-63b8f5f5c1a?auto=format&fit=crop&w=1200&q=80",created_at:"2026-11-21"},
 {id:"d2",title:"Pesquisadores apresentam estudo sobre uso de tecnologia na educação",category:"Tecnologia",summary:"Pesquisa fictícia ilustra como recursos digitais podem ser abordados em reportagens.",content:"Texto fictício criado apenas para demonstrar a estrutura de uma página de notícias.",image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",created_at:"2026-11-21"},
 {id:"d3",title:"Cidades se preparam para programação cultural de fim de semana",category:"Brasil",summary:"Agenda cultural demonstrativa reúne atividades de música, arte e lazer.",content:"Conteúdo de exemplo sem relação com eventos reais.",image:"https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",created_at:"2026-11-20"},
 {id:"d4",title:"Equipes jovens participam de torneio regional em temporada de preparação",category:"Esportes",summary:"Uma matéria de exemplo sobre competições esportivas e preparação de atletas.",content:"Notícia fictícia utilizada como conteúdo inicial para o site.",image:"https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80",created_at:"2026-11-20"},
 {id:"d5",title:"Conferência internacional debate soluções para desafios ambientais",category:"Mundo",summary:"Reportagem fictícia sobre cooperação entre países e sustentabilidade.",content:"Texto demonstrativo, não é uma notícia factual.",image:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80",created_at:"2026-11-19"},
 {id:"d6",title:"Aplicativos ganham novas funções para facilitar tarefas do cotidiano",category:"Tecnologia",summary:"Exemplo de notícia sobre inovação e ferramentas digitais.",content:"Conteúdo fictício de demonstração.",image:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9?auto=format&fit=crop&w=900&q=80",created_at:"2026-11-19"}
];
let allNews = samples;
const destaque = document.querySelector("#destaque");
const lista = document.querySelector("#noticias");
function safe(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function render(items){
 if(!items.length){lista.innerHTML="<p>Nenhuma notícia encontrada.</p>";return;}
 const lead=items[0];
 destaque.innerHTML=`<img src="${safe(lead.image||"")}" alt=""><div class="destaque-texto"><span class="tag">${safe(lead.category)}</span><h1>${safe(lead.title)}</h1><p>${safe(lead.summary||lead.content||"")}</p></div>`;
 lista.innerHTML=items.slice(1).map(n=>`<article class="noticia"><img src="${safe(n.image||"")}" alt=""><div><span class="tag">${safe(n.category)}</span><h3>${safe(n.title)}</h3><p>${safe(n.summary||n.content||"")}</p><small>${n.created_at?new Date(n.created_at).toLocaleDateString("pt-BR"):""}</small></div></article>`).join("");
}
async function loadNews(){
 if(supabaseConfigured){
  try { const {data,error}=await window.supabaseClient.from("news").select("*").order("created_at",{ascending:false}); if(error)throw error; if(data&&data.length){allNews=data;render(allNews);return;} }
  catch(e){document.querySelector("#mensagem").textContent="Banco de dados não carregou. Exibindo notícias demonstrativas.";}
 }
 render(allNews);
}
document.querySelector("#busca").addEventListener("input",e=>{const q=e.target.value.toLowerCase();render(allNews.filter(n=>(n.title+" "+n.summary+" "+n.category).toLowerCase().includes(q)));});
document.querySelectorAll(".categorias a").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();const c=a.dataset.category;render(c==="Todas"?allNews:allNews.filter(n=>n.category===c));document.querySelector(".categorias").classList.remove("aberta");}));
if(supabaseConfigured&&window.supabase)window.supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
loadNews();
