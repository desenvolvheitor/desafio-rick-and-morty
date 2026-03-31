import { consumirApi } from "../api/rickAndMorty.js"
import { abrirModalPersonagem } from "./modal.js"

const galeriaPersonagens = document.getElementById("galeria-personagens")
const campoBusca = document.getElementById("campo-busca")
const campoStatus = document.getElementById("status")
const campoEspecie = document.getElementById("especies")
const campoGenero = document.getElementById("generos")

export async function criarCardPersonagem(linkRequisicao = `https://rickandmortyapi.com/api/character/?`) {
        galeriaPersonagens.innerHTML = "Carregando..."
        
        if (campoBusca.value.length > 0) {
            linkRequisicao += `&name=${campoBusca.value}`
        }

        if (campoEspecie.value !== "") {
            linkRequisicao += `&species=${campoEspecie.value}`
        }

        if (campoStatus.value !== "") {
            linkRequisicao += `&status=${campoStatus.value}`
        }

        if (campoGenero.value !== "") {
            linkRequisicao += `&gender=${campoGenero.value}`
        }

        const dados = await consumirApi(linkRequisicao)
        galeriaPersonagens.innerHTML = ""
        dados.results.forEach((dado, indice) => {


            let card = document.createElement("li")
            card.setAttribute("class", "card-personagem")
            card.onclick = () => abrirModalPersonagem(dado.id)
            card.style = `animation-delay: ${indice * 0.015}s`

            let statusColor
            let statusEmoji
            switch (dado.status.toString().toLowerCase()) {
                case "alive":
                    statusColor = "var(--alive-color)"
                    statusEmoji = "&#x1FAC0;"
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

            card.style.backgroundColor = statusColor
            
            card.innerHTML = `<img src="${dado.image}" alt="" class="foto-personagem">
            <div class="informacoes-card-personagem">
                <h3>${dado.name}</h3>
                <p>${statusEmoji} ${dado.status} - ${dado.species}</p>
            </div>`
                
            galeriaPersonagens.appendChild(card)
        })

        document.getElementById("paginas").textContent = `${dados.info.count} resultados encontrados`
}

campoBusca.addEventListener("change", () => { criarCardPersonagem() })
campoStatus.addEventListener("change", () => { criarCardPersonagem() })
campoEspecie.addEventListener("change", () => { criarCardPersonagem() })
campoGenero.addEventListener("change", () => { criarCardPersonagem() })