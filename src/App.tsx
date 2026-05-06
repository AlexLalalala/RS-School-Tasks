import { Component } from 'react';
import './App.css';

interface AppState{
  results: [],
  loading: boolean,
  query: string
}



class App extends Component<{}, AppState> {
  constructor(props: {}){
    super(props)
  }

  render() {
    return (<>
      <h1>hi!</h1>
    </>
  )
  }
}

export default App;
