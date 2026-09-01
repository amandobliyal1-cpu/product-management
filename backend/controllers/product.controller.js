import mongoose from 'mongoose';
import Product from "../models/products.model.js";

export const getproducts = async (req ,res ) =>{
     try{
         const products = await Product.find({});
         res.status(200).json({success: true, data: products});
 
     } catch(error) {
         console.log("error in fetching products",error.message);
         res.status(500).json({success: false, message:"Server Error"});
     }
}





export const createProduct = async(req , res) => {
 
     const product = req.body; // user will send this data
 
     if(!product.name || !product.price || !product.image){
         return res.status(400).json({success:false, message: "please provide all fields"});
     }
 
     const newProduct = new Product(product)
 
     try{
         await newProduct.save();
         res.status(201).json({success: true, data : newProduct });
         
     }   catch(error) {
 
         console.error("Error in create product :", error.message);
         res.status(500).json({success : false , message : "Server Error"});
     }
 }


 export const updatedProduct = async (req, res) =>  {
      const {id} = req.params ;
  
      const product = req.body ;
  
      if (!mongoose.Types.ObjectId.isValid(id)){
          return res.status(404).json({success : false, message :"Invalid Product id"});
  
      }
  
      try {
  
          const upadatedProduct = await Product.findByIdAndUpdate(id ,product,{ new:  true});
          res.status(200).json({success: true, data : upadatedProduct});
      }   catch(error) {
          res.status(500).json({success: false, message : "Server Error "});
  
      }
  
  
  }

 export const deleteProduct =  async (req, res) => {
       const { id } = req.params;

       if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false, message :"Invalid Product id"});

    }  
       try {
           await Product.findByIdAndDelete(id);
           res.status(200).json({success: true, message:"Product Deleted"});
       }   catch(error) {
           console.log("error in deleting product:",error.message);
           res.status(500).json({success: false, message:"Server Error "});
   
       }
   };



  
   export const getSingleProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product ID" });
	}

	try {
		const product = await Product.findById(id);

		if (!product) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		res.status(200).json({ success: true, data: product });
	} catch (error) {
		console.error("Error fetching single product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
