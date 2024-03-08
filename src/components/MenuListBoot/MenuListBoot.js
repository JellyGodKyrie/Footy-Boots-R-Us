import styles from './MenuListBoot.module.scss';

export default function MenuListBoot({ menuBoot, handleAddToOrder }) {
  return (
    <div className={styles.MenuListBoot}>
      <div className={styles.brand + ' ' + 'flex-ctr-ctr'}>{menuBoot.brand}</div>
      <div className={styles.name}>{menuBoot.name}</div>
      <div className={styles.buy}>
        <span>${menuBoot.price.toFixed(2)}</span>
        <button className="btn-sm" onClick={() => handleAddToOrder(menuBoot._id)}>
          ADD
        </button>
      </div>
    </div>
  );
}