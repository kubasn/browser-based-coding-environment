"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCellsRouter = void 0;
const express_1 = __importDefault(require("express"));
//this version allows to return promises so we can write async ,await
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const createCellsRouter = (filename, dir) => {
    const router = express_1.default.Router();
    router.use(express_1.default.json());
    const fullPath = path_1.default.join(dir, filename);
    router.get("/cells", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const isError = (err) => {
            return typeof err.code === "string";
        };
        try {
            const result = yield promises_1.default.readFile(fullPath, { encoding: "utf8" });
            res.send(JSON.parse(result));
        }
        catch (err) {
            if (isError(err)) {
                if (err.code == "ENOENT") {
                    //empty array as no cells
                    yield promises_1.default.writeFile(fullPath, "[]", "utf-8");
                    //no cells to provide
                    res.send([]);
                }
                else
                    throw err;
            }
        }
        //find out if the cell storage file exists if it does not exist, add in a default list of cells
        //Read the file
        //Parse a list of cells out of it
        //Send list of cells back to browser
    }));
    router.post("/cells", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //make sure the file exists
        //if not create it
        //take the list of cells from the request object
        ////serialize them
        //annotate type of cells
        const { cells } = req.body;
        yield promises_1.default.writeFile(fullPath, JSON.stringify(cells), "utf-8");
        //write the cells into file
        res.send({ status: "ok" });
    }));
    return router;
};
exports.createCellsRouter = createCellsRouter;
