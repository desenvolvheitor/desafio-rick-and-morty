import { abrirModalPersonagem } from "./modal.js"

const galeriaPersonagens = document.getElementById("galeria-personagens")

export function renderizarGaleria(listaPersonagens) {
        galeriaPersonagens.innerHTML = ""
        listaPersonagens.forEach((dado, indice) => {
            let card = document.createElement("li")
            card.setAttribute("class", "card-personagem")
            card.onclick = () => abrirModalPersonagem(dado)
            card.style = `animation-delay: ${indice * 0.015}s`

            let statusColor
            let statusEmoji
            switch (dado.status.toString().toLowerCase()) {
                case "alive":
                    statusColor = "var(--alive-color)"
                    statusEmoji = "&#x2764;&#xFE0F;"
                    break
                case "dead":
                    statusColor = "var(--dead-color)"
                    statusEmoji = "&#x1F480;"
                    break
                case "unknown":
                    statusColor = "var(--unknown-color)"
                    statusEmoji = "&#x2753;"
                    break
            }
            
            card.innerHTML = `<img await src="${dado.image}" alt="" class="foto-personagem">
            <div class="informacoes-card-personagem">
                <h3>${dado.name}</h3>
                <p>${dado.species}</p>
                <p style="color: ${statusColor};">${statusEmoji} ${dado.status}</p>
            </div>`
                
            galeriaPersonagens.appendChild(card)
        })
}