import Header from './components/Header.tsx';
import { Week } from './components/Week';

function App() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-gray-50 to-gray-200 opacity-90">
        {/*<main className="mt-2 h-full rounded-2xl mx-10 bg-gradient-to-b from-gray-100 to-gray-300 opacity-90">*/}
        {/*<main className="mt-2 h-full rounded-2xl mx-10 bg-gradient-to-tr from-yellow-200 via-pink-300 to-red-200 opacity-90">*/}
        {/*<main className="mt-2 h-full rounded-2xl mx-10 bg-gradient-to-r from-teal-300 via-cyan-400 to-teal-500 opacity-80">*/}
        <Week />
      </main>
    </>
  );
}

export default App;
