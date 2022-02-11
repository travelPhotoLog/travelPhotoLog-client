import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import styled from "styled-components";

const SearchBox = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (address, placeId, suggestion) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setAddress(address);
    setCoordinates(latLng);
    navigate(
      `point?latitude=${latLng.lat}&longitude=${latLng.lng}&longitude=${suggestion.formattedSuggestion.mainText}`
    );
  };

  const searchBar = ({
    getInputProps,
    getSuggestionItemProps,
    suggestions,
    loading,
  }) => (
    <div>
      <SearchContainer
        {...getInputProps({ placeholder: " 🔎 search your location" })}
      />
      <div>
        {loading ? <div>loading...</div> : null}
        {suggestions.map(suggestion => {
          const style = suggestion.active
            ? {
                backgroundColor: "#e6e6e6",
                cursor: "pointer",
                fontFamily: "sans-serif",
                fontSize: "15px",
                margin: "10px 10px",
              }
            : {
                backgroundColor: "#ffffff",
                cursor: "pointer",
                fontFamily: "sans-serif",
                fontSize: "15px",
                margin: "10px 10px",
              };

          return (
            <div
              key={suggestion.placeId}
              {...getSuggestionItemProps(suggestion, { style })}
            >
              📍 {suggestion.description}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div>
      <PlacesAutocomplete
        value={address || ""}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {searchBar}
      </PlacesAutocomplete>
    </div>
  );
};

export default SearchBox;

const SearchContainer = styled.input`
  width: 90%;
  height: 50px;
  padding-left: 25px;
  margin: 10px 14px 10px;
  border: 1px solid gray;
  border-radius: 20px;
`;
