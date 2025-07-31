import axios from "axios";
import ItemList from "../components/Item/ItemList";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const fetchItems = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get('http://localhost:8000/transactions/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const Home = () => {
  const navigate = useNavigate();

  const { data: items, isLoading, isError, error } = useQuery({
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