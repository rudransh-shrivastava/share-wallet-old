import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Nav from './components/Nav';
import { PopupProvider } from './context/popup';
import Popup from './components/Popup';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [PopupContent, setPopupContent] = useState(null);
  const [popupTitle, setPopupTitle] = useState('');

  return (
    <PopupProvider
      value={{
        showPopup,
        setShowPopup,
        PopupContent,
        setPopupContent,
        popupTitle,
        setPopupTitle,
      }}
    >
      <Nav />
      <Dashboard />
      {showPopup && <Popup />}
    </PopupProvider>
  );
}

export default App;
