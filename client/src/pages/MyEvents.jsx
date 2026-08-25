import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { registrationAPI } from '../api';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      const data = await registrationAPI.getMyEvents();
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading"><span className="spinner" />Loading...</div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>My Registered Events</h1>
          <p className="page-subtitle">Events you are signed up for</p>
        </div>
        <span className="badge" style={{ background: '#f1f5f9', color: '#334155', borderColor: '#cbd5e1' }}>
          {events.length} registered
        </span>
      </div>

      {events.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h2>No registrations yet</h2>
          <p>You haven't registered for any events yet. Browse the dashboard to find events.</p>
        </div>
      ) : (
        <div className="event-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <div className="event-card-header">
                <h3>{event.title}</h3>
              </div>
              <div className="meta-row">
                <span className="meta-label">Society:</span>
                <span>{event.society?.societyName || event.society?.name}</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Date:</span>
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Time:</span>
                <span>{event.time}</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Venue:</span>
                <span>{event.venue}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
