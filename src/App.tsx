import Header from './components/Header.tsx';
import { Week } from './components/Week';
import WeekContextProvider from './context/WeekContext.tsx';

function App() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-gray-50 to-gray-200 opacity-90">
        <WeekContextProvider>
          <Week />
        </WeekContextProvider>
      </main>
    </>
  );
}

export default App;
