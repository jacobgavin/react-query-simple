import { useQuery } from './QueryProvider';
import { useState } from 'react';

export default function Todo() {
	const [todo, setTodo] = useState(1);
  const { data, isLoading } = useQuery(`https://jsonplaceholder.typicode.com/todos/${todo}`)
  return (
    <div className="App">
      {isLoading && 'Data is loading...'}
      {data && JSON.stringify(data, null)}
      <br />
      <input type="number" value={todo} onChange={(event) => setTodo(event.target.value)}/>
    </div>
  );
}
