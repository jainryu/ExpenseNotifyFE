import { useState } from 'react';
import './Item.scss';
import { Pencil, Trash2 } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export type ItemProps = {
  user_id?: string;
  transaction_id?: string;
  title: string;
  date: string;
  amount: string;
  description?: string;
  status: boolean;
}

export type ItemComponentProps = ItemProps & {
  onSplitChange?: (checked: boolean) => void;
  onDelete: (id: string) => void;
  onEditClick: (item: ItemProps) => void;
}

const formatAmount = (amount: string) => {
  if (amount.startsWith('$')) {
    return amount;
  }
  return `$${amount}`
}

export const Item = (props: ItemComponentProps) => {
  const { date, title, description, amount, onSplitChange, onEditClick } = props;

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`${API_URL}/transactions/${props.transaction_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      props.onDelete(props.transaction_id!!);
      return res.data;
    }
    catch (error) {
      alert('Failed to delete item. Please try again.');
      console.error('Error deleting item:', error);
    }
  }

  const handleSplitChange = async (checked: boolean) => {
    if (!props.transaction_id) return;

    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `${API_URL}/transactions/${props.transaction_id}`,
        { status: checked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSplitChange?.(checked);
    } catch (error) {
      alert('Failed to update split status. Please try again.');
      console.error('Error updating split status:', error);
    }
  };

  return (
    <div className="item-row">
      <div>{date}</div>
      <div>{title}</div>
      <div>{description}</div>
      <div>{formatAmount(amount)}</div>
      <div>
        <input type="checkbox" checked={props.status} onChange={(e) => handleSplitChange(e.target.checked)}
        />
      </div>
      <div className='icon-group'>
        <Trash2
          className="trash-icon"
          size={18}
          onClick={handleDelete}
        />
        <Pencil className="pencil-icon" size={18} onClick={() => onEditClick(props)} />
      </div>
    </div>
  );
};