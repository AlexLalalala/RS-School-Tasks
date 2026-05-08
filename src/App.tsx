import { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import fetchGames from './api/cheapshark';
import type { Deal } from './types/Deal';
import DealsTable from './components/DealsTable';

interface AppState {
  deals: Deal[];
  loading: boolean;
  errorMessage: string | null;
  lastSearchQuery: string;
}

class App extends Component<object, AppState> {
  state = {
    deals: [],
    loading: true,
    errorMessage: null,
    lastSearchQuery: localStorage.getItem('lastSearchQuery') || '',
  };

  handleSearch = async (query: string) => {
    this.setState({ loading: true, errorMessage: null });
    localStorage.setItem('lastSearchQuery', query);
    try {
      const deals = await fetchGames(query, 1);
      this.setState({ deals });
    } catch (error) {
      this.setState({
        errorMessage: error instanceof Error ? error.message : 'Unknown error!',
      });
    } finally {
      this.setState({ loading: false });
    }
    console.log(this.state.deals);
  };

  componentDidMount = () => {
    this.handleSearch(this.state.lastSearchQuery);
  };

  render = () => {
    return (
      <>
        <h1>Steam Deals Searcher</h1>
        <SearchBar
          onSearch={this.handleSearch}
          initialQuery={this.state.lastSearchQuery}
        />
        {this.state.errorMessage ? (
          <div
            className="alert alert-danger d-flex align-items-center"
            role="alert"
          >
            <span>⚠️ {this.state.errorMessage}</span>
            <button
              className="btn btn-sm btn-outline-danger ms-auto"
              onClick={() => this.handleSearch(this.state.lastSearchQuery)}
            >
              Try again
            </button>
          </div>
        ) : (
          <DealsTable deals={this.state.deals} loading={this.state.loading} />
        )}
      </>
    );
  };
}

export default App;
