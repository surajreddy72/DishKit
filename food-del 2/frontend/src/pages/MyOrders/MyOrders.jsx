import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
      setOrders(response.data.data);
    } catch (error) {
      // Handle error
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const handleFeedbackChange = (orderId, event) => {
    const { value } = event.target;
    setFeedback({ ...feedback, [orderId]: value });
  };

  const submitFeedback = async (orderId) => {
    try {
      await axios.post(`${url}/api/order/feedback`, { orderId, feedback: feedback[orderId] }, { headers: { token } });
      setSuccessMessage('Feedback sent successfully!');
    } catch (error) {
      // Handle error
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {orders.map((order, index) => (
          <div key={index} className='my-orders-order'>
            <img src={assets.parcel_icon} alt="" />
            <p>{order.items.map((item, idx) => (
              <span key={idx}>{item.name} x {item.quantity}{idx !== order.items.length - 1 && ', '}</span>
            ))}</p>
            <p>₹{order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
            <div className="feedback-section">
              <textarea
                placeholder="Provide feedback..."
                value={feedback[order.id] || ''}
                onChange={(e) => handleFeedbackChange(order.id, e)}
              />
              <button onClick={() => submitFeedback(order.id)}>Submit Feedback</button>
              {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
            <button>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
