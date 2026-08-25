import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { eventsAPI, registrationAPI } from '../api';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventsAPI.getAll();
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      setRegistering(eventId);
      await registrationAPI.register(eventId);
      alert('Registered successfully! Check your email for confirmation.');
      fetchEvents();
    } catch (err) {
      alert(err.message);
    } finally {
      setRegistering(null);
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      setDeleting(eventId);
      await eventsAPI.delete(eventId);
      fetchEvents();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return <div className="loading"><span className="spinner" />Loading events...</div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Upcoming Events</h1>
          <p className="page-subtitle">Discover and register for upcoming events</p>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <h2>No events yet</h2>
          <p>There are no upcoming events at the moment. Check back later!</p>
        </div>
      ) : (
        <div className="event-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <div className="event-card-header">
                <h3>{event.title}</h3>
                <span className="badge">{event.registeredUsers?.length || 0} / {event.maxParticipants}</span>
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
              <p className="description">{event.description}</p>
              <div className="footer-row">
                {user && user.role === 'student' && (
                  <button
                    onClick={() => handleRegister(event._id)}
                    disabled={registering === event._id}
                    style={{ alignSelf: 'flex-start' }}
                  >
                    {registering === event._id ? <><span className="spinner" />Registering...</> : 'Register Now'}
                  </button>
                )}
                {(user?.role === 'society' && event.society?._id === user?._id) && (
                  <button
                    onClick={() => handleDelete(event._id)}
                    disabled={deleting === event._id}
                    style={{ alignSelf: 'flex-start', background: '#dc2626', color: '#fff' }}
                  >
                    {deleting === event._id ? <><span className="spinner" />Deleting...</> : 'Delete Event'}
                  </button>
                )}
                {user?.role === 'admin' && (
                  <button
                    onClick={() => handleDelete(event._id)}
                    disabled={deleting === event._id}
                    style={{ alignSelf: 'flex-start', background: '#dc2626', color: '#fff' }}
                  >
                    {deleting === event._id ? <><span className="spinner" />Deleting...</> : 'Delete Event'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
