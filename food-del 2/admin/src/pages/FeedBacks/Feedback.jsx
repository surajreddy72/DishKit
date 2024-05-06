import React, { useEffect, useState } from 'react';
import './Feedbacks.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { url } from '../../assets/assets';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;  // Track whether the component is mounted

    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${url}/api/feedback`);
        if (response.data.success && isMounted) {
          setFeedbacks(response.data.data);
        } else {
          throw new Error('Failed to fetch feedbacks');
        }
      } catch (error) {
        console.error('Error retrieving feedbacks:', error);
        toast.error('An error occurred while fetching feedbacks.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchFeedbacks();

    return () => {
      isMounted = false;  // Set isMounted to false when the component unmounts
    };
  }, []);

  return (
    <div className='feedbacks'>
      <h3>Feedbacks</h3>
      {isLoading ? <p>Loading...</p> : feedbacks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Time</th>
              {/* <th>Email</th> */}
              <th>Message</th>
              <th>Analysis</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                {/* <td>{feedback.name || 'Anonymous'}</td> */}
                <td>{feedback.createdAt}</td>
                {/* <td>{feedback.email || 'No email provided'}</td> */}
                <td>{feedback.message}</td>
                <td>
                    {feedback.sentiment === "1" ? "Happy" :
                     feedback.sentiment === "0" ? "Sad" : "Neutral"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p>No feedback available.</p>}
    </div>
  );
};

export default Feedback;
