import { useState } from 'react';
import './ExpenseModal.scss';

type Props = {
  onClose: () => void;
  onCreate: (newItem: {
    date: Date;
    title: string;
    description: string;
    amount: number;
    splitStatus: boolean;
  }) => void;
};

const ExpenseModal = ({ onClose, onCreate }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [splitStatus, setSplitStatus] = useState(false);

  const handleSubmit = () => {
    if (!title || !amount || !date) return;
    onCreate({
      title,
      description,
      amount: parseFloat(amount),
      date: new Date(date),
      splitStatus,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Expense</h2>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <label>
          <input type="checkbox" checked={splitStatus} onChange={e => setSplitStatus(e.target.checked)} />
          Mark as Split (Completed)
        </label>
        <div className="actions">
          <button className="save-button" onClick={onClose}>Cancel</button>
            <button className="blue-button" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;