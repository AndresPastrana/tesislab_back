import { Allowedcollections } from "../const.js";
import { ModelStudent } from "./../models/Student.js";
export class SeacrhService {
  private static ModelStudent = ModelStudent;
  private static getFilterCriteria(
    collection: Allowedcollections,
    searchTerm: string
  ) {
    const reg = new RegExp(searchTerm, "i");
    console.log(reg);

    // Define generic searchable fields for each collection
    const searchableFields: Record<Allowedcollections, string[]> = {
      [Allowedcollections.students]: [
        "email",
        "name",
        "lastname",
        "address",
        "ci",
      ],
      [Allowedcollections.docs]: [],
    };

    const collectionFields = searchableFields[collection] || [];
    let filter: { $or: any[] } = { $or: [] };

    if (collectionFields.length > 0) {
      // let filter: Record<string, { $regex: RegExp }> = {};
      for (const field of collectionFields) {
        let f: any = {};
        f[field] = { $regex: reg };
        filter.$or.push(f);
      }
    }
    return filter;
  }

  static async search(collection: Allowedcollections, searchTerm: string) {
    console.log(collection);
    console.log(searchTerm);

    const filterCriteria = this.getFilterCriteria(collection, searchTerm);

    //Use the student collection
    if (collection === Allowedcollections.students) {
      const result = await this.ModelStudent.find(filterCriteria);
      return result;
    }

    return {};
  }
}

// Will recive the collection name and the search param
//The filter will be contruct automatic depending of the collection
