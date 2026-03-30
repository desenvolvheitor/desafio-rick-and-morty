// Atualização automática de data e hora
const dataHoraHeader = document.getElementById("data-hora-header")
const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit"
}

setInterval(() => {
    let hoje = new Date()
    dataHoraHeader.textContent = `${hoje.toLocaleDateString("pt-br", options)} • ${hoje.toLocaleTimeString()}` 
}, 1000)