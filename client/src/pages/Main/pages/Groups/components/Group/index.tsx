import { ForwardedRef, forwardRef } from 'react';
import Employee from '../../../List/components/Row/employee';
import styles from './Group.module.css';
import Card from '../Card';

type Props = {
  type: string,
  data: Employee[],
};

const Group = forwardRef(function Group({ type, data }: Props, ref?: ForwardedRef<HTMLDivElement>) {
  return (
    <div className={styles.group_container}>
      <h2>{type.replace('Company/', '')}</h2>
      {data.map((elem, i) => {
        let tempRef = null;
        if (data.length - 1 === i) {
          tempRef = ref;
        }
        // console.log(elem.email, elem.index);
        return (
          <Card
            ref={tempRef}
            key={elem.index}
            name={elem.name}
            email={elem.email}
            phone={elem.phone}
          />
        );
      })}
    </div>
  );
});

export default Group;
