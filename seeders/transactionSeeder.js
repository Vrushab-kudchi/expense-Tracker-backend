import { faker } from "@faker-js/faker";
import { Transaction } from "../models/transactionModel.js";

export const createFakeTransaction = async (userId, number) => {
  try {
    const tansactions = [];
    for (let i = 0; i < number; i++) {
      const category = faker.datatype.boolean() ? "income" : "expense";
      const transaction = await Transaction.create({
        user: userId,
        name: faker.lorem.words(),
        money: faker.datatype.number({ min: 1, max: 30000 }),
        description: faker.lorem.paragraph(),
        category: category,
      });
      tansactions.push(transaction);
    }
    await Promise.all(tansactions);
    console.log(number, " transactions created");
    process.exit(1);
  } catch (error) {
    console.log(error);
  }
};
