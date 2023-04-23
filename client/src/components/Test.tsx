import { trpc } from "../utils/trpc";

const Test = () => {

    const { data: todos } = trpc.todos.useQuery();
    const utils = trpc.useContext();
    const test = trpc.helloTitle.useQuery({title: 'Taro', age: 20});

    // const helloQuery = trpc.hello.useQuery();
    // console.log(helloQuery);

    const addTodo = trpc.addTodo.useMutation({
        onSuccess: () => {
            utils.todos.invalidate();
        }
    });

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const title = e.currentTarget.value;
        if (e.key === 'Enter') {
            addTodo.mutate({ title });
            e.currentTarget.value = '';
        }
    };

    return (
        <>
        <h1>Todo List</h1>
            <div>
                <label id='title'>Add Todo:</label>
                <input type='text' onKeyDown={handleKeyDown} />
</div>
            <ul>
        
          {todos?.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
            </ul>
            </>
  )
}

export default Test;