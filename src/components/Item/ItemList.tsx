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

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);
  console.log("Initial Items:", initialItems);

  const [showModal, setShowModal] = useState(false);

  const handleCreate = (item: ItemProps) => {
    setItems(prev => [...prev, item]);
  };

  const handleSplitChange = (index: number, checked: boolean) => {
    const changed_items = [...items];
    changed_items[index].status = checked;
    setItems(changed_items);
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(item => item.transaction_id !== id));
  };

  const pendingItems = items.filter(item => !item.status);
  const completedItems = items.filter(item => item.status);

  return (
    <div className="p-4 max-w-2xl mx-auto min-h-[300px]">
      <div className="button-group">
        <CreateButton onClick={() => setShowModal(true)} />
        {showModal && <ExpenseModal onClose={() => setShowModal(false)} onCreate={handleCreate} />}
      </div>

      <ItemHeader />
      <ItemListAccordion title="Pending Expenses" defaultTitle="No Pending Expenses" defaultOpen={true} onSplitChange={handleSplitChange} fullList={items} expenses={pendingItems} onDelete={handleDelete} />
      <ItemListAccordion title="Completed Expenses" defaultTitle="No Completed Expenses" onSplitChange={handleSplitChange} fullList={items} expenses={completedItems} onDelete={handleDelete} />
    </div>
  );
}

export default ItemList;