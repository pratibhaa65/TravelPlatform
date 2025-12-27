const travelPackage = require("../models/travelPackage");

// create a travel Travel package (admin)
const createPackage = async(req ,res )=>{
    try{
        const newPackage =new travelPackage({
            ...req.body,
            createdBy: req.user._id
        });
        const savedPackage =await newPackage.save();
        res.status(201).json(savedPackage);
    }
   catch (error) {
  console.error("CREATE PACKAGE ERROR:", error);
  res.status(500).json({ message: error.message });
}

};

// get all travel packages
const getAllPackages = async(req,res)=>{
    try{
        const packages = await travelPackage.find();
        res.json(packages);
    }catch(error){
        res.status(500).json({message: "Failed to fetch packages"});

    }
};


// Update a package 
const updatePackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    const { name, description, price, duration } = req.body;

    // Find the package
    const package = await Package.findById(packageId);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Check if logged-in user is the creator
    if (package.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized to update this package" });
    }

    // Update 
    package.name = name || package.name;
    package.description = description || package.description;
    package.price = price || package.price;
    package.duration = duration || package.duration;

    const updatedPackage = await package.save();
    res.json(updatedPackage);
  } 
  catch (error) 
  {
    res.status(500).json({ message: error.message });
  }
};

// Delete a package 
const deletePackage = async (req, res) => {
  try {
    const packageId = req.params.id;

    const package = await Package.findById(packageId);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Only creator can delete
    if (package.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized to delete this package" });
    }

    await package.remove();
    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports ={
    createPackage,
    getAllPackages,
    updatePackage,
    deletePackage
}
