import Header from './components/Header.tsx';
import { Week } from './components/Week';

function App() {
  return (
    <>
      <Header />
      <main className="mt-2 h-full rounded-2xl mx-10 bg-gradient-to-b from-green-200 to-green-300 opacity-75">
        <Week />
      </main>
    </>
  );
}

export default App;
