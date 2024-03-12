import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Nav from './components/Nav';
import { PopupProvider } from './context/popup';
import { UserProvider } from './context/user';
import Popup from './components/Popup';
import Footer from './components/Footer';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [PopupContent, setPopupContent] = useState(null);
  const [popupTitle, setPopupTitle] = useState('');

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(false);
  const [showNavPane, setShowNavPane] = useState(false);

  return (
    <UserProvider
      value={{
        user,
        setUser,
        userLoading,
        setUserLoading,
        userError,
        setUserError,
      }}
    >
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
        <div
          onClick={({ target }) => {
            setShowNavPane((prev) =>
              target.closest('.nav-pane') === null ? null : prev
            );
          }}
          className="min-h-svh"
        >
          <Nav showNavPane={showNavPane} setShowNavPane={setShowNavPane} />
          <Dashboard />
          <Footer />
          {showPopup && <Popup />}
        </div>
      </PopupProvider>
    </UserProvider>
  );
}

export default App;
