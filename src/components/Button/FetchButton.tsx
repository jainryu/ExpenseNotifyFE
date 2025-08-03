import axios from "axios";
import { ItemProps } from "../Item/Item";
import { useState } from "react";

type Props = {
    onFoundItems?: (items: ItemProps[]) => void;
    isLinked: boolean;
    setIsLinked: (v: boolean) => void;
}
const API_URL = import.meta.env.VITE_API_URL;

const FetchButton = ({ isLinked, setIsLinked, onFoundItems }: Props) => {

    const handleLink = async () => {
        try {
            const token = localStorage.getItem('token') ?? '';
            const url = new URL(`${API_URL}/auth/google-login`);
            url.searchParams.append('token', token);

            // Redirect browser to your backend's google-login endpoint:
            window.location.href = url.toString();
        } catch (error) {
            console.error('Error linking Google account:', error);
            alert('Failed to link Google account. Please try again.');
            return;
        }
    }

    const handleFetch = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API_URL}/genai/extract`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.length > 0)
                onFoundItems?.(res.data);
            else
                alert('No expenses found in your Gmail account.');
        }
        catch (error) {
            console.error('Error fetching Gmail expenses:', error);
            alert('Failed to fetch expenses. Please try again.');
            return;
        }
    }

    return (
        <div>
            {
                isLinked ? (<button onClick={handleFetch} className="fetch-button" >
                    Fetch Gmail Expenses
                </button >) : (<button onClick={handleLink} className="fetch-button">
                    Link Google Account
                </button>)
            }
        </div>
    );
}

export default FetchButton;