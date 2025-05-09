const express = require('express');
const router = express.Router();
const { 
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const upload = require('../middleware/upload'); // Add file upload middleware if needed

// Get all services
router.get('/', getAllServices);

// Get single service
router.get('/:id', getServiceById);

// Create service (with optional image upload)
router.post('/', upload.single('profile_image'), createService);

// Update service
router.put('/:id', upload.single('profile_image'), updateService);

// Delete service
router.delete('/:id', deleteService);

module.exports = router;