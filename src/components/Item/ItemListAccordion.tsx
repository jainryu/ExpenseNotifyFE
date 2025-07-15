import { useState } from "react";
import { Item, ItemProps } from "./Item";

type CompletedItemListProps = {
    title: string;
    defaultTitle: string;
    defaultOpen?: boolean;
    expenses: ItemProps[];
}

const ItemListAccordion = (props: CompletedItemListProps) => {
    const { expenses } = props;
    const [isOpen, setIsOpen] = useState(props.defaultOpen || false);

    return (
        <div className="accordion-wrapper">
        <button className={`accordion-toggle ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '▼' : '▶'} {props.title}
        </button>
        
        <div className={`accordion-panel ${isOpen ? 'open' : 'closed'}`}>
        {expenses.length === 0 ? (
            <p className="empty">{props.defaultTitle}</p>
        ) : (
            <>
            {expenses.map((exp, i) => (
                <Item key={i} {...exp} />
            ))}
            </>
        )}
        </div>
        </div>
    );

}

export default ItemListAccordion;