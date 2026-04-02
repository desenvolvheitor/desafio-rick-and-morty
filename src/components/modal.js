import { buscarPersonagemPorId } from "../api/rickAndMorty.js"

const modalPersonagem = document.getElementById("modal-personagem")

export async function abrirModalPersonagem(id) {
    const dados = await buscarPersonagemPorId(id)
    modalPersonagem.innerHTML = `<img src="${dados.image}">`
    modalPersonagem.innerHTML += `<div id="informacoes-modal-personagem">
        <h2>${dados.name}</h2>
        <p>Status: ${dados.status}</p>
        <p>Espécie: ${dados.species}</p>
        <p>Gênero: ${dados.gender}</p>
        <p>Origem: ${dados.origin.name}</p>
        <p>Localização: ${dados.location.name}</p>
        <p>Episódios: ${dados.episode.length}</p>
        </div>
        <div id="botao-fechar-modal" aria-text="Fechar">&#x2715;</div>`
    modalPersonagem.showModal()
    const botaoFecharModal = document.getElementById("botao-fechar-modal")
    botaoFecharModal.onclick =  () => { modalPersonagem.close() }
}