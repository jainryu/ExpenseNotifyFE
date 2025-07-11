import { useState } from "react";
import { Item, ItemProps } from "./Item";

type CompletedItemListProps = {
    expenses: ItemProps[];
}

const CompletedItemList = (props: CompletedItemListProps) => {
    const { expenses } = props;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="accordion-wrapper">
        <button className={`accordion-toggle ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '▼' : '▶'} Completed Expenses
        </button>

        {isOpen && (
            <div className="accordion-panel">
            {expenses.length === 0 ? (
                <p className="empty">No completed expenses.</p>
            ) : (
                <>
                {expenses.map((exp, i) => (
                    <Item key={i} {...exp} />
                ))}
                </>
            )}
            </div>
        )}
        </div>
    );

}

export default CompletedItemList;