import express, {Response} from 'express';

const app = express();

const dir = [1, 2, 3, 4, 5, 6]
app.get('/users', (request, response: Response) => {
    response.send(`Server is Running ${dir[2]}`);
})

app.listen(3333);  

console.log('Server is Running');