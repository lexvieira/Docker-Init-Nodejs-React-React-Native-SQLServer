import { environment } from './src/environments/index';
import path from 'path';

module.exports = {
    client: 'mssql',
    connection: {
      host : `${environment.ipServer}`,
      user : 'SA',
      password : 'Q5zA4@5?25wCy8',
      database : 'DB_NLW1'        
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    }, 
    useNullAsDefault: true,
};


