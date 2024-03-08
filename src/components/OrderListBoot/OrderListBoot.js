import styles from './OrderListBoot.module.scss';

export default function OrderListBoot({ order, isSelected, handleSelectOrder }) {
return (
  <div className={`${styles.OrderListBoot} ${isSelected ? styles.selected : ''}`} onClick={() => handleSelectOrder(order)}>
    <div>
      <div>Order Id: <span className="smaller">{order.orderId}</span></div>
      <div className="smaller">{new Date(order.updatedAt).toLocaleDateString()}</div>
    </div>
    <div className="align-rt">
      <div>${order.orderTotal.toFixed(2)}</div>
      <div className="smaller">{order.totalQty} Boot{order.totalQty > 1 ? 's' : ''}</div>
    </div>
  </div>
);
}