import React from "react";

function Modal({ modalIsOpen, closeModal, children }) {
  if (!modalIsOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-full min-h-screen bg-black bg-opacity-70 flex items-center justify-center">
      <div className="p-10 bg-gray-50 rounded-md w-full max-w-[400px] relative">
        <button
          className="text-white absolute top-3 right-3 hover:scale-110"
          onClick={() => closeModal()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="black"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
