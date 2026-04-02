const modalPersonagem = document.getElementById("modal-personagem")

export async function abrirModalPersonagem(idPersonagem) {
    const dados = await consumirApi(`https://rickandmortyapi.com/api/character/${idPersonagem}`)
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