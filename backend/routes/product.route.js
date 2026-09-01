import express from "express" ;
import { getproducts,getSingleProduct,createProduct,updatedProduct,deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getproducts);           
router.get("/:id", getSingleProduct);    
 router.post("/",createProduct);
 router.put("/:id", updatedProduct);
 router.delete("/:id",deleteProduct  );

 export default router ;