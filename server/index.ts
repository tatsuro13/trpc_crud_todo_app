import express from 'express';
import { initTRPC } from '@trpc/server';
import * as trcpExpress from '@trpc/server/adapters/express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

const t = initTRPC.create();

const appRouter = t.router({
    hello: t.procedure.query(() => {
        return 'Hello World!';
    }),
});

app.get('/', (_req, res) => res.send('Hello World!'));

app.use('/trpc',trcpExpress.createExpressMiddleware({
    router: appRouter,
})
);

app.listen(PORT, () => console.log(`listening on port ${PORT}!!`));

export type AppRouter = typeof appRouter;