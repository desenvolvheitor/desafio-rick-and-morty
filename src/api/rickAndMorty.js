export async function buscarPersonagens(filtros) {
    try {
        const parametros = new URLSearchParams(filtros)
        const url = `https://rickandmortyapi.com/api/character/?${parametros.toString()}`
        const resposta = await fetch(url)

        if (!resposta.ok) {
            throw new Error(`Erro na rede: ${resposta.status}`)
        }

        const dados = await resposta.json()
        return dados
    } catch (erro) {
        console.error(`Erro ao buscar dados: ${erro}`)
    }
}

export async function buscarPersonagemPorId(id) {
    try {
        const url = `https://rickandmortyapi.com/api/character/${id}`
        const resposta = await fetch(url)

        if (!resposta.ok) {
            throw new Error(`Erro na rede: ${resposta.status}`)
        }

        const dados = await resposta.json()
        return dados
    } catch (erro) {
        console.error(`Erro ao buscar dados: ${erro}`)
    }
}