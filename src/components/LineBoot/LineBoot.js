import styles from './LineBoot.module.scss';

export default function LineBoot({ lineBoot, isPaid, handleChangeQty }) {
return (
  <div className={styles.LineBoot}>
    <div className="flex-ctr-ctr">{lineBoot.boot.brand}</div>
    <div className="flex-ctr-ctr flex-col">
      <span className="align-ctr">{lineBoot.boot.name}</span>
      <span>{lineBoot.boot.price.toFixed(2)}</span>
    </div>
    <div className={styles.qty} style={{ justifyContent: isPaid && 'center' }}>
      {!isPaid &&
        <button
          className="btn-xs"
          onClick={() => handleChangeQty(lineBoot.boot._id, lineBoot.qty - 1)}
        >−</button>
      }
      <span>{lineBoot.qty}</span>
      {!isPaid &&
        <button
          className="btn-xs"
          onClick={() => handleChangeQty(lineBoot.boot._id, lineBoot.qty + 1)}
        >+</button>
      }
    </div>
    <div className={styles.extPrice}>${lineBoot.extPrice.toFixed(2)}</div>
  </div>
);
}