import { useState } from "react";
import ExpenseModal from "../ExpenseModal/ExpenseModal"
import CreateButton from "./CreateButton"
import FetchButton from "./FetchButton"
import { ItemProps } from "../Item/Item";

type Props = {
    onCreate: (newItems: ItemProps[]) => void;
    onUpdate?: (updatedItem: ItemProps) => void; // Optional for future updates
    isLinked: boolean;
    setIsLinked: (v: boolean) => void;
}
const ButtonGroup = ({ onCreate, isLinked, setIsLinked }: Props) => {

    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<ItemProps | null>(null);


    return (
        <div className="button-group">
            <FetchButton onFoundItems={onCreate} isLinked={isLinked} setIsLinked={setIsLinked} />
            <CreateButton onClick={() => setShowModal(true)} />
            {showModal && <ExpenseModal onClose={() => setShowModal(false)} onCreate={onCreate} />}
        </div>
    )
}

export default ButtonGroup;