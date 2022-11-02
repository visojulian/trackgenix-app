import React, { useEffect, useState } from 'react';
import FormModal from './FormModal';
import styles from './form.module.css';
import FormTitle from '../Form/FormTitle/index';

const Form = () => {
  const url = window.location.href;
  const [showFormModal, setShowFormModal] = useState(false);
  const [completdForm, setAutoCompleteForm] = useState(false);
  const [formTitle, setFormTitle] = useState('Add employee');
  const [errorMsg, setErrorMessage] = useState('');
  const [employeeInput, setEmployeeInput] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });

  useEffect(async () => {
    if (url.match('id')) {
      const id = url.substring(url.indexOf('id') + 3);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
          method: 'GET'
        });
        const data = await response.json();
        setAutoCompleteForm(true);
        setFormTitle('Edit employee');
        setEmployeeInput({
          name: data.data.name,
          lastName: data.data.lastName,
          phone: data.data.phone,
          email: data.data.email,
          password: data.data.password
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const closeFormModal = () => {
    setShowFormModal(false);
  };

  const onSubmit = async (e) => {
    if (!completdForm) {
      e.preventDefault();
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
        window.location.assign('/employees');
      } else {
        setShowFormModal(true);
        setErrorMessage(result.message);
      }
    } else {
      e.preventDefault();
      const id = url.substring(url.indexOf('id') + 3);
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
        window.location.assign('/employees');
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
        <FormTitle formTitle={formTitle} />
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.input}>
            <label>Name</label>
            <input type="text" name="name" value={employeeInput.name} onChange={onChange} />
          </div>
          <div className={styles.input}>
            <label>Last name</label>
            <input type="text" name="lastName" value={employeeInput.lastName} onChange={onChange} />
          </div>
          <div className={styles.input}>
            <label>Phone</label>
            <input type="text" name="phone" value={employeeInput.phone} onChange={onChange} />
          </div>
          <div className={styles.input}>
            <label>Email</label>
            <input type="text" name="email" value={employeeInput.email} onChange={onChange} />
          </div>
          <div className={styles.input}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={employeeInput.password}
              onChange={onChange}
            />
          </div>
          <div className={styles.divButton}>
            <button
              className={styles.firstButton}
              onClick={() => {
                window.location.assign('/employees');
              }}
              type="reset"
            >
              Cancel
            </button>
            <button
              className={styles.secondButton}
              onClick={() => {
                console.log(employeeInput);
              }}
              type="submit"
            >
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
