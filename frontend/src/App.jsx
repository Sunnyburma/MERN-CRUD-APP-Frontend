import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import AddRecord from './pages/AddRecord.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EditRecord from './pages/EditRecord.jsx';
import RecordDetails from './pages/RecordDetails.jsx';
import RecordsList from './pages/RecordsList.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="records" element={<RecordsList />} />
        <Route path="records/new" element={<AddRecord />} />
        <Route path="records/:id" element={<RecordDetails />} />
        <Route path="records/:id/edit" element={<EditRecord />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
