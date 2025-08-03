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

type HomeProps = {
  isLinked: boolean;
  setIsLinked: (v: boolean) => void;
}

const Home = ({ isLinked, setIsLinked }: HomeProps) => {
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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching items</p>;

  console.log('Fetched items:', items);
  return (
    <>
      <h1>Expense Notify</h1>
      <ItemList initialItems={items} isLinked={isLinked} setIsLinked={setIsLinked} />
    </>
  );
}

export default Home;