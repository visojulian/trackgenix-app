import React, { useState } from 'react';
import styles from './form.module.css';

const Form = () => {
  const [employeeInput, setEmployeeInput] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });

  const onSubmit = async (e) => {
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
        password: '7fHe9Lr'
      })
    });
    setEmployeeInput({
      name: '',
      lastName: '',
      email: '',
      phone: '',
      password: ''
    });

    const result = await response.json();
    if (!result.error) {
      window.location.assign('/employees');
    }
    console.log(result);
  };

  const onChange = (e) => {
    setEmployeeInput({ ...employeeInput, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Add new employee</h2>
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
            <input type="password" name="password" onChange={onChange} />
          </div>
          <div className={styles.button}>
            <button
              onClick={() => {
                console.log(employeeInput);
              }}
              type="submit"
            >
              Submit
            </button>
            <button
              onClick={() => {
                window.location.assign('/employees');
              }}
              type="submit"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
