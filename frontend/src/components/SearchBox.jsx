import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
  const navigate = useNavigate();
  // Initializing the query state variable with empty string
  const [query, setQuery] = useState('');
  // Defining the submit handler for the search form
  const submitHandler = (e) => {
    e.preventDefault();
    // Navigating to the search page with the query parameter if query is not empty, otherwise just to the search page
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  // Returning the search form with input and submit button
  return (
    <Form className="d-flex me-auto" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search products..."
          aria-label="Search Products"
          aria-describedby="button-search"
        ></FormControl>
        {/* Submit button to submit the form */}
        <Button variant="outline-primary" type="submit" id="button-search">
          <i className="fas fa-search"></i> {/* Icon for the search button */}
        </Button>
      </InputGroup>
    </Form>
  );
}
