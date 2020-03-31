import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { RegisterResolver } from './Modules/User/Register';
import session from 'express-session';
import { LoginResolver } from './Modules/User/Login';
import { GetResolver } from './Modules/User/Get';


const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, GetResolver]
  });
  
  const apolloServer = new ApolloServer({ 
    schema,
    context: ({ req }: any) => ({req})
  });

  const app = express();

  app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
  }));
  app.use(
    session({
      name: 'uid',
      secret: 'bigsecret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7 // Week
      }
    })
  );

   apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server running on http://localhost:4000/graphql');
  });
}
main();