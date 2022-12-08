import { Link } from 'react-router-dom'
import React, { useContext } from 'react';
import DataContext from './context/DataContext';

const Nav = () => {
  // Instead of pulling it in as a prop above, we need to define width with the useContext hook based on DataContext
  const { search, setSearch  } = useContext(DataContext);
  return (
    <nav className="Nav">
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search">Posts zoeken</label>
          <input
            id="search"
            type="text"
            placeholder="Posts zoeken"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <ul>
          <li><Link to="/">Alle Posts</Link></li>
          <li><Link to="/post">Post</Link></li>
          <li><Link to="/about">Over</Link></li>
        </ul>
    </nav>
  )
}

export default Nav