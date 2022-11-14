import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';



function SearchAddress(props) {

const [address,setAdress] = useState("");

const handleSelect = async value => {
  const results = await geocodeByAddress(value);
  const loc = await getLatLng(results[0]);
  setAdress(value);
  props.onSelect(loc, value);
}

  return (

          <PlacesAutocomplete
            value={address}
            onChange={setAdress}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div className='autocomplete'>
                <input
                  {...getInputProps({
                    placeholder: 'Search Friend\'s Location',
                    className: 'location-search-input'
                  })}
                />
                {suggestions.length > 0 && 
                  <Container className='autocomplete-dropdown-container'>
                  <div className="autocomplete-dropdown">
                    {loading && <div>Loading...</div>}
                    {suggestions.length > 0 && suggestions.map((suggestion, i) => {
                      return (
                        <div key={i} {...getSuggestionItemProps(suggestion)} className='suggestion-item'>
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </Container>}
              </div>
            )}
          </PlacesAutocomplete>
  );
}

export default SearchAddress;