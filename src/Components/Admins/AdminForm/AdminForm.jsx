import React from 'react';
import FormModal from '../Modals/FormModal';

const AdminFormLogic = ({
  modal,
  serverError,
  formTitle,
  onChangeName,
  onChangeLastName,
  onChangeEmail,
  onChangePassword,
  closeModal,
  onSubmit,
  name,
  lastName,
  email,
  password
}) => {
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
      <FormModal modal={modal} title={serverError} closeModal={closeModal} />
    </>
  );
};

export default AdminFormLogic;
