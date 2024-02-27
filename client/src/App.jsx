import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Nav from './components/Nav';
import { PopupProvider } from './context/popup';
import AddExpensePopup from './components/AddExpensePopup';

function App() {
  const [showAddExpensePopup, setShowAddExpensePopup] = useState(true); // TODO: set it false by default
  return (
    <PopupProvider value={{ showAddExpensePopup, setShowAddExpensePopup }}>
      <Nav />
      <Dashboard />
      {showAddExpensePopup && <AddExpensePopup />}
    </PopupProvider>
  );
}

export default App;
