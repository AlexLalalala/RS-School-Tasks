import { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';

interface AppState {
  results: [];
  loading: boolean;
  query: string;
}

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
      </>
    );
  }
}

export default App;
