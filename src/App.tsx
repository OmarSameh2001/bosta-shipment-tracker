import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import SearchBar from './components/Search/Search';
import Result from './components/Result/Result';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header>
        <SearchBar onSearch={() => {}} />
        <Result data={null} loading={false} error={null} />
      </header>
    </div>
  );
}

export default App;
