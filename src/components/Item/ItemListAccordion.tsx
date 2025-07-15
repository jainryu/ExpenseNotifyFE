import { useState } from "react";
import { Item, ItemProps } from "./Item";

type AccordionProps = {
    title: string;
    defaultTitle: string;
    defaultOpen?: boolean;
    expenses: ItemProps[];
    onSplitChange: (index: number, checked: boolean) => void;
    fullList: ItemProps[];
}

const ItemListAccordion = (props: AccordionProps) => {
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
            {expenses.map((exp, i) => {
            const fullIndex = props.fullList.findIndex(item =>
                item.title === exp.title &&
                item.description === exp.description &&
                item.amount === exp.amount &&
                item.date.getTime() === exp.date.getTime()
            );

            return (
                <Item
                key={i}
                {...exp}
                onSplitChange={(checked) => props.onSplitChange(fullIndex, checked)}
                />
            );
            })}
            </>
        )}
        </div>
        </div>
    );

}

export default ItemListAccordion;