const User = require('../models/User');

exports.getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search || '';

    let query = {};

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query = {
        $or: [
          { name: searchRegex },
          { email: searchRegex },
          { 'company.name': searchRegex }
        ]
      };
    }

    const total = await User.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;

    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: users,
      meta: {
        page,
        limit,
        total,
        totalPages
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();

    const uniqueCompaniesResult = await User.distinct('company.name');
    const uniqueCompanies = uniqueCompaniesResult.length;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newUsers = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    res.status(200).json({
      success: true,
      message: 'Stats fetched successfully',
      data: {
        totalUsers,
        uniqueCompanies,
        newUsers
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 'USER_NOT_FOUND'
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, phone, company, address } = req.body;

    const user = await User.create({
      name,
      email,
      phone,
      company,
      address
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, phone, company, address } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 'USER_NOT_FOUND'
        }
      });
    }

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;

    if (company && company.name !== undefined) {
      user.company = { name: company.name };
    }

    if (address) {
      user.address = {
        street: address.street !== undefined ? address.street : user.address.street,
        city: address.city !== undefined ? address.city : user.address.city,
        zipcode: address.zipcode !== undefined ? address.zipcode : user.address.zipcode,
        geo: {
          lat: address.geo && address.geo.lat !== undefined ? address.geo.lat : (user.address.geo ? user.address.geo.lat : undefined),
          lng: address.geo && address.geo.lng !== undefined ? address.geo.lng : (user.address.geo ? user.address.geo.lng : undefined)
        }
      };
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 'USER_NOT_FOUND'
        }
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
