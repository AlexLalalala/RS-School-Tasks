import { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import GameCard from './components/GameCard';

interface AppState {
  results: [];
  loading: boolean;
  query: string;
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
  constructor(props: object) {
    super(props);
  }

  render() {
    return (
      <>
        <h1>hi!</h1>
        <SearchBar
          onSearch={(query: string) => console.log(`Searching for: ${query}`)}
        />
        <GameCard {...gameCardTestProps} />
      </>
    );
  }
}

export default App;
