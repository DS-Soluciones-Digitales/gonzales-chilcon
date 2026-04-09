import { CurrencyConverter } from './components/CurrencyConverter';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Conversor de Monedas</h1>
      </header>
      <main>
        <CurrencyConverter />
      </main>
    </div>
  );
}

export default App;
