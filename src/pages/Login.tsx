import React from 'react';
import LoginForm from '../components/LoginForm';

interface Props {
  onLoginSuccess: () => void;
}

const Login: React.FC<Props> = ({ onLoginSuccess }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </div>
  );
};

export default Login;
