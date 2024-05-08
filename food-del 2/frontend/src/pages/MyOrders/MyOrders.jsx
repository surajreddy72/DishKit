import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';

const MyOrders = () => {
  
  const [data, setData] = useState([]);
  const [feedback, setFeedback] = useState(''); // State to hold feedback input
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    setData(response.data.data)
  }

  const submitFeedback = async () => {
    if (!feedback) {
      toast.error('Please enter some feedback before submitting!');
      return;
    }
    try {
      const response = await axios.post(
        url + "/api/feedback",
        { name: "Anonymous", email: "anonymous@example.com", message: feedback }, // Assuming name and email are needed.
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Assuming the token needs to be sent as a Bearer token.
          }
        }
      );
      toast.success('Feedback submitted successfully!');
      setFeedback(''); // Clear the feedback input box after submission
    } catch (error) {
      console.error('Error submitting feedback:', error);
      console.error('Failed to submit feedback: ' + error.response.data.message);
    }
  }


  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token])

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className='my-orders-order'>
              <img src={assets.parcel_icon} alt="" />
              <p>{order.items.map((item, idx) => idx === order.items.length - 1 ? `${item.name} x ${item.quantity}` : `${item.name} x ${item.quantity}, `)}</p>
              <p>₹{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button>Track Order</button>
            </div>
          )
        })}
        <div className='feedback-form'>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback here..."
          />
          <button onClick={submitFeedback}>Submit Feedback</button>
        </div>
      </div>
    </div>
  )
}

export default MyOrders
