import express from "express";
//this version allows to return promises so we can write async ,await
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}
interface Error {
  code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());
  const fullPath = path.join(dir, filename);

  router.get("/cells", async (req, res) => {
    const isError = (err: any): err is Error => {
      return typeof err.code === "string";
    };

    try {
      const result = await fs.readFile(fullPath, { encoding: "utf8" });
      res.send(JSON.parse(result));
    } catch (err) {
      if (isError(err)) {
        if (err.code == "ENOENT") {
          //empty array as no cells
          await fs.writeFile(fullPath, "[]", "utf-8");
          //no cells to provide
          res.send([]);
        } else throw err;
      }
    }
    //find out if the cell storage file exists if it does not exist, add in a default list of cells
    //Read the file
    //Parse a list of cells out of it
    //Send list of cells back to browser
  });

  router.post("/cells", async (req, res) => {
    //make sure the file exists
    //if not create it
    //take the list of cells from the request object
    ////serialize them
    //annotate type of cells
    const { cells }: { cells: Cell[] } = req.body;

    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");
    //write the cells into file
    res.send({ status: "ok" });
  });
  return router;
};
