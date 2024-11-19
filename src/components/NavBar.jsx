import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SuperheroService } from "../services/superheroService";
import { useAuth } from '../states/auth';
import CustomAlert from './CustomAlert';
import styles from "../styles/components/NavBar.module.css";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [superheroes, setSuperheroes] = useState([]);

  const searchInput = useRef(null);
  const dropdownRef = useRef(null);

  const fetchSuperheroes = async () => {
    try {
      const superheroesData = await SuperheroService.getAllSuperheroes();
      setSuperheroes(superheroesData);
    } catch (error) {
      console.error('Error fetching superheroes:', error);
    }
  };
  
  const filterResults = (query) => {
    const trimmedQuery = query.trim();
  
    if (trimmedQuery === '') {
      setFilteredResults([]);
      setShowDropdown(false);
      return;
    }
  
    const filtered = superheroes.filter(superhero => {
      const lowerCaseName = superhero.name.toLowerCase();
      return lowerCaseName.includes(trimmedQuery.toLowerCase());
    });
  
    const exactMatches = filtered.filter(superhero =>
      superhero.name.toLowerCase() === trimmedQuery.toLowerCase()
    );

    const otherMatches = filtered.filter(superhero =>
      superhero.name.toLowerCase() !== trimmedQuery.toLowerCase()
    );
  
    setFilteredResults([...exactMatches, ...otherMatches]);
    
    setShowDropdown(filtered.length > 0);
  };
  
  const hideDropdown = (e) => {
      setShowDropdown(false);
      setSearchQuery('');
      setFilteredResults([]);
  };

  const handleSignOut = () => {
    logout();
    navigate('/')
  };

  const handleItemClick = (itemName) => {

    const selectedHero = superheroes.find(superhero => superhero.name === itemName);

    if (selectedHero) {
      navigate('/Character', { state: { superhero: selectedHero } });
    }

    setShowDropdown(false);
    setSearchQuery('');
    searchInput.current.blur();
  };


  const closeSearchBar = () => {
    searchInput.current.blur();
  };

  const handleKeydown = (event) => {
    if (event.key === 'Escape') {
      closeSearchBar();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <div>
      {showDropdown && <div className={styles["overlay"]} onClick={() => setShowDropdown(false)}></div>}
  
      <nav className={styles["navbar"]}>
        <div className={styles["left-section"]}>
          <h1 className={styles["navbar-title"]}>Superheroes</h1>
        </div>
        <div className={styles["right-section"]}>
          <div className={styles["search-bar"]}>
          <input
              ref={searchInput}
              type="text"
              className={styles["search-bar-input"]}
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => {
                const newQuery = e.target.value;
                setSearchQuery(newQuery);
                filterResults(newQuery);
              }}
              onFocus={async () => {
                await fetchSuperheroes();
                if (searchQuery) setShowDropdown(true);
              }}
              onBlur={hideDropdown}
            />
            {showDropdown && (
              <ul className={styles["dropdown"]} ref={dropdownRef}>
                {filteredResults.map((result, index) => (
                  <li
                    key={index}
                    className={styles["result"]}
                    onMouseDown={() => handleItemClick(result.name)}
                  >
                    <span className={styles["result-name"]}>{result.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.tabs}>
            <ul className={styles["tabs-ul-list"]}>
              <li className={styles.tab}>
                <Link to="/Home" className={styles["tab-link"]}>
                  <p className={styles["tab-name"]}>Home</p>
                </Link>
              </li>
              <li className={styles.tab}>
                <Link to="/Powers" className={styles["tab-link"]}>
                  <p className={styles["tab-name"]}>Powers</p>
                </Link>
              </li>
              <li className={styles.tab}>
                <Link to="/Team" className={styles["tab-link"]}>
                  <p className={styles["tab-name"]}>Team</p>
                </Link>
              </li>
              <li className={styles.tab}>
                <Link to="/Add" className={styles["tab-link"]}>
                  <p className={styles["tab-name"]}>Add</p>
                </Link>
              </li>
              <li className={styles.tab} onClick={() => setShowAlert(true)}>
                <Link className={styles["tab-link"]}>
                  <p className={styles["tab-name"]}>Sign Out</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showAlert && (
        <CustomAlert
          message="Log Out?"
          subtext='Are you sure you want to sign out?'
          closeButtonColor='red'
          onClose={() => setShowAlert(false)}
          action={handleSignOut}
          cancelButton={true}
          buttonText='Sign Out'
        />
      )}
    </div>
  );
};

export default Navbar;
