import  {SpinnerRoundOutlined} from 'spinners-react';
import styles from './Loader.module.css';

export function Loader() {
  return (
    <div className={styles.Loader}>
      <SpinnerRoundOutlined size={61} thickness={98} speed={101} color="rgba(163, 172, 57, 1)" />
    </div>
  );
}
