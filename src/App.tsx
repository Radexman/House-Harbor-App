import { BrowserRouter as Router } from 'react-router-dom';
import Heading from './components/layout/Heading';

function App() {
  return (
    <div className="min-h-screen bg-neutral">
      <Heading />
    </div>
  );
}

export function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default App;
