import { useLocation } from 'react-router-dom';
import SuperheroCard from '../components/SuperheroCard';
import styles from "../styles/views/CharacterPage.module.css";
import { useCallback, useEffect, useState } from 'react';
import { addTeamSuperhero, removeTeamSuperhero, isSuperheroInTeam } from '../states/team';
import { useDispatch, useSelector } from 'react-redux';
import { UserSuperheroService } from '../services/userSuperheroService';
import { SuperheroService } from '../services/superheroService';
import { useAuth } from '../states/auth';
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../components/CustomAlert';

function CharacterPage() {
  const [showAlert, setShowAlert] = useState(false);

  const location = useLocation();
  const { superhero } = location.state || {};

  const { user } = useAuth();
  const userId = user.userId;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isUserSuperhero, setIsUserSuperhero] = useState(false);

  const isInTeam = useSelector((state) => isSuperheroInTeam(state, superhero?.superId));

  useEffect(() => {
    if (superhero) {
      const checkUserSuperhero = async () => {
        const result = await UserSuperheroService.isUserSuperhero(userId, superhero.superId);
        setIsUserSuperhero(result);
      };
      checkUserSuperhero();
    }
  }, [superhero, userId]);


  const handleAddSuperheroClick = useCallback(async () => {
    if (superhero) {
      try {
        if (isUserSuperhero) {
          const result = await UserSuperheroService.removeSuperheroFromUser(userId, superhero.superId);
          setIsUserSuperhero(false);
        } else {
          const result = await UserSuperheroService.addSuperheroToUser(userId, superhero.superId);
          setIsUserSuperhero(true);
        }
      } catch (error) {
        console.log("An error occurred:", error);
      }
    } else {
      console.log("No superhero data available");
    }
  }, [superhero, isUserSuperhero, userId]);


  const handleTeamButtonClick = useCallback(() => {
    if (superhero) {
      if (isInTeam) {
        dispatch(removeTeamSuperhero({ superId: superhero.superId }));
      } else {
        dispatch(addTeamSuperhero(superhero));
      }
    } else {
      console.log("No superhero data available");
    }
  }, [superhero, isInTeam, dispatch]);


  const handleDeleteFromDatabase = () => {
    SuperheroService.deleteCharacterFromDatabase(superhero.superId).then(() => {
      navigate('/Home');
    }).catch(error => {
      console.error("Error deleting character:", error);
    });
  };

  return (
    <div className={styles["character-page-container"]}>
      
      <div className={styles["content-container"]}>
        <h1 className={styles.title}>Character</h1>

        
          {superhero && <SuperheroCard key={superhero.superId} superhero={superhero} fullLength={false}/>}
          
          <div className={styles["button-container"]}>
            <button 
              className={`${styles["green-button"]} ${isUserSuperhero ? styles["red-button"]: ''}`}
              onClick={handleAddSuperheroClick}>
              {isUserSuperhero ? "Remove Superhero" : "Add Superhero"}
            </button>

            <button
              className={`${styles["blue-button"]} ${isInTeam ? styles["purple-button"] : ''}`}
              onClick={handleTeamButtonClick}
            >
              {isInTeam ? 'Remove from Team' : 'Add to Team'}
            </button>
          </div>
          {superhero?.canDelete && (
            <button 
              className={styles["remove-db-button"]}
              onClick={() => setShowAlert(true)}>Delete Character From Database
            </button>
            )
          }
          {showAlert && (
            <CustomAlert
              message="Delete Character From Database?"
              closeButtonColor='red'
              onClose={() => setShowAlert(false)}
              action={handleDeleteFromDatabase}
              buttonText='Permanently Delete'
            />
          )}
      </div>
    </div>
  );
}

export default CharacterPage;
