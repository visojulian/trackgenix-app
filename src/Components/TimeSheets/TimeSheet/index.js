import Trash from '../../../assets/trash.png';
import styles from './time.module.css';

const TimeSheet = ({ timeSheet, setShowModal, setTimeSheetId }) => {
  if (
    timeSheet.description &&
    timeSheet.date &&
    timeSheet.hours &&
    timeSheet.task &&
    timeSheet.employee &&
    timeSheet.project
  ) {
    return (
      <tr
        onClick={() => {
          window.location.assign(`/time-sheets/form?id=${timeSheet._id}`);
        }}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
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
              setTimeSheetId(timeSheet._id);
              setShowModal();
            }}
          />
        </td>
      </tr>
    );
  } else return null;
};

export default TimeSheet;
