import { useState } from "react";
import ExpenseModal from "../ExpenseModal/ExpenseModal"
import CreateButton from "./CreateButton"
import FetchButton from "./FetchButton"
import { ItemProps } from "../Item/Item";

type Props = {
    onCreate: (newItems: ItemProps[]) => void;
    onUpdate?: (updatedItem: ItemProps) => void; // Optional for future updates
}
const ButtonGroup = ({ onCreate, onUpdate }: Props) => {

    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<ItemProps | null>(null);


    return (
        <div className="button-group">
            <FetchButton onFoundItems={onCreate} />
            <CreateButton onClick={() => setShowModal(true)} />
            {showModal && <ExpenseModal onClose={() => setShowModal(false)} onCreate={onCreate} />}
        </div>
    )
}

export default ButtonGroup;