function getFavoritos() {
    try {
        const favs = localStorage.getItem("favoritos");
        if (favs && !favs.startsWith("[")) {
            return [favs];
        }
        return favs ? JSON.parse(favs) : [];
    } catch (e) {
        return [];
    }
}

function favoritar(local) {
    let favs = getFavoritos();
    const index = favs.indexOf(local);
    if (index > -1) {
        favs.splice(index, 1);
    } else {
        favs.push(local);
    }
    localStorage.setItem("favoritos", JSON.stringify(favs));
    atualizarBotoesFavoritos();
}

function atualizarBotoesFavoritos() {
    const favs = getFavoritos();
    const botoes = document.querySelectorAll(".btn-fav");
    botoes.forEach(btn => {
        const local = btn.getAttribute("data-local");
        const svg = btn.querySelector("svg");
        const span = btn.querySelector("span");
        if (favs.includes(local)) {
            btn.classList.add("favoritado");
            if (svg) {
                svg.setAttribute("fill", "var(--color-primary)");
                svg.setAttribute("stroke", "var(--color-primary)");
            }
            if (span) span.textContent = "Favoritado";
        } else {
            btn.classList.remove("favoritado");
            if (svg) {
                svg.setAttribute("fill", "none");
                svg.setAttribute("stroke", "currentColor");
            }
            if (span) span.textContent = "Favoritar";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarBotoesFavoritos();
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("sw.js")
        .then(() => console.log("SW registrado com sucesso"))
        .catch(err => console.log("Erro: ", err))
}

let deferredPrompt;
const btnInstalar = document.getElementById('btnInstalar');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (btnInstalar) {
        btnInstalar.style.display = 'inline-flex';
    }
});

if (btnInstalar) {
    btnInstalar.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`Escolha do usuário: ${outcome}`);
            deferredPrompt = null;
            btnInstalar.style.display = 'none';
        }
    });
}