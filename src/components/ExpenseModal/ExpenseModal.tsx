import { useState } from 'react';
import './ExpenseModal.scss';
import { ItemProps } from '../Item/Item';
import axios from 'axios';

type Props = {
  onClose: () => void;
  onCreate: (newItem: ItemProps) => void;
};

const ExpenseModal = ({ onClose, onCreate }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [status, setSplitStatus] = useState(false);

  const handleSave = async () => {

    try {
      const token = localStorage.getItem('token');
      const item: ItemProps = {
        title,
        date,
        amount,
        description,
        status,
      };
      const res = await axios.post('http://localhost:8000/transactions/create', item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onCreate(res.data);
      onClose();
    } catch (error) {
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