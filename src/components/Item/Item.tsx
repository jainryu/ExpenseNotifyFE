import { useState } from 'react';
import './Item.scss';

export type ItemProps = {
    date: Date;
    title: string;
    description: string;
    amount: number;
    splitStatus: boolean;
    onSplitChange?: (checked: boolean) => void;
}

export const Item = (props: ItemProps) => {
  const { date, title, description, amount, onSplitChange } = props;

  return (
    <div className="item-row">
      <div>{date.toLocaleDateString()}</div>
      <div>{title}</div>
      <div>{description}</div>
      <div>${amount.toFixed(2)}</div>
      <div>
         <input type="checkbox" checked={props.splitStatus} onChange={(e) => onSplitChange?.(e.target.checked)}
/>
      </div>
    </div>
  );
};