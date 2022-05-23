const router = require("express").Router();
const Product = require("../models/product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");


//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all products endpoint
router.get("/", async (req, res) => {
  const qnew = req.query.new;
  const qcategory = req.query.category;
  try {
    let products;
    if (qnew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qcategory) {
      products = await Product.find({ categories: { $in: [qcategory] } });
    } else {
      products = await Product.find();
    }

    res.status(200), json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT by id
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE a product by id
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
