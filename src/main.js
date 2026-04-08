import { buscarPersonagens } from "./api/rickAndMorty.js"
import { renderizarGaleria } from "./components/card.js"

const dataHoraHeader = document.getElementById("data-hora-header")

setInterval(() => {
    let hoje = new Date()
    dataHoraHeader.textContent = `${hoje.toLocaleString("pt-br", { dateStyle: "long", timeStyle: "medium" }).replace("às", "•")}` 
}, 1000)

const camposFiltro = document.querySelectorAll(".campo-filtro")
const secaoPaginacao = document.getElementById("paginacao")
const botaoProximaPag = document.getElementById("proxima-pagina")
const botaoPagAnterior = document.getElementById("pagina-anterior")
const formularioFiltros = document.querySelector("form")
const galeriaPersonagens = document.getElementById("galeria-personagens")
const mensagemErro = document.getElementById("mensagem-erro")

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

formularioFiltros.addEventListener("submit", (event) => {
    event.preventDefault()
})

let informacoesUltimaRequisicao = ""
async function executarBusca() {
    galeriaPersonagens.innerHTML = ""
    mensagemErro.innerHTML = ""
    secaoPaginacao.style.display = "none"
    document.getElementById("gif-carregamento").style.display = "block"
    try {
        const [dados, _] = await Promise.all([
            buscarPersonagens(filtros),
            new Promise(resolve => setTimeout(resolve, 500))
        ])

        if (typeof dados === "number") {
            switch (dados) {
                case 404:
                    mensagemErro.innerHTML = `<img src="./src/assets/erro-sem-resultados.webp" alt="Erro" id="imagem-erro">
                    <p id="texto-erro">Não foram encontrados pesonagens nos filtros selecionados.</p>`
                    break
                    
                default:
                    mensagemErro.innerHTML = `<img src="./src/assets/erro-geral.webp" alt="Erro" id="imagem-erro">
                    <p id="texto-erro">Erro na busca.</p>`
                    break    
            }
        } else {
            informacoesUltimaRequisicao = dados.info
            renderizarGaleria(dados.results)
            document.getElementById("paginas").textContent = `Página ${filtros.page} de ${informacoesUltimaRequisicao.pages}`
            if (informacoesUltimaRequisicao.pages <= 1) {
                secaoPaginacao.style.display = "none"
            } else {
                secaoPaginacao.style.display = "flex"

                if (filtros.page <= 1) {
                    botaoPagAnterior.disabled = true
                } else {
                    botaoPagAnterior.disabled = false
                }

                if (filtros.page >= informacoesUltimaRequisicao.pages) {
                    botaoProximaPag.disabled = true
                } else {
                    botaoProximaPag.disabled = false
                }
            }
        }
    } catch {
        mensagemErro.innerHTML = `<p id="texto-erro">Erro de rede! Verifique sua conexão com a internet.</p>`
    } finally {
        document.getElementById("gif-carregamento").style.display = "none"
    }
}

executarBusca()

botaoPagAnterior.addEventListener("click", () => { 
    if (filtros.page > 1) {
        botaoPagAnterior.disabled = false
        filtros.page--
        executarBusca()
    }
})

botaoProximaPag.addEventListener("click", () => { 
    if (filtros.page < informacoesUltimaRequisicao.pages) {
        botaoProximaPag.disabled = false
        filtros.page++
        executarBusca()
    }
})

const botaoLimparFiltros = document.getElementById("botao-limpar-filtros")
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

document.querySelector("#menu-hamburguer").addEventListener("click", () => {
    document.querySelector("aside").classList.toggle("menu-aberto")
})
