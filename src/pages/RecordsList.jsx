import { PlusCircle, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { deleteRecord, getApiErrorMessage, getRecords } from '../api/recordsApi.js';
import ConfirmModal from '../components/ConfirmModal.jsx';
import ErrorState from '../components/ErrorState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import RecordsTable from '../components/RecordsTable.jsx';

function RecordsList() {
  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const params = useMemo(
    () => ({ page, limit: 10, search, sortBy, order }),
    [page, search, sortBy, order]
  );

  const loadRecords = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getRecords(params);
      setRecords(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, [params]);

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleSort = (field) => {
    setPage(1);
    if (sortBy === field) {
      setOrder((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortBy(field);
    setOrder('asc');
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteRecord(deleteTarget._id);
      toast.success('Record deleted successfully');
      setDeleteTarget(null);
      loadRecords();
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Directory</p>
          <h1>All Records</h1>
        </div>
        <Link className="btn primary" to="/records/new">
          <PlusCircle size={18} />
          Add Record
        </Link>
      </div>

      <form className="toolbar" onSubmit={handleSearch}>
        <div className="search-field">
          <Search size={18} />
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search name, email, phone, or address"
          />
        </div>
        <button type="submit" className="btn secondary">
          Search
        </button>
      </form>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={loadRecords} />
      ) : records.length === 0 ? (
        <div className="empty-state">No records match your filters.</div>
      ) : (
        <>
          <RecordsTable records={records} sortBy={sortBy} order={order} onSort={handleSort} onDelete={setDeleteTarget} />
          <div className="pagination">
            <span>
              Page {pagination.page} of {pagination.totalPages} · {pagination.total} records
            </span>
            <div>
              <button className="btn ghost" type="button" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}>
                Previous
              </button>
              <button
                className="btn ghost"
                type="button"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((current) => current + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete record?"
        message={deleteTarget ? `This will permanently delete ${deleteTarget.name}.` : ''}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        busy={deleting}
      />
    </section>
  );
}

export default RecordsList;
