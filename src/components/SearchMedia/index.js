import React from "react";
import styled from "styled-components";
import MediaCard from '../MediaContentCard/index';

const SearchMediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  overflow: scroll;

  & form {
    display: flex;
    flex-direction: column;
  }

  & input {
    width: 200px;
    height: 20px;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 3px;
    font-size: 16px;
  }

  & button {
    width: 210px;
    padding: 5px;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: 50px;
  }
`;

const SearchMedia = () => {
  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState("");
  return (
    <SearchMediaContainer>
      <form
        onSubmit={e => {
          e.preventDefault();
          return setSearch(value);
        }}
      >
        <input value={value} onChange={e => setValue(e.target.value)} />
        <button>Search</button>
      </form>
      {search && <MediaCard search={search} />}
    </SearchMediaContainer>
  );
};

export default SearchMedia;
