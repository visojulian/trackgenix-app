import React, { useEffect, useState } from 'react';
import FormModal from './FormModal';
import styles from './form.module.css';
import TextInput from '../../Shared/TextInput/index';
import { useHistory, useParams } from 'react-router-dom';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMessage] = useState();
  const [employeeInput, setEmployeeInput] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });

  useEffect(async () => {
    try {
      if (id) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
          method: 'GET'
        });
        const data = await response.json();
        setIsEditing(true);
        setEmployeeInput({
          name: data.data.name,
          lastName: data.data.lastName,
          phone: data.data.phone,
          email: data.data.email,
          password: data.data.password
        });
      }
    } catch (error) {
      alert(error);
    }
  }, []);

  const closeFormModal = () => {
    setShowFormModal(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: employeeInput.name,
          lastName: employeeInput.lastName,
          phone: employeeInput.phone,
          email: employeeInput.email,
          password: employeeInput.password
        })
      });

      const result = await response.json();
      if (!result.error) {
        history.goBack();
      } else {
        setShowFormModal(true);
        setErrorMessage(result.message);
      }
    } else {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: employeeInput.name,
          lastName: employeeInput.lastName,
          phone: employeeInput.phone,
          email: employeeInput.email,
          password: employeeInput.password
        })
      });
      const result = await response.json();
      if (!result.error) {
        history.goBack();
      } else {
        setShowFormModal(true);
        setErrorMessage(result.message);
      }
    }
  };

  const onChange = (e) => {
    setEmployeeInput({ ...employeeInput, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h3 className={styles.title}>{isEditing ? 'Edit employee' : 'Add employee'}</h3>
        <form className={styles.form} onSubmit={onSubmit}>
          <TextInput
            label="Name"
            id="name"
            name="name"
            value={employeeInput.name}
            onChange={onChange}
            type="text"
            placeholder="Name"
          />
          <TextInput
            label="Last Name"
            id="lastName"
            name="lastName"
            value={employeeInput.lastName}
            onChange={onChange}
            type="text"
            placeholder="Last Name"
          />
          <TextInput
            label="Phone"
            id="phone"
            name="phone"
            value={employeeInput.phone}
            onChange={onChange}
            type="text"
            placeholder="Phone"
          />
          <TextInput
            label="Email"
            id="email"
            name="email"
            value={employeeInput.email}
            onChange={onChange}
            type="text"
            placeholder="Email"
          />
          <TextInput
            label="Password"
            id="password"
            name="password"
            value={employeeInput.password}
            onChange={onChange}
            type="password"
            placeholder="Password"
          />
          <div className={styles.divButton}>
            <button
              className={styles.firstButton}
              onClick={() => {
                history.goBack();
              }}
              type="reset"
            >
              Cancel
            </button>
            <button className={styles.secondButton} type="submit">
              Submit
            </button>
            <FormModal show={showFormModal} onClose={closeFormModal} errorMsg={errorMsg} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
