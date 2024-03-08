import styles from './MenuList.module.scss';
import MenuListBoot from '../MenuListBoot/MenuListBoot';

export default function MenuList({ menuBoots, handleAddToOrder }) {
  const boots = menuBoots.map(boot =>
    <MenuListBoot
      key={boot._id}
      handleAddToOrder={handleAddToOrder}
      menuBoot={boot}
    />
  );
  return (
    <main className={styles.MenuList}>
      {boots}
    </main>
  );
}