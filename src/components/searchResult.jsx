import React from 'react';
import '../css/searchResult.css';

function Result(props) {
    const { place } = props;
    return (<>
        <div className='place'>
            <strong className='place-name'>{place.name}</strong>
            {/* <img src={place.icon} alt='place icon' className='place-icon'></img> */}
            <p className='place-address'>{place.address}</p>
        </div>
    </>);
}

export default function SearchResults(props) {
    const { searchResults } = props; 
    return (
        <>
            <div className='search-result-panel'>
                {searchResults.map((place, i) => <Result key={i} place={place}></Result>)}
            </div>
        </>
    );
}
