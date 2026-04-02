import { buscarPersonagens } from "./api/rickAndMorty.js"
import { renderizarGaleria } from "./components/card.js"

// Atualização automática de data e hora
const dataHoraHeader = document.getElementById("data-hora-header")

setInterval(() => {
    let hoje = new Date()
    dataHoraHeader.textContent = `${hoje.toLocaleString("pt-br", { dateStyle: "long", timeStyle: "medium" }).replace("às", "•")}` 
}, 1000)

const camposFiltro = document.querySelectorAll(".campo-filtro")
const botaoProximaPag = document.getElementById("proxima-pagina")
const botaoPagAnterior = document.getElementById("pagina-anterior")

const filtros = {
    page: 1,
    name: "",
    status: "",
    species: "",
    gender: "",
}

const aplicarFiltro = (event) => {
    filtros.page = 1
    const chave = event.target.name
    filtros[chave] = event.target.value
    executarBusca()
}

let timer
camposFiltro.forEach((campo) => {
    campo.addEventListener("input", (event) => {
        if (event.target.type == "text") {
            clearTimeout(timer)
            timer = setTimeout(() => {
                aplicarFiltro(event)
            }, 500)
        } else {
            aplicarFiltro(event)
        }

    })
})
async function executarBusca() {
    const dados = await buscarPersonagens(filtros)
    renderizarGaleria(dados.results)
}