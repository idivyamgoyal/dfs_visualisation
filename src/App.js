import './App.css';
import MainPage from './components/MainPage.jsx';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';

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
