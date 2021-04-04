import express, {Response} from 'express';
import UsersController from "./controllers/usersController";
import cors from "cors";

const app = express();

app.use(cors());

const usersController = new UsersController();

const dir = [1, 2, 3, 4, 5, 6];
app.get('/test', (request, response: Response) => {
    console.log('Running is Ioda Controller');
    response.send(`Server is Running ${dir[2]}`);
});

app.get('/users',usersController.index);
app.get('/users/:id',usersController.show);

app.listen(3333);  

console.log('Server is Running');