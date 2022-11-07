import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import Delete from './assets/trash.png';
import styles from './projects.module.css';
import Button from '../Shared/Button';

const Projects = () => {
  const history = useHistory();
  const [projects, saveProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState({});
  const [showModal, saveShowModal] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        saveProjects(response.data);
      });
  }, []);

  const deleteProject = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'DELETE'
    });
    saveProjects([...projects.filter((project) => project._id !== id)]);
  };

  const handleDelete = (project, event) => {
    setSelectedProject({ id: project._id, name: project.name });
    saveShowModal(true);
    event.stopPropagation();
  };

  const editProject = (id) => {
    history.push(`/projects/form/${id}`);
  };

  return (
    <section className={styles.container}>
      <DeleteConfirmationModal
        show={showModal}
        handleModal={saveShowModal}
        deleteEntity={deleteProject}
        entity={selectedProject}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Project</th>
            <th>Created</th>
            <th></th>
            <th>
              <img src={Delete}></img>
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} onClick={() => editProject(project._id)}>
              <td>{project.name}</td>
              <td>{project.startDate.slice(0, 10)}</td>
              <td className={styles.center}>&hellip;</td>
              <td className={styles.center}>
                <Button
                  type="submit"
                  text="&times;"
                  variant="primary"
                  onClick={(e) => handleDelete(project, e)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        text="Add New Project"
        type="submit"
        variant="primary"
        onClick={() => {
          history.push(`/projects/form`);
        }}
      />
    </section>
  );
};

export default Projects;
