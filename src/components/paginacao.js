export function atualizarPaginacao(paginaAtual, totalPaginas) {
    let opcoesPaginas = [1]
    
    let inicio = paginaAtual - 2
    if (inicio > 2) {
        opcoesPaginas.push("...")
    }

    let fim = paginaAtual + 2
    for (let i = inicio; i <= fim; i++) {
        if (i > 0 && opcoesPaginas.indexOf(i) == -1 && i < totalPaginas) {
            opcoesPaginas.push(i)
        }
    }

    if (fim < totalPaginas - 1) {
        opcoesPaginas.push("...")
    }
    
    opcoesPaginas.push(totalPaginas)
    return opcoesPaginas
}

// inicio = 5
// fim = 9
// total = 15

// < 1  ... 5 6 [7] 8 9 ... 42 >
// < 1  ... 5 6 [7] 8 9 ... 42 >