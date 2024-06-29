import { useSelector } from 'react-redux';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { useEffect } from 'react';
import Account from './Pages/Account/Account';

function App() {
  const color = useSelector((state) => state.user.color);

  useEffect(() => {
    document.body.className = color ? 'body-darkMode' : 'body-lightMode';
  }, [color]);

  return (
    <div>
      <Account /> 
    </div>
  );
}

export default App;
