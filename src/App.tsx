import Header from './components/Header.tsx';
import { Week } from './components/Week';
import { Provider } from 'react-redux';
import store from './store/weekStore.ts';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <main className="bg-gradient-to-b from-gray-50 to-gray-200 opacity-90">
        <Week />
      </main>
    </Provider>
  );
}

export default App;
