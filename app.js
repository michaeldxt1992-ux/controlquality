// app.js - Lógica principal do Control Quality
// Usa window.db (Firestore) e window.auth (Firebase Auth)

// ==================================================
//                    HELPERS
// ==================================================
function uid() {
  return auth.currentUser ? auth.currentUser.uid : null;
}

function showMsg(t) {
  alert(t);
}

function escapeHtml(s) {
  if (!s) return "";
  return s.replace(/[&<>"'`=\/]/g, function (c) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
      "`": "&#x60;",
      "=": "&#x3D;"
    }[c];
  });
}

window.app = {};

// ==================================================
//            1. CRIAR RECLAMAÇÃO
// ==================================================
window.app.submitComplaint = async function () {
  const company = document.getElementById("company")?.value || "";
  const title = document.getElementById("title")?.value || "";
  const description = document.getElementById("description")?.value || "";

  if (!company || !title || !description) {
    showMsg("Preencha todos os campos.");
    return;
  }

  const userId = uid();
  if (!userId) {
    showMsg("Você precisa estar logado.");
    return;
  }

  try {
    await db.collection("complaints").add({
      userId,
      company,
      title,
      description,
      response: "",
      status: "open",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    showMsg("Reclamação enviada com sucesso!");
    window.location.href = "complaint-list.html";

  } catch (err) {
    console.error(err);
    showMsg("Erro ao enviar: " + err.message);
  }
};

// ==================================================
//      2. LISTAR RECLAMAÇÕES (USUÁRIO LOGADO)
// ==================================================
window.app.loadMyComplaints = async function () {
  const userId = uid();
  if (!userId) {
    window.location.href = "index.html";
    return;
  }

  const listEl = document.getElementById("complaint-list");
  listEl.innerHTML = "Carregando...";

  const snap = await db.collection("complaints")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  if (snap.empty) {
    listEl.innerHTML = "<p class='small'>Nenhuma reclamação encontrada.</p>";
    return;
  }

  listEl.innerHTML = "";

  snap.forEach(doc => {
    const d = doc.data();

    const node = document.createElement("div");
    node.className = "list-item";

    node.innerHTML = `
      <div>
        <strong>${escapeHtml(d.title)}</strong>
        <div class="small">${escapeHtml(d.company)} • ${
          d.createdAt
            ? new Date(d.createdAt.seconds * 1000).toLocaleString()
            : ""
        }</div>
      </div>

      <div>
        <div class="badge ${d.status === "open" ? "open" : "closed"}">
          ${d.status === "open" ? "Aberta" : "Fechada"}
        </div>
        <div style="margin-top:8px">
          <button class="btn ghost" onclick="viewComplaint('${doc.id}')">Ver</button>
        </div>
      </div>
    `;

    listEl.appendChild(node);
  });
};

window.viewComplaint = function (id) {
  window.location.href = "complaint-detail.html?id=" + id;
};

// ==================================================
//     3. PAINEL DA EMPRESA - LISTAR RECLAMAÇÕES
// ==================================================
window.app.loadAllComplaintsForCompany = async function (companyName) {
  const listEl = document.getElementById("company-list");
  listEl.innerHTML = "Carregando...";

  const snap = await db.collection("complaints")
    .where("company", "==", companyName)
    .orderBy("createdAt", "desc")
    .get();

  if (snap.empty) {
    listEl.innerHTML = "<p class='small'>Nenhuma reclamação.</p>";
    return;
  }

  listEl.innerHTML = "";

  snap.forEach(doc => {
    const d = doc.data();

    const node = document.createElement("div");
    node.className = "list-item";

    node.innerHTML = `
      <div>
        <strong>${escapeHtml(d.title)}</strong>
        <div class="small">
          ${d.createdAt ? new Date(d.createdAt.seconds * 1000).toLocaleString() : ""}
        </div>
      </div>

      <div>
        <div class="badge ${d.status === "open" ? "open" : "closed"}">
          ${d.status === "open" ? "Aberta" : "Fechada"}
        </div>

        <div style="margin-top:8px">
          <button class="btn" onclick="openResponse('${doc.id}')">Responder</button>
        </div>
      </div>
    `;

    listEl.appendChild(node);
  });
};

window.openResponse = function (id) {
  window.location.href = "company-response.html?id=" + id;
};

// ==================================================
//         4. RESPONDER RECLAMAÇÃO
// ==================================================
window.app.respondComplaint = async function (id) {
  const text = document.getElementById("company-response")?.value;

  if (!text) {
    showMsg("Digite uma resposta.");
    return;
  }

  try {
    await db.collection("complaints").doc(id).update({
      response: text,
      status: "closed",
      respondedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    showMsg("Resposta enviada!");
    window.location.href = "company-panel.html";

  } catch (err) {
    console.error(err);
    showMsg("Erro ao responder: " + err.message);
  }
};

// ==================================================
//                5. CRIAR DENÚNCIA
// ==================================================
window.app.submitReport = async function () {
  const against = document.getElementById("against")?.value.trim();
  const reason = document.getElementById("reason")?.value.trim();
  const description = document.getElementById("description")?.value.trim();

  if (!against || !reason || !description) {
    alert("Preencha todos os campos!");
    return;
  }

  const userId = uid();

  await db.collection("reports").add({
    userId,
    against,
    reason,
    description,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  alert("Denúncia enviada!");
  window.location.href = "report-list.html";
};

// ==================================================
//       6. LISTAR DENÚNCIAS DO USUÁRIO
// ==================================================
window.app.loadMyReports = async function () {
  const userId = uid();
  const listEl = document.getElementById("report-list");

  const snap = await db.collection("reports")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  listEl.innerHTML = "";

  if (snap.empty) {
    listEl.innerHTML = "<p class='small'>Nenhuma denúncia encontrada.</p>";
    return;
  }

  snap.forEach(doc => {
    const d = doc.data();

    const node = document.createElement("div");
    node.className = "list-item";

    node.innerHTML = `
      <div>
        <strong>${d.reason}</strong>
        <div class="small">
          ${d.createdAt ? new Date(d.createdAt.seconds * 1000).toLocaleString() : ""}
        </div>
      </div>

      <div>
        <button class="btn ghost" onclick="location.href='report-detail.html?id=${doc.id}'">Ver</button>
      </div>
    `;

    listEl.appendChild(node);
  });
};

