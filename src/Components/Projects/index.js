import { useEffect, useState } from 'react';
import Modal from './Modal';
import styles from './projects.module.css';

const Projects = () => {
  const [projects, saveProjects] = useState([]);
  const [selectedId, saveId] = useState('');
  const [showModal, saveShowModal] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects`)
      .then((response) => response.json())
      .then((response) => {
        saveProjects(response.data);
      });
  }, []);

  const deleteProject = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}projects/${id}`, {
      method: 'DELETE'
    });
    saveProjects([...projects.filter((project) => project._id !== id)]);
  };

  const handleDelete = (id) => {
    saveShowModal(true);
    saveId(id);
  };
  return (
    <section className={styles.container}>
      <Modal
        show={showModal}
        handleModal={saveShowModal}
        deleteProject={deleteProject}
        id={selectedId}
      />
      <table>
        <tbody>
          <tr>
            <th>Project</th>
            <th>Created</th>
          </tr>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>{project.name}</td>
              <td>{project.startDate}</td>
              <td>&hellip;</td>
              <td>
                <button onClick={() => handleDelete(project._id)}>&times;</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Projects;
