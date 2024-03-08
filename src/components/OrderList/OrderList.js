import OrderListBoot from '../OrderListBoot/OrderListBoot';
import styles from './OrderList.module.scss';

export default function OrderList({ orders, activeOrder, handleSelectOrder }) {
const orderBoots = orders.map(o =>
  <OrderListBoot
    order={o}
    isSelected={o === activeOrder}
    handleSelectOrder={handleSelectOrder}
    key={o._id}
  />
);

return (
  <main className={styles.OrderList}>
    {orderBoots.length ?
      orderBoots
      :
      <span className={styles.noOrders}>No Previous Orders</span>
    }
  </main>
);
}