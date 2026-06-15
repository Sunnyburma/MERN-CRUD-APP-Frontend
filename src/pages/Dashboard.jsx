import { Mail, Phone, PlusCircle, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getApiErrorMessage, getRecords } from '../api/recordsApi.js';
import ErrorState from '../components/ErrorState.jsx';
import LoadingState from '../components/LoadingState.jsx';

function Dashboard() {
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getRecords({ page: 1, limit: 5, sortBy: 'createdAt', order: 'desc' });
      setRecords(response.data);
      setTotal(response.pagination.total);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) return <LoadingState label="Loading dashboard..." />;
  if (error) return <ErrorState message={error} onRetry={loadDashboard} />;

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Record Management</h1>
        </div>
        <Link className="btn primary" to="/records/new">
          <PlusCircle size={18} />
          Add Record
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <Users size={24} />
          <span>Total Records</span>
          <strong>{total}</strong>
        </div>
        <div className="stat-card">
          <Mail size={24} />
          <span>Email Directory</span>
          <strong>{records.filter((record) => record.email).length}</strong>
        </div>
        <div className="stat-card">
          <Phone size={24} />
          <span>Phone Directory</span>
          <strong>{records.filter((record) => record.phone).length}</strong>
        </div>
      </div>

      <div className="section-header">
        <h2>Recent Records</h2>
        <Link to="/records">View all</Link>
      </div>

      <div className="recent-list">
        {records.length === 0 ? (
          <div className="empty-state">No records found.</div>
        ) : (
          records.map((record) => (
            <Link className="recent-item" key={record._id} to={`/records/${record._id}`}>
              <div>
                <strong>{record.name}</strong>
                <span>{record.email}</span>
              </div>
              <time>{new Date(record.createdAt).toLocaleDateString()}</time>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}

export default Dashboard;
