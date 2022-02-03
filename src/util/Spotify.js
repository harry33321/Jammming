let accessToken;
const clientID = "fd304f3bb17a4137a42f3b33bbec60fd";
const redirectURI = "https://harry33321.github.io/Jammming/";

export const Spotify = {

    getAccessToken() {
        if (accessToken) {
            return accessToken
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)
        
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1]
            const expiresIn = Number(expiresInMatch[1])
            
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            window.location = accessURL
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        })
    },
    savePlayList(name, trackURIs) {
        if(!name || !trackURIs.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken()
        const headers = {
            Authorization: `Bearer ${accessToken}`
        }
        return fetch(`https://api.spotify.com/v1/me`, {
            headers: headers
        }).then(res => res.json()
        ).then(jsonRes => {
            const userId = jsonRes.id
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: "POST",
                body: JSON.stringify({
                    name: name
                })
            }).then(res => res.json()
            ).then(jsonRes => {
                const playListId = jsonRes.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`, {
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({
                        uris: trackURIs
                    })
                })
            })
        })
    }

}