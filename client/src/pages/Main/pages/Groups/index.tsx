import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Group from './components/Group';
import Employee from '../List/components/Row/employee';
import styles from './Groups.module.css';

type Props = {
  data: Employee[] | undefined,
  isLoading: boolean,
  error: string | undefined,
  ref: ForwardedRef<HTMLDivElement>,
};

const Groups = forwardRef(function Groups() {
  const { data, isLoading, error, ref }: Props = useOutletContext();
  const [groups, setGroups] = useState<Map<string, Employee[]>>(new Map());
  const [minLength, setMinLength] = useState(0);

  useEffect(() => {
    const tempMap = new Map();
    if (data) {
      for (const employee of data) {
        const { group } = employee;
        if (!tempMap.has(group)) {
          tempMap.set(group, []);
        }
        tempMap.set(group, [...tempMap.get(group), employee]);
      }
    }
    const lengthArr = [...tempMap.values()].map(e => e.length);
    let res = 0;
    let max = Infinity;
    for (let i = 0; i < lengthArr.length; i++) {
      if (lengthArr[i] < max) {
        max = lengthArr[i];
        res = i;
      }
    }
    setMinLength(res);
    setGroups(tempMap);
  }, [data]);

  return (
    <>
      {isLoading && <p style={{ textAlign: 'center' }}>Загрузка...</p>}
      {error && <p style={{ textAlign: 'center' }}>Ошибка!</p>}
      <div className={styles.groups_container}>
        {data && [...groups.entries()].map((elem, i) => (
          <Group
            key={Math.floor(Math.random() * 1000000)}
            ref={i === minLength ? ref : undefined}
            type={elem[0]}
            data={elem[1]}
          />
        ))}
      </div>
    </>
  );
});

export default Groups;
