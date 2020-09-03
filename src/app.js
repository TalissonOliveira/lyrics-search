const form = document.querySelector('#form')
const searchInput = document.querySelector('#search')
const songsContainer = document.querySelector('#songs-container')
const prevAndNextContainer = document.querySelector('#prev-and-next-container')

const apiURL = `https://api.lyrics.ovh`

// Fazer requisição
const fetchSongs = async term => {
    const response = await fetch(`${apiURL}/suggest/${term}`)
    const data = await response.json()

}

// Função para quando o formulário for enviado
form.addEventListener('submit', event => {
    event.preventDefault() // Impedir que envie o formulário (recarregue a página)

    // Obter valor digitado no input de busca
    const searchTerm = searchInput.value.trim() // trim() -> Retorna a string sem os espaços em brancos do começo e do final
    // Impedir que envie formulário vazio
    if (!searchTerm) {
        songsContainer.innerHTML = `<li class="warning-message">Por favor, digite um termo válido!</li>`
        return // Return para impedir que o código continue rodando (para o código aqui)
    }

    fetchSongs(searchTerm)
})