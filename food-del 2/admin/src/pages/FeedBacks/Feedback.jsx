import React, { useEffect, useState } from 'react';
import './Feedbacks.css'; // Ensure your CSS handles table styling as well
import { toast } from 'react-toastify';
import axios from 'axios';
import { url } from '../../assets/assets';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${url}/api/feedback`);
      if (response.data.success) {
        setFeedbacks(response.data.data);
      } else {
        throw new Error('Failed to fetch feedbacks');
      }
    } catch (error) {
      console.error('Error retrieving feedbacks:', error);
      toast.error('An error occurred while fetching feedbacks.');
    }
  };

  return (
    <div className='feedbacks'>
      <h3>Feedbacks</h3>
      {feedbacks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback, index) => (
              <tr key={index}>
                <td>{feedback.name || 'Anonymous'}</td>
                <td>{feedback.email || 'No email provided'}</td>
                <td>{feedback.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p>No feedback available.</p>}
    </div>
  );
};

export default Feedback;
