import { ArrowLeft, Edit, Mail, MapPin, Phone, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteRecord, getApiErrorMessage, getRecord } from '../api/recordsApi.js';
import ConfirmModal from '../components/ConfirmModal.jsx';
import ErrorState from '../components/ErrorState.jsx';
import LoadingState from '../components/LoadingState.jsx';

function RecordDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  const loadRecord = async () => {
    try {
      setLoading(true);
      setError('');
      setRecord(await getRecord(id));
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecord();
  }, [id]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteRecord(id);
      toast.success('Record deleted successfully');
      navigate('/records');
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setDeleting(false);
      setShowDelete(false);
    }
  };

  if (loading) return <LoadingState label="Loading details..." />;
  if (error) return <ErrorState message={error} onRetry={loadRecord} />;

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <Link className="back-link" to="/records">
            <ArrowLeft size={16} />
            All records
          </Link>
          <h1>{record.name}</h1>
        </div>
        <div className="header-actions">
          <Link className="btn secondary" to={`/records/${record._id}/edit`}>
            <Edit size={17} />
            Edit
          </Link>
          <button type="button" className="btn danger" onClick={() => setShowDelete(true)}>
            <Trash2 size={17} />
            Delete
          </button>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-item">
          <Mail size={20} />
          <div>
            <span>Email</span>
            <strong>{record.email}</strong>
          </div>
        </div>
        <div className="detail-item">
          <Phone size={20} />
          <div>
            <span>Phone</span>
            <strong>{record.phone}</strong>
          </div>
        </div>
        <div className="detail-item full">
          <MapPin size={20} />
          <div>
            <span>Address</span>
            <strong>{record.address}</strong>
          </div>
        </div>
      </div>

      <div className="meta-line">
        <span>Created {new Date(record.createdAt).toLocaleString()}</span>
        <span>Updated {new Date(record.updatedAt).toLocaleString()}</span>
      </div>

      <ConfirmModal
        isOpen={showDelete}
        title="Delete record?"
        message={`This will permanently delete ${record.name}.`}
        onCancel={() => setShowDelete(false)}
        onConfirm={handleDelete}
        busy={deleting}
      />
    </section>
  );
}

export default RecordDetails;
