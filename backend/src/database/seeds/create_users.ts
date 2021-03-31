import faker from "faker";
import { Knex } from 'knex';

const newDate = () => {
    var DateDiff = require('date-diff');

    const dateDob = new Date(faker.date.between('1950-01-01', '2011-01-01'));
    var diff = new DateDiff(Date.now(), new Date(dateDob));
    const ageUser = parseInt(diff.years());
    return { dob: dateDob, age: ageUser }
}

const createFakeUser = () => {

    var dateDob = newDate();
    // console.log(dateDob);
    var newUser = {
        email: faker.internet.email(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        dob: dateDob.dob,
        age: dateDob.age,
    }

    return newUser;
};

exports.seed = async function(knex: Knex): Promise<void> {
    //Users
    const fakeUsers = [];
    const desiredFakeUsers = 100;
    for (let i = 0; i < desiredFakeUsers; i++){
        fakeUsers.push(createFakeUser());
    }

    await knex("users").insert(fakeUsers);
        
};