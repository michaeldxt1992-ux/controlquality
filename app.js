// ==============================
// CRIAR RECLAMAÇÃO
// ==============================

function createComplaint() {
    let titulo = document.getElementById("titulo").value.trim();
    let descricao = document.getElementById("descricao").value.trim();

    if (titulo === "" || descricao === "") {
        alert("Preencha todos os campos!");
        return;
    }

    db.collection("complaints")
        .add({
            titulo,
            descricao,
            resposta: "",
            userId: auth.currentUser.uid,
            status: "Aguardando resposta",
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            alert("Reclamação enviada com sucesso!");
            window.location.href = "complaint-list.html";
        })
        .catch(err => {
            alert("Erro ao enviar: " + err.message);
        });
}
