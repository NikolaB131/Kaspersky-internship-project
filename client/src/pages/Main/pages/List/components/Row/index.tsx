import { ForwardedRef, forwardRef } from 'react';
import Props from './employee';
import styles from './Row.module.css';

const Row = forwardRef(function Row({
  isEven,
  name,
  group,
  email,
  phone,
  isHeader,
}: Props, ref?: ForwardedRef<HTMLDivElement>) {
  function getHeaderColor() {
    if (isHeader) return styles.header;
    if (!isEven) return styles.color_dark_grey;
    return '';
  }

  return (
    <div ref={ref} className={`${styles.container} ${getHeaderColor()}`}>
      <span>{name}</span>
      <span>{group}</span>
      <span>{email}</span>
      <span>{phone}</span>
    </div>
  );
});

export default Row;
