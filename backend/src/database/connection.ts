import { environment } from './../environments/index';
import knex from 'knex';

const connection = knex({
    client: 'mssql',
    connection: {
      host : `${environment.ipServer}`,
      user : 'SA',
      password : 'Q5zA4@5?25wCy8',
      database : 'DB_NLW1'    
    }
});
  
export default connection;
  