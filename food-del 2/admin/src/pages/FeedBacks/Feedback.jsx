import React, { useEffect, useState } from 'react';
import './Feedbacks.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { url } from '../../assets/assets';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sentimentCounts, setSentimentCounts] = useState({ Happy: 0, Sad: 0 });

  useEffect(() => {
    let isMounted = true;

    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${url}/api/feedback`);
        if (response.data.success && isMounted) {
          setFeedbacks(response.data.data);
          updateSentimentCounts(response.data.data);
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
      isMounted = false;
    };
  }, []);

  const updateSentimentCounts = (feedbacks) => {
    const counts = { Happy: 0, Sad: 0 };
    feedbacks.forEach(feedback => {
      if (feedback.sentiment === "1") {
        counts.Happy += 1;
      } else if (feedback.sentiment === "0") {
        counts.Sad += 1;
      }
    });
    setSentimentCounts(counts);
  };

  return (
    <div className='feedbacks'>
      {isLoading ? <p>Loading...</p> : feedbacks.length > 0 ? (
        <>
        <h3>Graph Analysis</h3>
        <br>
        </br>
          <BarChart width={300} height={300} data={[sentimentCounts]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Happy" fill="#8884d8" />
            <Bar dataKey="Sad" fill="#82ca9d" />
          </BarChart>
          <h3>Feedbacks</h3>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Message</th>
                <th>Analysis</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback.id}>
                  <td>{feedback.createdAt}</td>
                  <td>{feedback.message}</td>
                  <td>
                    {feedback.sentiment === "1" ? "Happy" :
                     feedback.sentiment === "0" ? "Sad" : "Neutral"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* linebreak
          <br />
          <br /> */}
        </>
      ) : <p>No feedback available.</p>}
    </div>
  );
};

export default Feedback;
