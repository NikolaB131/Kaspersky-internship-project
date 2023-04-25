import { ForwardedRef, forwardRef } from 'react';
import isEven from '../../../../../../helpers/isEven';
import Props from './employee';
import styles from './Row.module.css';

function getHeaderColor(index: number, isHeader: boolean | undefined) {
  if (isHeader) return styles.color_green;
  if (!isEven(index)) return styles.color_dark_grey;
  return '';
}

const Row = forwardRef(function Row({
  index,
  name,
  group,
  email,
  phone,
  isHeader,
}: Props, ref?: ForwardedRef<HTMLDivElement>) {
  return (
    <div ref={ref} className={`${styles.container} ${getHeaderColor(index, isHeader)}`}>
      <span>{name}</span>
      <span>{group}</span>
      <span>{email}</span>
      <span>{phone}</span>
    </div>
  );
});

export default Row;
