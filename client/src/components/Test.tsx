import { trpc } from "../utils/trpc";

const Test = () => {

    const { data: todos } = trpc.todos.useQuery();
    const test = trpc.helloName.useQuery({name: 'Taro', age: 20});

    // const helloQuery = trpc.hello.useQuery();
    // console.log(helloQuery);
  return (
      <ul>
          {todos?.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
      </ul>
  )
}

export default Test;