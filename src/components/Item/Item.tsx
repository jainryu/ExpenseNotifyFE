import { useState } from 'react';
import './Item.scss';

export type ItemProps = {
    date: Date;
    title: string;
    description: string;
    amount: number;
    splitStatus: boolean;
}

export const Item = (props: ItemProps) => {
  const [split, setSplit] = useState(props.splitStatus);
  const { date, title, description, amount } = props;

  return (
    <div className="item-row">
      <div>{date.toLocaleDateString()}</div>
      <div>{title}</div>
      <div>{description}</div>
      <div>${amount.toFixed(2)}</div>
      <div>
         <input type="checkbox" checked={split}  onChange={(e) => setSplit(e.target.checked)}/>
      </div>
    </div>
  );
};