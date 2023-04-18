import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  // Get the cart items and dispatch from the global store using context
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  // Add the selected product to the cart
  const addToCartHandler = async (item) => {
    // Check if the selected product already exists in the cart
    const existItem = cartItems.find((x) => x._id === product._id);
    // If it exists, increase its quantity by 1, otherwise set quantity to 1
    const quantity = existItem ? existItem.quantity + 1 : 1;
    // Check if the selected product is still in stock
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      // If the product is out of stock, show an alert and return
      window.alert('Sorry. Product is out of stock');
      return;
    }
    // Dispatch an action to add the item to the cart
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      {/* Link to the product details page */}
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        {/* Link to the product details page */}
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        {/* Show the product rating */}
        <Rating rating={product.rating} numReviews={product.numReviews} />
        {/* Show the product price */}
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
