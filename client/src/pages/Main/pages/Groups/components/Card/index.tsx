import { ForwardedRef, forwardRef } from 'react';
import styles from './Card.module.css';

type Props = {
  name: string,
  email: string,
  phone: string,
};

const Card = forwardRef(function Card({ name, email, phone }: Props, ref?: ForwardedRef<HTMLDivElement>) {
  return (
    <div ref={ref} className={styles.container}>
      <span className={styles.name}>{name}</span>
      <span className={styles.email}>{email}</span>
      <span>{phone}</span>
    </div>
  );
});

export default Card;
