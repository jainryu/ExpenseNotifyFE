import ItemListAccordion from "./ItemListAccordion";
import { ItemProps } from "./Item";
import './Item.scss';
import ItemHeader from "./ItemHeader";
import { useState } from "react";
import SaveButton from "../Button/SaveButton";
import CreateButton from "../Button/CreateButton";
import ExpenseModal from "../ExpenseModal/ExpenseModal";


const initialItems: ItemProps[] = [
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

const ItemList = () => {
  const [items, setItems] = useState<ItemProps[]>(initialItems);
  const [showModal, setShowModal] = useState(false);

  const handleCreate = (item: ItemProps) => {
    setItems(prev => [...prev, item]);
  };

  const handleSplitChange = (index: number, checked: boolean) => {
    const newItems = [...items];
    newItems[index].splitStatus = checked;
    setItems(newItems);
  };

  const pendingItems = items.filter(item => !item.splitStatus);
  const completedItems = items.filter(item => item.splitStatus);
  
  return (
    <div className="p-4 max-w-2xl mx-auto min-h-[300px]">
        <div className="button-group">
          <CreateButton onClick={() => setShowModal(true)}/>
          {showModal && <ExpenseModal onClose={() => setShowModal(false)} onCreate={handleCreate} />}
          <SaveButton />
        </div>

        <ItemHeader/>
        <ItemListAccordion title="Pending Expenses" defaultTitle="No Pending Expenses" defaultOpen={true} onSplitChange={handleSplitChange} fullList={items} expenses={pendingItems}/>
        <ItemListAccordion title="Completed Expenses" defaultTitle="No Completed Expenses" onSplitChange={handleSplitChange} fullList={items} expenses={completedItems}/>
    </div>
  );
}

export default ItemList;