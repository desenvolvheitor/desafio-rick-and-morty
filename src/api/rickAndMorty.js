export async function buscarPersonagens(filtros) {
    try {
        const parametros = new URLSearchParams(filtros)
        const url = `https://rickandmortyapi.com/api/character/?${parametros.toString()}`
        const resposta = await fetch(url)

        if (!resposta.ok) {
            return resposta.status
        }

        const dados = await resposta.json()
        return dados
    } catch (erro) {
        console.error(`Erro ao buscar dados: ${erro}`)
        return resposta.status
    }
}