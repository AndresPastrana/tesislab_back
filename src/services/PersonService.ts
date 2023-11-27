import { ModelPerson } from "../models/Person.js";

import { Types } from "mongoose";

export type CreatePersonInput = {
  user_id: Types.ObjectId;
  ci: string;
  name: string;
  lastname: string;
  address: string;
  age: number;
  phone: string;
  sex: string;
};

export default class PersonService {
  static async createPerson({
    user_id,
    ci,
    name,
    lastname,
    address,
    age,
    phone,
    sex,
  }: CreatePersonInput) {
    try {
      // Create a new person
      const newPerson = await ModelPerson.create({
        user_id,
        ci,
        name,
        lastname,
        address,
        age,
        phone,
        sex,
        ancient: false,
      });

      return newPerson._id;
    } catch (error) {
      return {};
      //   throw ErrorFactory.createPersonError("Error creating the new person");
    }
  }

  static async getPersonById(personId: Types.ObjectId) {
    try {
      const person = await ModelPerson.findById(personId).populate(
        "user_id",
        "email"
      );

      if (!person) {
        return {};
        // throw ErrorFactory.createPersonNotFoundError("Person not found");
      }

      return person.toJSON();
    } catch (error) {
      //   throw ErrorFactory.createPersonError("Error retrieving person information");
    }
  }

  static async deletePerson(personId: string) {
    try {
      const updatedPerson = await ModelPerson.findByIdAndUpdate(personId, {
        ancient: true,
      });

      if (!updatedPerson) {
        return null;
        // throw ErrorFactory.createPersonNotFoundError("Person not found for deletion");
      }

      return updatedPerson._id;
    } catch (error) {
      // throw ErrorFactory.createPersonError("Error deleting the person");
    }
  }
}
