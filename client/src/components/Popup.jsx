import React from 'react';
import { usePopupContext } from '../context/popup';

function Popup() {
  const { setShowPopup, PopupContent, popupTitle } = usePopupContext();
  const closePopup = () => setShowPopup(false);
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={closePopup}
      ></div>

      <div className="absolute bg-white border-2 border-accentBorder rounded-md w-full sm:max-w-lg">
        <div className="p-4 flex items-center justify-between w-full border-b-2 border-accentBorder">
          <span className="text-xl">{popupTitle}</span>
          <button
            className="size-10 flex items-center justify-center relative"
            onClick={closePopup}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              viewBox="0 -960 960 960"
              width="40"
            >
              <path d="m251.333-204.667-46.666-46.666L433.334-480 204.667-708.667l46.666-46.666L480-526.666l228.667-228.667 46.666 46.666L526.666-480l228.667 228.667-46.666 46.666L480-433.334 251.333-204.667Z" />
            </svg>
          </button>
        </div>
        <div className="p-4">{PopupContent}</div>
      </div>
    </div>
  );
}

export default Popup;
