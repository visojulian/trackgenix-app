// import styles from './form.module.css';

import { useState } from 'react';

const ProjectForm = () => {
  const search = window.location.search;
  const [project, setProject] = useState({});
  const [nameValue, setNameValue] = useState('');
  const onChangeNameInput = (e) => {
    setNameValue(e.target.value);
  };

  if (search.match('id=')) {
    const id = search.substring(search.indexOf('id=') + 3);

    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setProject(response.data);
        setNameValue(project.name);
      });
  }

  return (
    <form>
      <input
        id="name"
        name="name"
        placeholder="Project name"
        required
        value={nameValue}
        onChange={onChangeNameInput}
      />
    </form>
  );
};

export default ProjectForm;
