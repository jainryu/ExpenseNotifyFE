import CompletedItemList from "./CompletedItemList";
import { Item } from "./Item";
import './Item.scss';


const items = [
    {
        date: new Date('2023-10-01'),
        title: 'Lunch with Friends',
        description: 'Lunch at the new Italian restaurant downtown.',
        amount: 45.00,
        splitStatus: true
    },
    {
        date: new Date('2023-10-02'),
        title: 'Grocery Shopping',
        description: 'Weekly grocery shopping at the local market.',
        amount: 120.50,
        splitStatus: false
    },
    {
        date: new Date('2023-10-03'),
        title: 'Movie Night',
        description: 'Tickets for the latest blockbuster movie.',
        amount: 30.00,
        splitStatus: true
    }
];

const completedItems = [
        {
        date: new Date('2023-10-03'),
        title: 'Movie Night',
        description: 'Tickets for the latest blockbuster movie.',
        amount: 30.00,
        splitStatus: true
    }
]

const ItemList = () => {
  return (
    <div>
            <div className="p-4 max-w-2xl mx-auto">
        <h2 className="font-semibold mb-3">Pending Expenses</h2>
      <div className="item-header">
        <div>Date</div>
        <div>Title</div>
        <div>Description</div>
        <div>Amount</div>
        <div>Split?</div>
      </div>

      {items.map((item, i) => (
        <Item key={i} {...item} />
      ))}
    </div>
        <CompletedItemList expenses={completedItems}/>
    </div>
  );
}

export default ItemList;