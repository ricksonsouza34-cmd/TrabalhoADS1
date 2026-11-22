const statusEl=document.querySelector("#status");
if(supabaseConfigured&&window.supabase)window.supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
document.querySelector("#loginForm")?.addEventListener("submit",async e=>{
 e.preventDefault(); if(!supabaseConfigured){statusEl.textContent="Configure primeiro a URL e a chave do Supabase no arquivo config.js.";return;}
 const {error}=await window.supabaseClient.auth.signInWithPassword({email:email.value,password:senha.value});
 if(error){statusEl.textContent=error.message;return;} location.href="admin.html";
});
document.querySelector("#cadastroForm")?.addEventListener("submit",async e=>{
 e.preventDefault(); if(!supabaseConfigured){statusEl.textContent="Configure primeiro a URL e a chave do Supabase no arquivo config.js.";return;}
 const {data,error}=await window.supabaseClient.auth.signUp({email:email.value,password:senha.value,options:{data:{name:nome.value}}});
 if(error){statusEl.textContent=error.message;return;} statusEl.textContent="Cadastro realizado. Se a confirmação de email estiver ativada, verifique sua caixa de entrada.";
});
