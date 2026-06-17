import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { createRecord, getApiErrorMessage } from '../api/recordsApi.js';
import RecordForm from '../components/RecordForm.jsx';
import { useState } from 'react';

function AddRecord() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (payload) => {
    try {
      setLoading(true);
      const record = await createRecord(payload);
      toast.success('Record created successfully');
      navigate(`/records/${record._id}`);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Create</p>
          <h1>Add Record</h1>
        </div>
      </div>
      <RecordForm onSubmit={handleSubmit} loading={loading} submitLabel="Create Record" />
    </section>
  );
}

export default AddRecord;
