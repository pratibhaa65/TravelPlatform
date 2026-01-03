const TravelPackage = require("../models/travelPackage");

// create a travel Travel package 
const createPackage = async (req, res) => {
  try {
    const { title, description, price, duration, location, availableSlots, image } = req.body;
    if (!title || !description || !price || !duration || !location || !availableSlots) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPackage = new TravelPackage({
      title,
      description,
      price,  
      duration,
      location,
      availableSlots,
      image,
      createdBy: req.user._id
    });
    
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  }
  catch (error) {
    console.error("CREATE PACKAGE ERROR:", error);
    res.status(500).json({ message: error.message });
  }

};

// get all travel packages
const getAllPackages = async (req, res) => {
  try {
    const packages = await TravelPackage.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch packages" });

  }
};

// get a package by ID
const getPackageById = async (req, res) => {
  try {
    const pkg = await TravelPackage.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch package" });
  }
};

const updatePackage = async (req, res) => {
  try {
    const packageId = req.params.id;
    const { title, description, price, duration, location, availableSlots, imageUrl } = req.body;

    // Find the package
    const package = await TravelPackage.findById(packageId);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Check if logged-in user is the creator
    if (package.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to update this package" });
    }

    // Update fields
    package.title = title || package.title;
    package.description = description || package.description;
    package.price = price || package.price;
    package.duration = duration || package.duration;
    package.location = location || package.location;
    package.availableSlots = availableSlots || package.availableSlots;

    // Handle image: URL or file upload
    if (imageUrl) {
      package.image = imageUrl;
    } else if (req.file) {
      package.image = `/uploads/${req.file.filename}`;
    }

    const updatedPackage = await package.save();
    res.json(updatedPackage);

  } catch (error) {
    console.error("Update package error:", error);
    res.status(500).json({ message: "Failed to update package" });
  }
};

module.exports = { updatePackage };


// Delete a package 
const deletePackage = async (req, res) => {
  try {
    const packageId = req.params.id;

    const package = await TravelPackage.findById(packageId);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Only creator can delete
    if (package.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this package" });
    }

    await TravelPackage.findByIdAndDelete(packageId);
    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage
}
