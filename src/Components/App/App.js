import { useState } from 'react';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import './App.css';

function App() {

  const [searchResults, setSearchResults] = useState([
    {
      name: "name",
      artist: "artist",
      album: "album",
      id: "id"
    }
  ])

  const [playlistName, setPlaylistName] = useState("")

  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: "name2",
      artist: "artist2",
      album: "album2",
      id: "id2"
    }
  ])

  const addTrack = track => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      setPlaylistTracks(prevTracks => [...prevTracks, track])
    }
  }

  const removeTrack = track => {
    setPlaylistTracks(playlistTracks.filter(allTrack => allTrack.id !== track.id))
  }

  const updatePlaylistName = name => {
    setPlaylistName(name)
  }

  const savePlaylist = () => {

  }

  const search = term => {
    console.log(term)
  }

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist 
            playlistName={playlistName} 
            playlistTracks={playlistTracks} 
            onRemove={removeTrack} 
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
