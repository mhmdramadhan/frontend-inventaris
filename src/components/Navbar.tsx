import React from 'react';

interface Props {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="font-bold text-lg">Product Dashboard</div>
      {isLoggedIn && (
        <button
          onClick={onLogout}
          className="bg-white text-blue-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
