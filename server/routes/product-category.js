const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");
const productCategoryController = require("../controllers/productCategory");


router.get("/:shopId",productCategoryController.getCategories)
router.post("/",isAuthenticated,productCategoryController.create)
router.put("/delete/:id",isAuthenticated,productCategoryController.delete)
router.put("/update/:id",isAuthenticated,productCategoryController.update)

module.exports = router;