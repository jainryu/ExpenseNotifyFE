import axios from "axios";
import ItemList from "../components/Item/ItemList";
import { useQuery } from "@tanstack/react-query";

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
  const { data: items, isLoading, isError } = useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
  });

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