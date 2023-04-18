import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import data from '../data';

// Defining a reducer function that handles the state changes based on the actions dispatched to it
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  // Using useReducer to manage state instead of useState
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  // Fetching data from the server using useEffect hook and dispatching actions to the reducer
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);

  // Returning the JSX for the HomeScreen component with the products displayed in a grid
  return (
    <div>
      <Helmet>
        <title>Swift</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? ( // Displaying a loading box if the products are still being fetched
          <LoadingBox />
        ) : error ? ( // Displaying an error message if there was an error fetching the products
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          // Rendering the products in a grid if they have been fetched successfully
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
