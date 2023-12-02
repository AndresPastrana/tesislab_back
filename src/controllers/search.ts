import { Response, Request } from "express";
import { handleResponse } from "../middleware/handleResponse.js";

import { SeacrhService } from "../services/Search.js";
import { matchedData } from "express-validator";

class SearchController {
  static async search(req: Request, res: Response) {
    try {
      const { collection, term } = matchedData(req, {
        locations: ["query"],
      });

      const result = await SeacrhService.search(collection, term);

      // Adjust the status code based on your specific use case
      handleResponse({
        statusCode: 200,
        data: result || [],
        res,
      });
    } catch (error: any) {
      console.error(`Error during search: ${error.message}`);
      handleResponse({
        statusCode: 500, // Internal Server Error
        error: error.message,
        res,
      });
    }
  }
}

export default SearchController;
