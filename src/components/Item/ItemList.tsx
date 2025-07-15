import ItemListAccordion from "./ItemListAccordion";
import { Item } from "./Item";
import './Item.scss';
import ItemHeader from "./ItemHeader";


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
    <div className="p-4 max-w-2xl mx-auto min-h-[300px]">
        <ItemHeader/>
        <ItemListAccordion title="Pending Expenses" defaultTitle="No Pending Expenses" defaultOpen={true} expenses={items}/>
        <ItemListAccordion title="Completed Expenses" defaultTitle="No Completed Expenses" expenses={completedItems}/>
    </div>
  );
}

export default ItemList;