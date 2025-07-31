import axios from "axios";
import ItemList from "../components/Item/ItemList";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const fetchItems = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API_URL}/transactions/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const Home = () => {
  const navigate = useNavigate();

  const { data: items, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
    retry: false
  });

  useEffect(() => {
    if (isError) {
      if (
        error instanceof Error &&
        (error.message.includes('401') || error.message.includes('403') || error.message.includes('No token'))
      ) {
        localStorage.removeItem('token');
        alert('Session expired. Please log in again.');
        navigate('/login');
      }
    }
  }, [isError, error, navigate]);

  useEffect(() => {
    const fetchFromGmail = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${API_URL}/genai/extract`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(res.data) && res.data.length > 0) {
          // New transactions were added → refetch transaction list
          alert("New transactions found! Refetching items...");
          refetch();
        } else {
          // No new transactions found, no need to refetch
          alert("No new transactions found.");
        }

        // If it's a message or no new ones, no need to refetch
      } catch (error) {
        console.error("Error syncing with Gmail:", error);
      }
    };

    fetchFromGmail();
  }, [refetch]);


  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching items</p>;

  console.log('Fetched items:', items);
  return (
    <>
      <h1>Welcome to Expense Notify</h1>
      <ItemList initialItems={items} />
    </>
  );
}

export default Home;