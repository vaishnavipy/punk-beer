
import './App.css';
import Filters from "./components/filters"
import Header from "./components/header"
import Beers from "./components/beers"


function App() {
  return (
    <div >
      <Header />

      <div className="container">
        <Filters />
        <Beers />
      </div>
    </div>
  );
}

export default App;
