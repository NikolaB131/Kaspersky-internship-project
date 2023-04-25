import { ForwardedRef, forwardRef } from 'react';
import Props from '../../../List/components/Row/employee';
import avatarSvg from '../../../../../../assets/avatar-profile.svg';
import styles from './Card.module.css';

const Card = forwardRef(function Card({
  name,
  group,
  email,
  phone,
}: Props, ref?: ForwardedRef<HTMLDivElement>) {
  return (
    <div ref={ref} className={styles.container}>
      <h2>{name}</h2>
      <img src={avatarSvg} alt="" />
      <span className={styles.group}>{group}</span>
      <span className={styles.email}>{email}</span>
      <span>{phone}</span>
    </div>
  );
});

export default Card;
