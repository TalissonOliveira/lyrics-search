const form = document.querySelector('#form')
const searchInput = document.querySelector('#search')
const songsContainer = document.querySelector('#songs-container')
const prevAndNextContainer = document.querySelector('#prev-and-next-container')

const apiURL = `https://api.lyrics.ovh`
// Inserir informações na tela
const insertSongsIntoPage = songsInfo => {
    songsContainer.innerHTML = songsInfo.data.map(song => `
    <li class="song">
        <spang class="song-artist"><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}">Ver letra</button>
    </li>
    `).join('') // join() -> retorna uma nova string com todos os itens do array concatenados e separados por vírgulas
}

// Fazer requisição
const fetchSongs = async term => {
    const response = await fetch(`${apiURL}/suggest/${term}`)
    const data = await response.json()

    // Inserir informações na tela
    insertSongsIntoPage(data)

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