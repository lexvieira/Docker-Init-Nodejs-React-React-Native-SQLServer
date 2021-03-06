import { Request, Response } from "express";
import knex from "../database/connection"; 
import faker from "faker";

class UsersController {
    async index(request: Request, response: Response) {

        const users = await knex('users').select("*").limit(3);

        const serialItems = users.map(user => {
            return {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                dob: user.dob,
                age: user.age,
            };
        });

        return response.json(serialItems);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const user = await knex('users').where('id', id).first();      

        if (!user) 
            return response.status(400)
            .json({ message: "User Not Found"});

        const userDetail = {
            ...user,
            user_url: faker.image.people()
        } 

        return response.json( userDetail );
    }
}

export default UsersController;