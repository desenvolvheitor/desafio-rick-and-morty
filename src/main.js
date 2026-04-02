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

let informacoesUltimaRequisicao = ""
async function executarBusca() {
    document.querySelector("main img").style.display = "block"
    const dados = await buscarPersonagens(filtros)
    document.querySelector("main img").style.display = "none"
    informacoesUltimaRequisicao = dados.info
    renderizarGaleria(dados.results)
    console.log(`Página atual: ${filtros.page}\n Total de páginas: ${informacoesUltimaRequisicao.pages}`)
}

executarBusca()

botaoPagAnterior.addEventListener("click", () => { 
    if (filtros.page > 1) {
        filtros.page--
        executarBusca()
        document.getElementById("paginas").textContent = `Página ${filtros.page} de ${informacoesUltimaRequisicao.pages}`
    }
})

botaoProximaPag.addEventListener("click", () => { 
    if (filtros.page < informacoesUltimaRequisicao.pages) {
        filtros.page++
        executarBusca()
        document.getElementById("paginas").textContent = `Página ${filtros.page} de ${informacoesUltimaRequisicao.pages}`
    }
})

const botaoLimparFiltros = document.querySelector("form button")
botaoLimparFiltros.addEventListener("click", (event) => {
    event.preventDefault()
    const formulario = document.querySelector("form")
    formulario.reset()
    filtros.page =  1
    filtros.name =  ""
    filtros.status =  ""
    filtros.species =  ""
    filtros.gender =  ""
    executarBusca()
})