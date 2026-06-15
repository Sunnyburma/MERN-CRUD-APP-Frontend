import { ArrowDown, ArrowUp, Eye, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function RecordsTable({ records, sortBy, order, onSort, onDelete }) {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'createdAt', label: 'Created' }
  ];

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                <button type="button" className="sort-button" onClick={() => onSort(column.key)}>
                  {column.label}
                  {sortBy === column.key && (order === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                </button>
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td data-label="Name">{record.name}</td>
              <td data-label="Email">{record.email}</td>
              <td data-label="Phone">{record.phone}</td>
              <td data-label="Created">{new Date(record.createdAt).toLocaleDateString()}</td>
              <td data-label="Actions">
                <div className="row-actions">
                  <Link className="icon-btn" to={`/records/${record._id}`} aria-label={`View ${record.name}`}>
                    <Eye size={16} />
                  </Link>
                  <Link className="icon-btn" to={`/records/${record._id}/edit`} aria-label={`Edit ${record.name}`}>
                    <Pencil size={16} />
                  </Link>
                  <button type="button" className="icon-btn danger-icon" onClick={() => onDelete(record)} aria-label={`Delete ${record.name}`}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecordsTable;
