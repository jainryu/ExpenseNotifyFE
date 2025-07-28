import { useState } from 'react';
import './Item.scss';

export type ItemProps = {

  user_id: string;
  transaction_id: string;
  title: string;
  date: string;
  amount: string;
  description?: string;
  status: boolean;
  onSplitChange?: (checked: boolean) => void;
}

export const Item = (props: ItemProps) => {
  const { date, title, description, amount, onSplitChange } = props;

  return (
    <div className="item-row">
      <div>{date}</div>
      <div>{title}</div>
      <div>{description}</div>
      <div>${amount}</div>
      <div>
        <input type="checkbox" checked={props.status} onChange={(e) => onSplitChange?.(e.target.checked)}
        />
      </div>
    </div>
  );
};