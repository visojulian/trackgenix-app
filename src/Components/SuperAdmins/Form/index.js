import styles from './form.module.css';
import React, { useState } from 'react';

const Form = () => {
  const [addSuperAdmin, setAddSuperAdmin] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  const onChange = (e) => {
    setAddSuperAdmin({ ...addSuperAdmin, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: addSuperAdmin.name,
        lastName: addSuperAdmin.lastName,
        email: addSuperAdmin.email,
        password: addSuperAdmin.password
      })
    });
    setAddSuperAdmin({
      name: '',
      lastName: '',
      email: '',
      password: ''
    });

    const content = await res.json();
    console.log(content);
  };

  return (
    <section className={styles.container}>
      <div className={styles.flex}>
        <h3>Add Super Admin</h3>
        <form className={styles.box} onSubmit={onSubmit}>
          <div>
            <div className={styles.div}>
              <label>Name</label>
              <input
                type="text"
                required
                name="name"
                value={addSuperAdmin.name}
                onChange={onChange}
              />
            </div>
            <div className={styles.div}>
              <label>Last Name</label>
              <input
                type="text"
                required
                name="lastName"
                value={addSuperAdmin.lastName}
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            <div className={styles.div}>
              <label>Email</label>
              <input
                required
                type="text"
                name="email"
                value={addSuperAdmin.email}
                onChange={onChange}
              />
            </div>
            <div className={styles.div}>
              <label>Password</label>
              <input
                required
                type="text"
                name="password"
                value={addSuperAdmin.password}
                onChange={onChange}
              />
            </div>
            <div className={styles.buttons}>
              <button onClick={() => window.location.assign('/super-admins')}>Cancel</button>
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
