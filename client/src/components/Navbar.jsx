import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/navbar.css';

export default function Navbar() {
  return (
    <nav className='nav'>
      <Link to="/" className='navlink'>Home</Link>
      <Link to="/login" className='navlink'>Login</Link>
      <Link to="/register" className='navlink'>Register</Link>
    </nav>
  );
}
