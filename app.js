// app.js — protótipo local (usa localStorage)
// Estrutura: armazenamos reclamações em localStorage como array 'cq_complaints'
// Cada reclamação: { id, userName, email, company, title, description, createdAt, status, responses: [] }

function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,6); }

function getComplaints(){
  return JSON.parse(localStorage.getItem('cq_complaints')||'[]');
}
function saveComplaints(arr){ localStorage.setItem('cq_complaints', JSON.stringify(arr)); }

// LOGIN simples (sem segurança) — apenas para teste
document.addEventListener('DOMContentLoaded', ()=>{

  // Login page
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const email = document.getElementById('email').value;
      const name = email.split('@')[0] || 'Usuário';
      localStorage.setItem('cq_user', JSON.stringify({ name, email, type: 'user' }));
      location.href = 'home.html';
    });
    const skip = document.getElementById('skipBtn');
    if(skip) skip.addEventListener('click', (e)=>{
      e.preventDefault();
      localStorage.setItem('cq_user', JSON.stringify({ name: 'Teste', email:'teste@local', type:'user' }));
      location.href='home.html';
    });
  }

  // Signup
  const signupForm = document.getElementById('signupForm');
  if(signupForm){
    signupForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('su-email').value;
      const type = document.getElementById('accountType').value;
      localStorage.setItem('cq_user', JSON.stringify({ name, email, type }));
      location.href = (type==='company') ? 'company.html' : 'home.html';
    });
  }

  // Home — list complaints
  const listEl = document.getElementById('list');
  if(listEl){
    const user = JSON.parse(localStorage.getItem('cq_user')||'{}');
    document.getElementById('userName').textContent = user.name || 'Usuário';
    const data = getComplaints();
    if(data.length===0){
      listEl.innerHTML = `<div class="p-4 rounded-lg bg-[#081123] text-[color:var(--muted)]">Nenhuma reclamação ainda. Crie a primeira!</div>`;
    } else {
      listEl.innerHTML = data.map(c=>`
        <div class="bg-[#081123] p-4 rounded-lg flex justify-between items-start">
          <div>
            <div class="text-sm text-[color:var(--muted)]">${c.company} • ${new Date(c.createdAt).toLocaleString()}</div>
            <div class="font-semibold mt-1">${c.title}</div>
            <div class="text-sm text-[color:var(--muted)] mt-2">${c.description.slice(0,120)}${c.description.length>120?'...':''}</div>
          </div>
          <div class="ml-4">
            <a href="complaint.html?id=${c.id}" class="px-3 py-2 bg-[color:var(--purple)] rounded-lg">Abrir</a>
          </div>
        </div>
      `).join('');
    }
  }

  // Create complaint
  const createForm = document.getElementById('createForm');
  if(createForm){
    createForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const company = document.getElementById('company').value || 'Empresa';
      const title = document.getElementById('title').value || 'Sem título';
      const description = document.getElementById('description').value || '';
      const user = JSON.parse(localStorage.getItem('cq_user')||'{ "name":"Anon","email":"anon"}');
      const complaints = getComplaints();
      const item = { id: uid(), userName: user.name, email:user.email, company, title, description, createdAt: Date.now(), status:'aberto', responses: [] };
      complaints.unshift(item);
      saveComplaints(complaints);
      location.href = 'home.html';
    });
  }

  // Complaint detail
  const complaintCard = document.getElementById('complaintCard');
  if(complaintCard){
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const data = getComplaints();
    const item = data.find(x=>x.id===id);
    if(!item){
      complaintCard.innerHTML = `<div class="text-[color:var(--muted)]">Reclamação não encontrada.</div>`;
    } else {
      complaintCard.innerHTML = `
        <div class="text-sm text-[color:var(--muted)]">${item.company} • ${new Date(item.createdAt).toLocaleString()}</div>
        <div class="font-semibold text-xl mt-2">${item.title}</div>
        <div class="mt-3 text-[color:var(--muted)]">${item.description}</div>
        <div class="mt-4"><strong>Status:</strong> ${item.status}</div>
      `;
      const responsesEl = document.getElementById('responses');
      if(responsesEl){
        responsesEl.innerHTML = (item.responses||[]).map(r=>`<div class="p-3 bg-[#071223] rounded">${r}</div>`).join('') || `<div class="text-[color:var(--muted)]">Sem respostas ainda.</div>`;
      }
    }
  }

  // Company panel (list + reply)
  const companyList = document.getElementById('companyList');
  if(companyList){
    const data = getComplaints();
    companyList.innerHTML = data.map(c=>`
      <div class="bg-[#081123] p-4 rounded-lg flex justify-between items-start">
        <div>
          <div class="text-sm text-[color:var(--muted)]">${c.company} • ${new Date(c.createdAt).toLocaleString()}</div>
          <div class="font-semibold mt-1">${c.title}</div>
          <div class="text-sm text-[color:var(--muted)] mt-2">${c.description.slice(0,120)}</div>
        </div>
        <div class="ml-4 flex flex-col gap-2">
          <button class="replyBtn px-3 py-2 bg-[color:var(--accent)] rounded-lg" data-id="${c.id}">Responder</button>
          <button class="resolveBtn px-3 py-2 bg-[color:var(--purple)] rounded-lg" data-id="${c.id}">Marcar resolvido</button>
        </div>
      </div>
    `).join('');

    // attach events (delegation)
    companyList.querySelectorAll('.replyBtn').forEach(b=>{
      b.addEventListener('click', ()=>{
        const id = b.dataset.id;
        const text = prompt('Digite a resposta pública para o cliente:');
        if(text){
          const all = getComplaints();
          const idx = all.findIndex(x=>x.id===id);
          if(idx>=0){ all[idx].responses.push(text); saveComplaints(all); alert('Resposta publicada'); location.reload(); }
        }
      });
    });

    companyList.querySelectorAll('.resolveBtn').forEach(b=>{
      b.addEventListener('click', ()=>{
        const id = b.dataset.id;
        const all = getComplaints();
        const idx = all.findIndex(x=>x.id===id);
        if(idx>=0){ all[idx].status = 'resolvido'; saveComplaints(all); alert('Marcado como resolvido'); location.reload(); }
      });
    });
  }

});
