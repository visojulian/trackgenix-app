import React, { useState } from 'react';

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
    <div>
      <div>
        <h2>Add new employee</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={employeeInput.name} onChange={onChange} />
        </div>
        <div>
          <label>Last name</label>
          <input type="text" name="lastName" value={employeeInput.lastName} onChange={onChange} />
        </div>
        <div>
          <label>Phone</label>
          <input type="text" name="phone" value={employeeInput.phone} onChange={onChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="email" value={employeeInput.email} onChange={onChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" onChange={onChange} />
        </div>
        <div>
          <button
            onClick={() => {
              console.log(employeeInput);
            }}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
