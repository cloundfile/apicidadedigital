import express, { Application } from 'express';
import { AppDataSource } from './data-source';
import routes from './routes';
var cors = require('cors');

AppDataSource.initialize().then(() => {
  const app: Application = express();
  app.use(express.json());
  
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS")
    res.setHeader("Access-Control-Max-Age", "3600")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me, Authorization, type ")
    res.setHeader("Access-Control-Expose-Headers","Authorization")
    
    if (req.method === 'OPTIONS') {
      return res.status(200).send({});
    }
    next();
  });
  app.use(cors())
  app.use(routes); 
  
  return app.listen(process.env.PORT || 3333);
}).catch(() => {
  console.log("Could not connect to the database");
});