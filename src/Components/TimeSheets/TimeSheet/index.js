import Trash from '../../../Assets/trash.png';
import styles from './time.module.css';

const TimeSheet = ({ timeSheet, setShowModal, setTimeSheetId }) => {
  return (
    <tr style={{ display: 'flex', justifyContent: 'center' }}>
      <td style={{ flexBasis: '25%' }}>{timeSheet.description}</td>
      <td style={{ flexBasis: '15%' }}>{timeSheet.date}</td>
      <td style={{ flexBasis: '10%' }}>{timeSheet.hours}</td>
      <td style={{ flexBasis: '20%' }}>{timeSheet.task.description}</td>
      <td style={{ flexBasis: '20%' }}>
        {`${timeSheet.employee.name} ${timeSheet.employee.lastName}`}
      </td>
      <td style={{ flexBasis: '10%' }}>{timeSheet.project.name}</td>
      <td style={{ flexBasis: '10%' }}>
        <img
          className={styles.button}
          src={Trash}
          alt="trash"
          onClick={(event) => {
            event.stopPropagation();
            setShowModal(true);
            setTimeSheetId(timeSheet._id);
          }}
        />
      </td>
    </tr>
  );
};

export default TimeSheet;
