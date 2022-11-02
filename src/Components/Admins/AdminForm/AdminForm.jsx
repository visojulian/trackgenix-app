import React, { useEffect, useState } from 'react';
import FormModal from '../Modals/FormModal';

const AddAdmin = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminId, setAdminId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [serverError, setServerError] = useState('');
  const [edit, setEdit] = useState(false);
  const [formTitle, setFormTitle] = useState('Add admin');

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
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    setAdminId(id);
    if (id) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'GET'
      });
      const data = await response.json();
      setEdit(true);
      setName(data.data.name);
      setLastName(data.data.lastName);
      setEmail(data.data.email);
      setPassword(data.data.password);
      setFormTitle('Edit admin');
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };
  const onSubmit = async (e) => {
    if (!edit) {
      e.preventDefault();
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
        window.location.assign('/admins');
      } else {
        setShowModal(true);
        setServerError(content.message);
      }
    } else {
      e.preventDefault();
      const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, lastName: lastName, email: email, password: password })
      });
      const content = await rawResponse.json();
      if (!content.error) {
        window.location.assign('/admins');
      } else {
        setShowModal(true);
        setServerError(content.message);
      }
    }
  };

  return (
    <>
      <h1>{formTitle}</h1>
      <form onSubmit={onSubmit}>
        <label>Name</label>
        <input
          id="name"
          name="name"
          value={name}
          onChange={onChangeName}
          type="text"
          placeholder="Name"
          required
        />
        <label>Last Name</label>
        <input
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={onChangeLastName}
          type="text"
          placeholder="Last Name"
          required
        />
        <label>Email</label>
        <input
          id="email"
          name="email"
          value={email}
          onChange={onChangeEmail}
          type="text"
          placeholder="Email"
          required
        />
        <label>Password</label>
        <input
          id="password"
          name="password"
          value={password}
          onChange={onChangePassword}
          type="text"
          placeholder="Password"
          required
        />
        <div>
          <button
            type="button"
            onClick={() => {
              window.location.assign('/admins');
            }}
          >
            Cancel
          </button>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <FormModal show={showModal} title={serverError} closeModal={closeModal} />
    </>
  );
};

export default AddAdmin;
