import ItemListAccordion from "./ItemListAccordion";
import { Item, ItemProps } from "./Item";
import './Item.scss';
import ItemHeader from "./ItemHeader";
import { useEffect, useState } from "react";
import SaveButton from "../Button/SaveButton";
import CreateButton from "../Button/CreateButton";
import ExpenseModal from "../ExpenseModal/ExpenseModal";
import axios from "axios";


type Props = {
  initialItems: ItemProps[];
}

const ItemList = ({ initialItems }: Props) => {

  const [items, setItems] = useState<ItemProps[]>([]);
  const [newItems, setNewItems] = useState<ItemProps[]>([]);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);
  console.log("Initial Items:", initialItems);

  const [showModal, setShowModal] = useState(false);

  const handleCreate = (item: ItemProps) => {
    setItems(prev => [...prev, item]);
    setNewItems(prev => [...prev, item]);
  };

  const handleSplitChange = (index: number, checked: boolean) => {
    const changed_items = [...items];
    changed_items[index].status = checked;
    setItems(changed_items);
    setNewItems(changed_items);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newItems.length === 0) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:8000/transactions/create', newItems, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      alert('Failed to save items. Please try again.');
      console.error('Error saving items:', error);
    }
  }

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(item => item.transaction_id !== id));
    setNewItems(prev => prev.filter(item => item.transaction_id !== id));
  };

  const pendingItems = items.filter(item => !item.status);
  const completedItems = items.filter(item => item.status);

  return (
    <div className="p-4 max-w-2xl mx-auto min-h-[300px]">
      <div className="button-group">
        <CreateButton onClick={() => setShowModal(true)} />
        {showModal && <ExpenseModal onClose={() => setShowModal(false)} onCreate={handleCreate} />}
        <SaveButton onClick={handleSave} />
      </div>

      <ItemHeader />
      <ItemListAccordion title="Pending Expenses" defaultTitle="No Pending Expenses" defaultOpen={true} onSplitChange={handleSplitChange} fullList={items} expenses={pendingItems} onDelete={handleDelete} />
      <ItemListAccordion title="Completed Expenses" defaultTitle="No Completed Expenses" onSplitChange={handleSplitChange} fullList={items} expenses={completedItems} onDelete={handleDelete} />
    </div>
  );
}

export default ItemList;