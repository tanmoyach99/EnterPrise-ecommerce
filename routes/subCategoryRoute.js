const express = require("express");

const subCategoryRouter = express.Router();

const { authCheck, adminCheck } = require("../middlewares/authMiddle");
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/subController");

subCategoryRouter.post("/subCategory", authCheck, adminCheck, create);
subCategoryRouter.get("/subCategories", list);
subCategoryRouter.get("/subCategory/:slug", read);
subCategoryRouter.put("/subCategory/:slug", authCheck, adminCheck, update);

subCategoryRouter.delete("/subCategory/:slug", authCheck, adminCheck, remove);

module.exports = subCategoryRouter;
