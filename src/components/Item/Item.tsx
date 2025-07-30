import { useState } from 'react';
import './Item.scss';
import { Trash2 } from 'lucide-react';
import axios from 'axios';

export type ItemProps = {
  user_id: string;
  transaction_id: string;
  title: string;
  date: string;
  amount: string;
  description?: string;
  status: boolean;
}

export type ItemComponentProps = ItemProps & {
  onSplitChange?: (checked: boolean) => void;
  onDelete: (id: string) => void;
}

const formatAmount = (amount: string) => {
  if (amount.startsWith('$')) {
    return amount;
  }
  return `$${amount}`
}

export const Item = (props: ItemComponentProps) => {
  const { date, title, description, amount, onSplitChange } = props;

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`http://localhost:8000/transactions/${props.transaction_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      props.onDelete(props.transaction_id);
      return res.data;
    }
    catch (error) {
      alert('Failed to delete item. Please try again.');
      console.error('Error deleting item:', error);
    }
  }

  return (
    <div className="item-row">
      <div>{date}</div>
      <div>{title}</div>
      <div>{description}</div>
      <div>{formatAmount(amount)}</div>
      <div>
        <input type="checkbox" checked={props.status} onChange={(e) => onSplitChange?.(e.target.checked)}
        />
      </div>
      <div>
        <Trash2
          className="trash-icon"
          size={18}
          onClick={handleDelete} // You define this
        />
      </div>
    </div>
  );
};