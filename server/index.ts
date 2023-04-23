import express from 'express';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';


const app = express();
const PORT = 3000;

app.use(cors());

const prisma = new PrismaClient();

const createContext = (opts: trpcExpress.CreateExpressContextOptions) => {
  return { prisma };
};

//type Context = inferAsyncReturnType;
const t = initTRPC.context().create();

const appRouter = t.router({
    hello: t.procedure.query(() => {
        return 'Hello World!';
    }),
    helloTitle: t.procedure
        .input(z.object({ title: z.string(), age: z.number() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.title}!`,
                age: input.age,
            };
        }),
    todos: t.procedure.query(async () => {
    const todos = await prisma.todo.findMany();
    return todos;
    }),
    addTodo: t.procedure
        .input(z.object({ title: z.string() }))
        .mutation(async ({ input }) => {
            const todo = await prisma.todo.create({
                data: input,
            });
            return todo;
        }),
})

app.get('/', (_req, res) => res.send('Hello World!'));

app.use('/trpc',trpcExpress.createExpressMiddleware({
    router: appRouter,
})
);

app.listen(PORT, () => console.log(`listening on port ${PORT}!!`));

export type AppRouter = typeof appRouter;