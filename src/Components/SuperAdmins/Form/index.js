import styles from './form.module.css';
import React, { useState, useEffect } from 'react';
import FormModal from './Modal/index';
import TextInput from '../../Shared/TextInput/index';
import { useHistory, useParams } from 'react-router-dom';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [showFormModal, setFormModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [superAdmin, setSuperAdmin] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  const formCloseModal = () => {
    setFormModal(false);
  };

  const onChange = (e) => {
    setSuperAdmin({ ...superAdmin, [e.target.name]: e.target.value });
  };

  useEffect(async () => {
    try {
      if (id) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
          method: 'GET'
        });
        const data = await response.json();
        setIsEditing(true);
        setSuperAdmin({
          name: data.data.name,
          lastName: data.data.lastName,
          email: data.data.email,
          password: data.data.password
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: superAdmin.name,
          lastName: superAdmin.lastName,
          email: superAdmin.email,
          password: superAdmin.password
        })
      });
      const content = await res.json();
      if (!content.error) {
        history.goBack();
      } else {
        setFormModal(true);
        setErrorMessage(content.message);
      }
    } else {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: superAdmin.name,
          lastName: superAdmin.lastName,
          email: superAdmin.email,
          password: superAdmin.password
        })
      });
      const content = await res.json();
      if (!content.error) {
        history.goBack();
      } else {
        setFormModal(true);
        setErrorMessage(content.message);
      }
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.flex}>
        <h4>{isEditing ? 'Edit super admin' : 'Create super admin'}</h4>
        <form className={styles.box} onSubmit={onSubmit}>
          <div>
            <TextInput
              label="Name"
              id="name"
              name="name"
              value={superAdmin.name}
              onChange={onChange}
              type="text"
              placeholder="Name"
            />
            <TextInput
              label="Last Name"
              id="lastName"
              name="lastName"
              value={superAdmin.lastName}
              onChange={onChange}
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div>
            <TextInput
              label="Email"
              id="email"
              name="email"
              value={superAdmin.email}
              onChange={onChange}
              type="text"
              placeholder="Email"
            />
            <TextInput
              label="Password"
              id="password"
              name="password"
              value={superAdmin.password}
              onChange={onChange}
              type="password"
              placeholder="Password"
            />
            <div className={styles.buttons}>
              <button
                type="reset"
                onClick={() => history.push('/super-admins')}
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