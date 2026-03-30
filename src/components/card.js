const galeriaPersonagens = document.getElementById("galeria-personagens")
const campoBusca = document.getElementById("campo-busca")
const campoStatus = document.getElementById("status")

export async function criarCardPersonagem() {
    try {
        galeriaPersonagens.innerHTML = ""
        
        let linkRequisicao = `https://rickandmortyapi.com/api/character/?`
        if (campoBusca.value.length > 0) {
            linkRequisicao += `&name=${campoBusca.value}`
        }

        if (campoStatus.value !== "") {
            linkRequisicao += `&status=${campoStatus.value}`
        }

        let resposta = await fetch(linkRequisicao)

        if (!resposta.ok) {
            throw new Error(`Erro na rede: ${resposta.status}`)
        }

        const dados = await resposta.json()
        dados.results.forEach(dado => {
            let card = document.createElement("li")
            card.setAttribute("class", "card-personagem")
            card.innerHTML = `<img src="${dado.image}" alt="" class="foto-personagem">
                <div class="informacoes-personagem">
                    <h2>${dado.name}</h2>
                    <p>${dado.status} - ${dado.species}</p>
                </div>`
            galeriaPersonagens.appendChild(card)
        })

        document.getElementById("paginas").textContent = `${dados.info.count} resultados encontrados\nPágina ${dados.info.next - 1 || dados.info.prev + 1} de ${dados.info.pages}`
        
        linkRequisicao = ""
    } catch (erro) {
        console.error(`Erro ao buscar dados: ${erro}`)
    }
}