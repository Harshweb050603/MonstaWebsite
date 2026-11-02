import productModel from "../Models/product.model.js";


// Add Product
export async function createProduct(req,res){
    try{

        const { name} = req.body;
        
        const isProductExist = await productModel.findOne({name:name});
        if(isProductExist){
            return res.status(400).json({
                message:"product already exist"
            })
        }

        const product = await productModel.create({
            ...req.body,
            image: req.file ? req.file.filename : ""
        });

        if(!product) {
            return res.status(400).json({
                message:"product not created"
            })
        }

        res.status(201).json({
            message:"product created successfully",
            product
        })
    }catch(error){
        console.error("Error creating product:", error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
};

//  Get all Products 

export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();

        return res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            count: products.length,
            data: products
        });
    }   
catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

//  getSingle product

export async function getSingleProduct(req, res) {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
//  uodate Product

// Update Product
export async function updateProduct(req, res) {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(req.file && {
          image: `/uploads/${req.file.filename}`
        })
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
export async function deleteProduct(req,res){
    try{
        const product = await productModel.findByIdAndDelete(req.params.id);
        if(!product){
        return res.status(404).json({
            message:"product not found"
        })
    }

        return res.status(200).json({
            message:"product deleted successfully",
            product
        })




    } catch (error) {
    console.error("Delete error:", error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
