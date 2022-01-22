import React from "react";
import { Form } from 'react-bootstrap';

const SearchBar = ({ setSearch }: { setSearch: React.Dispatch<React.SetStateAction<string>> }) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Search Player</Form.Label>
          <Form.Control type="name" placeholder="Enter player name" onChange={handleChange} />
        </Form.Group>
      </Form>
    </div>
  );
};

export default SearchBar;