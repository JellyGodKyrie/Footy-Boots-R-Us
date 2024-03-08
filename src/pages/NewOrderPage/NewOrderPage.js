import { useState, useEffect, useRef } from 'react';
import * as bootsAPI from '../../utilities/boots-api';
import * as ordersAPI from '../../utilities/orders-api';
import styles from './NewOrderPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import MenuList from '../../components/MenuList/MenuList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function NewOrderPage({ user, setUser }) {
  const [menuBoots, setMenuBoots] = useState([]);
  const [activeCat, setActiveCat] = useState('');
  const [cart, setCart] = useState(null);
  const categoriesRef = useRef([]);
  const navigate = useNavigate();

  useEffect(function() {
    async function getBoots() {
      const boots = await bootsAPI.getAll();
      categoriesRef.current = boots.reduce((cats, boot) => {
        const cat = boot.category.name;
        return cats.includes(cat) ? cats : [...cats, cat];
      }, []);
      setMenuBoots(boots);
      setActiveCat(categoriesRef.current[0]);
    }
    getBoots();
    async function getCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart);
    }
    getCart();
  }, []);
  // Providing an empty 'dependency array'
  // results in the effect running after
  // the FIRST render only

  /*-- Event Handlers --*/
  async function handleAddToOrder(bootId) {
    const updatedCart = await ordersAPI.addBootToCart(bootId);
    setCart(updatedCart);
  }

  async function handleChangeQty(bootId, newQty) {
    const updatedCart = await ordersAPI.setBootQtyInCart(bootId, newQty);
    setCart(updatedCart);
  }

  async function handleCheckout() {
    await ordersAPI.checkout();
    navigate('/orders');
  }

  return (
    <main className={styles.NewOrderPage}>
      <aside>
        <Logo />
        <CategoryList
          categories={categoriesRef.current}
          cart={setCart}
          setActiveCat={setActiveCat}
        />
        <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link>
        <UserLogOut user={user} setUser={setUser} />
      </aside>
      <MenuList
        menuBoots={menuBoots.filter(boot => boot.category.name === activeCat)}
        handleAddToOrder={handleAddToOrder}
      />
      <OrderDetail
        order={cart}
        handleChangeQty={handleChangeQty}
        handleCheckout={handleCheckout}
      />
    </main>
  );
}