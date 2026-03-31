export async function consumirApi(linkRequisicao) {
    try {
        let resposta = await fetch(encodeURI(linkRequisicao))

        if (!resposta.ok) {
            throw new Error(`Erro na rede: ${resposta.status}`)
        }

        const dados = await resposta.json()
        return dados
    } catch (erro) {
        console.error(`Erro ao buscar dados: ${erro}`)
    }
}