// playlist.js

document.addEventListener('DOMContentLoaded', async function () {
    const playlistId = '12257991191'; // Substitua PLAYLIST_ID pela ID real da playlist na Deezer
    const url = `https://deezerdevs-deezer.p.rapidapi.com/playlist/${playlistId}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '72760ecb0amshd4ff2d6336f7b13p114463jsn373f4d7cde51',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const playlistData = result.tracks.data;

        // Obtém a referência para a div que conterá as músicas
        const playlistContainer = document.getElementById('playlist-container');

        // Itera sobre as músicas e adiciona elementos HTML para cada uma
        playlistData.forEach(track => {
            const musicContainer = document.createElement('div');
            musicContainer.classList.add('music');

            const image = document.createElement('img');
            image.src = track.album.cover_medium;
            image.alt = `${track.title}`;

            const info = document.createElement('div');
            info.classList.add('info');

            const title = document.createElement('h3');
            title.textContent = track.title;

            const artist = document.createElement('p');
            artist.textContent = `${track.artist.name}`;

            const audio = document.createElement('audio');
            audio.controls = true;

            const source = document.createElement('source');
            source.src = track.preview;
            source.type = 'audio/mp3';

            audio.appendChild(source);
            info.appendChild(title);
            info.appendChild(artist);
            musicContainer.appendChild(image);
            musicContainer.appendChild(info);
            musicContainer.appendChild(audio);

            // Adiciona a div da música à div principal
            playlistContainer.appendChild(musicContainer);
        });
    } catch (error) {
        console.error('Erro na requisição à API da Deezer:', error);
    }
});
