import { ForwardedRef, forwardRef } from 'react';
import Props from './employee';
import arrowSvg from '../../../../../../assets/arrow.svg';
import styles from './Row.module.css';
import useToggle from '../../../../../../hooks/useToggle';

function Span({
  data,
  type,
  isHeader,
  onClick,
}: { data: string, type: string, isHeader?: boolean, onClick?: (type: string) => void }) {
  const [toggleAnim, setToggleAnim] = useToggle();
  if (isHeader && onClick) {
    return (
      <div
        onClick={() => {
          onClick(type);
          setToggleAnim();
        }}
        className={styles.span_container}
      >
        <span>{data}</span>
        <img className={toggleAnim ? styles.active : ''} src={arrowSvg} alt="" />
      </div>
    );
  }
  return <span>{data}</span>;
}

const Row = forwardRef(function Row({
  isEven,
  name,
  group,
  email,
  phone,
  isHeader,
  onArrowClick,
}: Props & { onArrowClick?: (type: string) => void }, ref?: ForwardedRef<HTMLDivElement>) {
  function getHeaderColor() {
    if (isHeader) return styles.header;
    if (!isEven) return styles.color_dark_grey;
    return '';
  }

  return (
    <div ref={ref} className={`${styles.container} ${getHeaderColor()}`}>
      <Span data={name} type="name" isHeader={isHeader} onClick={onArrowClick} />
      <Span data={group} type="group" isHeader={isHeader} onClick={onArrowClick} />
      <Span data={email} type="email" isHeader={isHeader} onClick={onArrowClick} />
      <Span data={phone} type="phone" isHeader={isHeader} onClick={onArrowClick} />
    </div>
  );
});

export default Row;
