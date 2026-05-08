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

const gameCardTestProps = {
  title: "Deus Ex: Human Revolution - Director's Cut",
  metacriticLink: '/game/pc/deus-ex-human-revolution---directors-cut',
  salePrice: 2.99,
  normalPrice: 19.99,
  thumb:
    'https://cdn.cloudflare.steamstatic.com/steam/apps/238010/capsule_sm_120.jpg?t=1619788192',
};

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
      this.setState({ errorMessage: 'Error!' });
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
        <h1>hi!</h1>
        <SearchBar
          onSearch={this.handleSearch}
          initialQuery={this.state.lastSearchQuery}
        />
        <DealsTable deals={this.state.deals} loading={this.state.loading} />
      </>
    );
  };
}

export default App;
