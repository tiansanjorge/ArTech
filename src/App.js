import './styles/styles.scss';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';


function App() {
  return (
    <div className="App">
      <NavBar />
      
      <main className="content">
        <ItemListContainer saludo="Hola! Espero que este saludo cumpla con lo solicitado por el desafío!" />
      </main>
    </div>
  );
}

export default App;
