import { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import GameCard from './components/GameCard';
import fetchGames from './api/cheapshark';
import type { Deal } from './types/Deal';
import DealsTable from './components/DeaslTable';

interface AppState {
  deals: Deal[];
  loading: boolean;
  errorMessage: string | null;
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
  };

  handleSearch = async (query: string) => {
    this.setState({ loading: true, errorMessage: null });
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
    this.handleSearch('');
  };

  render = () => {
    return (
      <>
        <h1>hi!</h1>
        <SearchBar onSearch={this.handleSearch} />
        {this.state.loading ? <p>Loading...</p> : <DealsTable deals={this.state.deals} />}
      </>
    );
  };
}

export default App;
