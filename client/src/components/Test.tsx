import { trpc } from "../utils/trpc";

const Test = () => {

    const helloQuery = trpc.hello.useQuery();
    console.log(helloQuery);
  return (
      <div>{ helloQuery.data }</div>
  )
}

export default Test;