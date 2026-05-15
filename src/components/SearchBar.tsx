import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

function SearchBar ({onSearch, initialQuery}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery || '');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form className="w-75 mx-auto" onSubmit={onSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for..."
          aria-label="Search Query"
          aria-describedby="button-addon2"
          onChange={onChange}
          value={query}
        />
        <button
          className="btn btn-outline-primary"
          type="submit"
          id="button-addon2"
        >
          Search
        </button>
      </div>
    </form>
  );
}


export default SearchBar;
