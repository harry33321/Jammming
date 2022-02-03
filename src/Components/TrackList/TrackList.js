import React from 'react';
import Track from '../Track/Track';
import "./TrackList.css"


export default function TrackList({ tracks, onAdd, onRemove, isRemoval }) {
    return (
        <div className="TrackList">
            {tracks.map(track => {
                return <Track key={track.id} track={track} onAdd={onAdd} onRemove={onRemove} isRemoval={isRemoval} />
            })}
            You will add a map method that renders a set of Track components
        </div>
    );
}
