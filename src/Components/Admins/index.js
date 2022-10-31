import React, { useEffect, useState } from 'react';
import styles from './admins.module.css';
import AdminList from './AdminList/AdminList';
import ModalAlert from './Modals/ModalAlert';
import AddAdmin from './AddAdmin/AddAdmin';

const Admins = () => {
  const [admins, saveAdmins] = useState([]);
  const [modal, setModal] = useState(false);
  const [adminId, setAdminId] = useState(undefined);

  useEffect(async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
      const data = await res.json();
      saveAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteAdmin = async (id) => {
    saveAdmins([...admins.filter((admin) => admin._id !== id)]);
    await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'DELETE'
    });
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <ModalAlert
        adminId={adminId}
        deleteAdmin={deleteAdmin}
        modal={modal}
        closeModal={closeModal}
      />
      <div className={styles.container}>
        <h1>Admins</h1>
        <AdminList adminList={admins} setModal={setModal} setAdminId={setAdminId} />
      </div>
      <AddAdmin />
    </>
  );
};

export default Admins;

// import { useEffect, useState } from 'react';
// import Task from './Task/index';
// import Modal from './Modal/index';

// const Tasks = () => {
//   const [tasks, saveTasks] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [taskId, setTaskId] = useState(undefined);

//   useEffect(async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
//       const data = await response.json();
//       saveTasks(data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }, []);

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const deleteTask = async (id) => {
//     saveTasks([...tasks.filter((task) => task._id !== id)]);
//     await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
//       method: 'DELETE'
//     });
//   };

//   return (
//     <section>
//       <Modal
//         show={showModal}
//         closeModal={closeModal}
//         deleteTask={deleteTask}
//         taskId={taskId}
//         title="Do you want to delete this task?"
//       />
//       <h2>Tasks</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Description</th>
//             <th>Delete Task</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.map((task) => {
//             return (
//               <Task key={task._id} task={task} setShowModal={setShowModal} setTaskId={setTaskId} />
//             );
//           })}
//         </tbody>
//       </table>
//     </section>
//   );
// };

// export default Tasks;
