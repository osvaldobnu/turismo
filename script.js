function favoritar(local) {
    localStorage.setItem("favoritos", local)
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("sw.js")
        .then(() => console.log("SW registrado com sucesso"))
        .catch(err => console.log("Erro: ", err))
}

let deferredPrompt;
const btnInstalar = document.getElementById('btnInstalar');

window.addEventListener('beforeinstallprompt', (e) => {
    // Impede que o mini-infobar padrão apareça em dispositivos móveis
    e.preventDefault();
    // Guarda o evento para ser disparado depois
    deferredPrompt = e;
    // Atualiza a UI para mostrar o botão de instalação
    if (btnInstalar) {
        btnInstalar.style.display = 'inline-block';
    }
});

if (btnInstalar) {
    btnInstalar.addEventListener('click', async () => {
        if (deferredPrompt) {
            // Mostra o prompt de instalação
            deferredPrompt.prompt();
            // Espera a resposta do usuário
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`Escolha do usuário: ${outcome}`);
            // Limpa o prompt, pois ele só pode ser usado uma vez
            deferredPrompt = null;
            btnInstalar.style.display = 'none';
        }
    });
}