import styles from './form.module.css';
import React, { useState, useEffect } from 'react';
import FormModal from './Modal/index';
import Title from '../Form/ModalTitle/index';

const Form = () => {
  const [modalTitle, setTitle] = useState('Add new Super Admin');
  const [autoForm, setAutoForm] = useState(false);
  const url = window.location.href;
  const [showFormModal, setFormModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [addSuperAdmin, setAddSuperAdmin] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  const formCloseModal = () => {
    setFormModal(false);
  };

  const onChange = (e) => {
    setAddSuperAdmin({ ...addSuperAdmin, [e.target.name]: e.target.value });
  };

  useEffect(async () => {
    if (url.match('id')) {
      const id = url.substring(url.indexOf('id') + 3);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
          method: 'GET'
        });
        const data = await response.json();
        setTitle('Edit Super Admin');
        setAutoForm(true);
        setAddSuperAdmin({
          name: data.data.name,
          lastName: data.data.lastName,
          email: data.data.email,
          password: data.data.password
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const onSubmit = async (e) => {
    if (!autoForm) {
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
      const content = await res.json();
      if (!content.error) {
        window.location.assign('/super-admins');
      } else {
        setFormModal(true);
        setErrorMessage(content.message);
      }
      console.log(content);
    } else {
      e.preventDefault();
      const id = url.substring(url.indexOf('id') + 3);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'PUT',
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
      const content = await res.json();
      if (!content.error) {
        window.location.assign('/super-admins');
      } else {
        setFormModal(true);
        setErrorMessage(content.message);
      }
      console.log(content);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.flex}>
        <Title modalTitle={modalTitle} className={styles.title} />
        <form className={styles.box} onSubmit={onSubmit}>
          <div>
            <div className={styles.div}>
              <label>Name</label>
              <input type="text" name="name" value={addSuperAdmin.name} onChange={onChange} />
            </div>
            <div className={styles.div}>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={addSuperAdmin.lastName}
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            <div className={styles.div}>
              <label>Email</label>
              <input type="text" name="email" value={addSuperAdmin.email} onChange={onChange} />
            </div>
            <div className={styles.div}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={addSuperAdmin.password}
                onChange={onChange}
              />
            </div>
            <div className={styles.buttons}>
              <button
                type="reset"
                onClick={() => window.location.assign('/super-admins')}
                className={styles.buttonCancel}
              >
                Cancel
              </button>
              <button type="submit" className={styles.buttonSubmit}>
                Submit
              </button>
              <FormModal
                showFormModal={showFormModal}
                serverMessage={errorMessage}
                formCloseModal={formCloseModal}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
