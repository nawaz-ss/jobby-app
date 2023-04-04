import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="d-flex justify-content-center">
      <div className="p-2">
        <Link to="/">Home</Link>
      </div>
      <div className="p-2">
        <Link to="/jobs">Jobs</Link>
      </div>
    </nav>
  )
}
export default Header;