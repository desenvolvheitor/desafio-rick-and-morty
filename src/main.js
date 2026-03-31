import { criarCardPersonagem } from "./components/card.js"

// Atualização automática de data e hora
const dataHoraHeader = document.getElementById("data-hora-header")

setInterval(() => {
    let hoje = new Date()
    dataHoraHeader.textContent = `${hoje.toLocaleString("pt-br", { dateStyle: "long", timeStyle: "medium" }).replace("às", "•")}` 
}, 1000)

criarCardPersonagem()

// Funcionamento do botão de Limpar filtros na busca do personagem
let botaoLimparFiltros = document.getElementById("botao-limpar-filtros")
botaoLimparFiltros.addEventListener("click", () => {
    document.getElementById("campo-busca").value = ""
    document.getElementById("status").value = ""
    document.getElementById("especies").value = ""
    document.getElementById("generos").value = ""
    criarCardPersonagem()
})