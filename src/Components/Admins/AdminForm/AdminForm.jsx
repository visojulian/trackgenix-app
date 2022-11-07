import React, { useEffect, useState } from 'react';
import Button from '../../Shared/Button';
import { useHistory, useParams } from 'react-router-dom';
import FormModal from '../Modals/FormModal';
import styles from './adminForm.module.css';
import TextInput from '../../Shared/TextInput/index';

const AdminForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [adminId, setAdminId] = useState();
  const [modal, setModal] = useState(false);
  const [serverError, setServerError] = useState();
  const [edit, setEdit] = useState(false);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(async () => {
    if (id) {
      setAdminId(id);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'GET'
      });
      const data = await response.json();
      setEdit(true);
      setName(data.data.name);
      setLastName(data.data.lastName);
      setEmail(data.data.email);
      setPassword(data.data.password);
    } else {
      setEdit(false);
    }
  }, []);

  const closeModal = () => {
    setModal(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!edit) {
      const newAdmin = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, lastName: lastName, email: email, password: password })
      });
      const content = await newAdmin.json();
      if (!content.error) {
        history.goBack();
      } else {
        setModal(true);
        setServerError(content.message);
      }
    } else {
      const editAdmin = await fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, lastName: lastName, email: email, password: password })
      });
      const content = await editAdmin.json();
      if (!content.error) {
        history.goBack();
      } else {
        setModal(true);
        setServerError(content.message);
      }
    }
  };

  return (
    <>
      <h1 className={styles.container}>{edit ? 'Edit Admin' : 'Create new Admin'}</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <TextInput
          label="Name"
          id="name"
          name="name"
          value={name}
          onChange={onChangeName}
          type="text"
          placeholder="Name"
        />
        <TextInput
          label="Last Name"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={onChangeLastName}
          type="text"
          placeholder="Last Name"
        />
        <TextInput
          label="Email"
          id="email"
          name="email"
          value={email}
          onChange={onChangeEmail}
          type="text"
          placeholder="Email"
        />
        <TextInput
          label="Password"
          id="password"
          name="password"
          value={password}
          onChange={onChangePassword}
          type="text"
          placeholder="Password"
        />
        <div>
          <Button
            text="Cancel"
            type="reset"
            variant="secondary"
            onClick={() => {
              history.goBack();
            }}
          />
          <Button text="Submit" type="submit" variant="primary" />
        </div>
      </form>
      <FormModal modal={modal} title={serverError} closeModal={closeModal} />
    </>
  );
};

export default AdminForm;
