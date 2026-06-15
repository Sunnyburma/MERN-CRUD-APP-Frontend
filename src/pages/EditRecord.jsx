import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { getApiErrorMessage, getRecord, updateRecord } from '../api/recordsApi.js';
import ErrorState from '../components/ErrorState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import RecordForm from '../components/RecordForm.jsx';

function EditRecord() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = async (payload) => {
    try {
      setSaving(true);
      const updated = await updateRecord(id, payload);
      toast.success('Record updated successfully');
      navigate(`/records/${updated._id}`);
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState label="Loading record..." />;
  if (error) return <ErrorState message={error} onRetry={loadRecord} />;

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Update</p>
          <h1>Edit Record</h1>
        </div>
      </div>
      <RecordForm initialValues={record} onSubmit={handleSubmit} loading={saving} submitLabel="Update Record" />
    </section>
  );
}

export default EditRecord;
