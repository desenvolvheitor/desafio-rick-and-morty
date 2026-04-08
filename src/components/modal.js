const modalPersonagem = document.getElementById("modal-personagem")

export async function abrirModalPersonagem(personagem) {
    modalPersonagem.innerHTML = `<img src="${personagem.image}">`
    modalPersonagem.innerHTML += `<div id="informacoes-modal-personagem">
        <h2>${personagem.name}</h2>
        <p>Status: ${personagem.status}</p>
        <p>Espécie: ${personagem.species}</p>
        <p>Gênero: ${personagem.gender}</p>
        <p>Origem: ${personagem.origin.name}</p>
        <p>Localização: ${personagem.location.name}</p>
        <p>Episódios: ${personagem.episode.length}</p>
        </div>
        <div id="botao-fechar-modal" aria-text="Fechar">&#x2715;</div>`
    modalPersonagem.showModal()
    const botaoFecharModal = document.getElementById("botao-fechar-modal")
    botaoFecharModal.onclick =  () => { modalPersonagem.close() }
}

modalPersonagem.addEventListener("click", (event) => {
    const areaModal = modalPersonagem.getBoundingClientRect()

    const clicouFora = (
        event.clientX < areaModal.left ||
        event.clientX > areaModal.right ||
        event.clientY < areaModal.top ||
        event.clientY > areaModal.bottom
    )

    if (clicouFora) {
        modalPersonagem.close()
    }
})