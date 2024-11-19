import React, { useState, useEffect } from "react";
import MaskedInput from 'react-text-mask';
import { useNavigate } from 'react-router-dom';
import { SuperheroService } from "../services/superheroService";
import styles from "../styles/views/Add.module.css";
import { PowerService } from "../services/powerService";
import { useAuth } from '../states/auth';
import CustomAlert from "../components/CustomAlert";

function AddCharacterForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [btnColor, setBtnColor] = useState('');
  const [type, setType] = useState('');

  const [superhero, setSuperhero] = useState({
    name: "",
    realName: "",
    universe: "",
    yearCreated: "",
    canDelete: true,
    powerIds: [],
    image: null,
  });

  const [availablePowers, setAvailablePowers] = useState([]);
  const [formIsValid, setFormIsValid] = useState(false);
  const [yearError, setYearError] = useState(false);

  useEffect(() => {
    const fetchPowers = async () => {
      const powers = await PowerService.getAllPowers();
      setAvailablePowers(powers);
    };
    fetchPowers();
  }, []);

  useEffect(() => {
    validateForm();
  }, [superhero.name, 
      superhero.realName, 
      superhero.yearCreated, 
      superhero.universe, 
      superhero.powerIds, 
      superhero.image]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSuperhero((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setSuperhero((prev) => ({ ...prev, image: file }));
    }
  };

  const handlePowerChange = (powerId) => {
    let powerIds;
    
    if (superhero.powerIds.includes(powerId)) {
      powerIds = superhero.powerIds.filter((id) => id !== powerId);
    } else {
      powerIds = [...superhero.powerIds, powerId];
    }

    setSuperhero((prev) => ({ ...prev, powerIds }));
  };

  const validateForm = () => {
    const nameValid = /^[A-Za-z\s]+$/.test(superhero.name);
    const realNameValid = /^[A-Za-z\s]+$/.test(superhero.realName);
    const universeValid = superhero.universe !== "";
    const yearValid = /^\d{4}$/.test(superhero.yearCreated) && +superhero.yearCreated >= 1938 && +superhero.yearCreated <= 2025;
    const powersSelected = superhero.powerIds.length > 0;
    const imageValid = superhero.image !== null;

    setYearError(!yearValid && superhero.yearCreated.length !== 0);
    setFormIsValid(nameValid && realNameValid && universeValid && yearValid && powersSelected && imageValid);
  };

  const navigateAfterClose = () => {
    if (type == 'success') {
      navigate('/Home');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formIsValid) {
      try {
        await SuperheroService.addNewSuperhero(user.userId, superhero);
        setType('success');
        setMessage("Successfully Created Superhero!");
        setBtnColor('green');
        setShowAlert(true);
      } catch (error) {
        setType('error');
        setMessage("Failed to Create Superhero! See Console");
        setBtnColor('red');
        setShowAlert(true);
        console.error("Failed to create superhero:", error);
      }
    }
  };

  return (
    <div className={styles["outside-container"]}>
      <div className={styles["form-container"]}>
        <h2 className={styles["add-title"]}>Add Character</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className={styles["field-wrapper"]}>
            <label htmlFor="name" className={styles["add-field-label"]}>Character Name:</label>
            <input
              type="text"
              name="name"
              value={superhero.name}
              maxLength="100"
              className={styles["add-field-input"]}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles["field-wrapper"]}>
            <label htmlFor="realName" className={styles["add-field-label"]}>Real Name:</label>
            <input
              type="text"
              name="realName"
              value={superhero.realName}
              maxLength="100"
              className={styles["add-field-input"]}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles["field-wrapper"]}>
            <label htmlFor="universe" className={styles["add-field-label"]}>Universe:</label>
            <select
              name="universe"
              value={superhero.universe}
              className={styles["add-field-input"]}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Universe</option>
              <option value="DC">DC</option>
              <option value="Marvel">Marvel</option>
            </select>
          </div>

          <div className={styles["field-wrapper"]}>
            <label htmlFor="yearCreated" className={styles["add-field-label"]}>Year Created:</label>
            <MaskedInput
              mask={[/\d/, /\d/, /\d/, /\d/]}
              value={superhero.yearCreated}
              onChange={handleInputChange}
              className={`${styles["add-field-input"]} ${yearError ? styles["error-border"] : ""}`}
              name="yearCreated"
            />
            {yearError && (
              <p className={styles["error-message"]}>
                Year must be between 1938 and 2025.
              </p>
            )}
          </div>

          <div className={styles["field-wrapper"]}>
            <label htmlFor="powers" className={styles["add-field-label"]}>Select Powers:</label>
            {availablePowers.map((power) => (
              <div key={power.powerId} className={styles["power-container"]}>
                <input
                  type="checkbox"
                  value={power.powerId}
                  checked={superhero.powerIds.includes(power.powerId)}
                  onChange={() => handlePowerChange(power.powerId)}
                />
                {power.name}
              </div>
            ))}
          </div>

          <div className={styles["field-wrapper"]}>
            <label htmlFor="image" className={styles["add-field-label"]}>Upload Image (jpg or png):</label>
            <input 
              type="file" 
              accept=".jpg,.jpeg,.png" 
              className={styles["file-input"]}
              onChange={handleFileChange} 
              required 
            />
          </div>

          <button type="submit" disabled={!formIsValid} className={styles['add-submit-button']}>
            Submit
          </button>
          
          {showAlert && (
            <CustomAlert
              message={message}
              closeButtonColor={btnColor}
              onClose={() => setShowAlert(false)}
              action={navigateAfterClose}
            />
          )}

        </form>
      </div>
    </div>
  );
}

export default AddCharacterForm;
