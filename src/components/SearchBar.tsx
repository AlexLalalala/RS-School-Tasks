import { Component } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

interface SearchBarState {
  query: string;
}
class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state = { query: '' };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onSearch(this.state.query.trim());
  };

  render() {
    return (
      <form className="w-75 mx-auto" onSubmit={this.onSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for..."
            aria-label="Search Query"
            aria-describedby="button-addon2"
            onChange={this.onChange}
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
}

export default SearchBar;
