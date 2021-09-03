import { useQuery } from './QueryProvider';
import { useState } from 'react';

async function fetchTodo(todo) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo}`);
  return response.json();
}

export default function Todo() {
	const [todo, setTodo] = useState(1);
  const { data, isLoading } = useQuery(() => fetchTodo(todo), { queryKey: ['todo', todo] })
  return (
    <div className="App">
      {isLoading && 'Data is loading...'}
      {data && JSON.stringify(data, null)}
      <br />
      <input type="number" value={todo} onChange={(event) => setTodo(event.target.value)}/>
    </div>
  );
}
