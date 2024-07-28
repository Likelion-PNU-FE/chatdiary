import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SomePage from './pages/SomePage'; // Ensure the path is correct based on your project structure
import './App.css';

function App() {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<SomePage />} />
            </Routes>
        </Router>
    );
}

export default App;
