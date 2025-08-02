import axios from "axios";
import { ItemProps } from "../Item/Item";

type Props = {
    onFoundItems: (items: ItemProps[]) => void;
}
const API_URL = import.meta.env.VITE_API_URL;

const FetchButton = ({ onFoundItems }: Props) => {

    const handleFetch = async () => {
        const token = localStorage.getItem('token');

        const res = await axios.get(`${API_URL}/genai/extract`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (Array.isArray(res.data) && res.data.length > 0) {
            onFoundItems(res.data)
            alert("New transactions found!");
        } else {
            alert("No new transactions found.");
        }

    }

    return (
        <button onClick={handleFetch} className="fetch-button">
            Fetch Emails
        </button>
    );
}

export default FetchButton;