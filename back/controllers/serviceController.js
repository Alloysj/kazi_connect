const Service = require('../models/service');

const createService = async (req, res) => {
  try {
    const { name, description, price, duration, category } = req.body;
    
    const service = await Service.create({
      user_id: req.user.id,
      name,
      description,
      price,
      duration,
      category
    });
    
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMyServices = async (req, res) => {
  try {
    const services = await Service.findAll({ 
      where: { user_id: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });

    if (service.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to update this service' });
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'price', 'duration', 'category', 'status'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates!' });
    }

    await service.update(req.body);
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });

    if (service.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to delete this service' });
    }

    await service.destroy();
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  getMyServices,
  updateService,
  deleteService
};