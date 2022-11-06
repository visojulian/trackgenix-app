import styles from './select.module.css';

// const Select = ({ children, name, value, whenSelect, placeholder }) => {
//   return (
//     <select name={name} value={value} onChange={whenSelect} className={styles.select}>
//       <option hidden value="">
//         {placeholder}
//       </option>
//       {children}
//     </select>
//   );
// };

const Select = ({ name, value, onSelect, placeholder, data }) => {
  // console.log(data);
  // if (property !== undefined) {
  //   return (
  //     <select name={name} onChange={onSelect} value={value} className={styles.select}>
  //       <option hidden value="">
  //         {placeholder}
  //       </option>
  //       {data.map((item, index) => {
  //         return (
  //           <option key={index} value={item._id}>
  //             {item[property]}
  //           </option>
  //         );
  //       })}
  //     </select>
  //   );
  // } else {
  //   return (
  //     <select name={name} onChange={onSelect} className={styles.select}>
  //       <option hidden value="">
  //         {placeholder}
  //       </option>
  //       {data.map((item, index) => {
  //         return (
  //           <option key={index} value={item}>
  //             {item}
  //           </option>
  //         );
  //       })}
  //     </select>
  //   );
  // }
  // } else {
  //   return (
  //     <select name={name} onChange={onSelect} value={value} className={styles.select}>
  //       <option value={value}>{value}</option>
  //     </select>
  //   );
  // }
  // console.log(data);
  return (
    <select name={name} onChange={onSelect} value={value} className={styles.select}>
      <option hidden value="">
        {placeholder}
      </option>
      {data.map((item, index) => {
        return (
          <option key={index} value={item.id}>
            {item.value}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
