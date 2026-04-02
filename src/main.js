import { buscarPersonagens } from "./api/rickAndMorty.js"
import { renderizarGaleria } from "./components/card.js"

// Atualização automática de data e hora
const dataHoraHeader = document.getElementById("data-hora-header")

setInterval(() => {
    let hoje = new Date()
    dataHoraHeader.textContent = `${hoje.toLocaleString("pt-br", { dateStyle: "long", timeStyle: "medium" }).replace("às", "•")}` 
}, 1000)

const filtros = {
    name: "",
    status: "",
    species: "",
    gender: "",
};

const campoBusca = document.getElementById("campo-busca")
const campoStatus = document.getElementById("status")
const campoEspecie = document.getElementById("especies")
const campoGenero = document.getElementById("generos")

campoBusca.addEventListener("change", () => { 
    filtros.name = campoBusca.value
    executarBusca()
 })

campoStatus.addEventListener("change", () => { 
    filtros.status = campoStatus.value
    executarBusca()
 })

campoEspecie.addEventListener("change", () => { 
    filtros.species = campoEspecie.value
    executarBusca()
 })

campoGenero.addEventListener("change", () => { 
    filtros.gender = campoGenero.value
    executarBusca()
 })

async function executarBusca() {
    const dados = await buscarPersonagens(filtros)
    renderizarGaleria(dados.results)
}