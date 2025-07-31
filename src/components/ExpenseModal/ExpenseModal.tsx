import { useState } from 'react';
import './ExpenseModal.scss';
import { ItemProps } from '../Item/Item';
import axios from 'axios';
import { handleAuthError } from '../../utils/handleAuthError';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

type Props = {
  onClose: () => void;
  onCreate?: (newItem: ItemProps) => void;
  onUpdate?: (updatedItem: ItemProps) => void; // Optional for future updates
  itemToEdit?: ItemProps; // Optional for editing existing items
};

const formatDate = (isoDate: string) => {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split("-");
  return `${month}/${day}/${year}`;
};

const toIsoDate = (mdy: string) => {
  const [month, day, year] = mdy.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const ExpenseModal = ({ onClose, onCreate, onUpdate, itemToEdit }: Props) => {
  const navigate = useNavigate();


  const [title, setTitle] = useState(itemToEdit?.title || '');
  const [description, setDescription] = useState(itemToEdit?.description || '');
  const [amount, setAmount] = useState(itemToEdit?.amount ? Number(itemToEdit?.amount.substring(1)) : '');
  const [date, setDate] = useState(itemToEdit?.date ? toIsoDate(itemToEdit?.date) : '');
  const [status, setSplitStatus] = useState(itemToEdit?.status || false);

  const handleSave = async () => {

    try {
      const token = localStorage.getItem('token');
      const item: ItemProps = {
        title,
        date: formatDate(date),
        amount: `$${amount}`,
        description,
        status,
      };

      const path = itemToEdit ? `/transactions/${itemToEdit.transaction_id}` : '/transactions/create';
      const url = `${API_URL}${path}`;

      const method = itemToEdit ? 'put' : 'post';

      const res = await axios[method](url, item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (itemToEdit && onUpdate) {
        onUpdate(res.data);
      } else if (onCreate) {
        onCreate(res.data);
      }
      onClose();
    } catch (error) {
      const isAuthError = handleAuthError(error, navigate);
      if (isAuthError) {
        return;
      }
      alert('Failed to save items. Please try again.');
      console.error('Error saving items:', error);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Expense</h2>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <label>
          <input type="checkbox" checked={status} onChange={e => setSplitStatus(e.target.checked)} />
          Mark as Split (Completed)
        </label>
        <div className="actions">
          <button className="save-button" onClick={onClose}>Cancel</button>
          <button className="blue-button" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;