import './App.css';
import Header from './components/Header.tsx';

function App() {
  return (
    <>
      <Header />
      <main
        style={{
          backgroundColor: 'lightblue',
          margin: '0 auto',
          padding: '2rem',
          textAlign: 'center',
          maxWidth: '1280px',
          borderRadius: '10px',
          display: 'flex',
          placeItems: 'center',
          minWidth: '320px',
          minHeight: '60vh',
          justifyContent: 'space-around',
        }}
      >
        <h1>Hello World</h1>
      </main>
    </>
  );
}

export default App;
