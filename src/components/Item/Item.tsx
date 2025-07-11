import './Item.scss';

export type ItemProps = {
    date: Date;
    title: string;
    description: string;
    amount: number;
    splitStatus: boolean;
}

export const Item = (props: ItemProps) => {
  const { date, title, description, amount, splitStatus } = props;

  return (
    <div className="item-row">
      <div>{date.toLocaleDateString()}</div>
      <div>{title}</div>
      <div>{description}</div>
      <div>${amount.toFixed(2)}</div>
      <div>
         <input type="checkbox" checked={splitStatus}/>
      </div>
    </div>
  );
};