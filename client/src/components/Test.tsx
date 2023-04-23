import { trpc } from "../utils/trpc";

const Test = () => {

    const test = trpc.helloName.useQuery({name: 'Taro', age: 20});

    // const helloQuery = trpc.hello.useQuery();
    // console.log(helloQuery);
  return (
      <>
          <p>{test.data?.greeting}</p>
          <p>{test.data?.age}</p>
      </>
  )
}

export default Test;