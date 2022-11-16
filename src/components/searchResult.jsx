import React from 'react';
import '../css/searchResult.css';


function Result(props) {
    const { place, onClick } = props;
    return (<>
        <div className='place' onClick={() => onClick(place)}>
            <strong className='place-name'>{place.name}</strong>
            {/* <img src={place.icon} alt='place icon' className='place-icon'></img> */}
            <div className='place-address-container'><p className='place-address'>{place.address}</p></div>
        </div>
    </>);
}

export default function SearchResults(props) {
    const { searchResults, onClickPlace, toBottom } = props; 
    const handleScroll = e => {
        const scrollToBottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (scrollToBottom) {
            toBottom();
        }
    }
    
    return (
        <>
            <div className='search-result-panel' onScroll={handleScroll}>
                {searchResults.map((place, i) => <Result key={i} place={place} onClick={onClickPlace}></Result>)}
            </div>
        </>
    );
}
