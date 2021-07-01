import './App.css';
import MainPage from './components/MainPage';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="mainBody">
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
}

export default App;
