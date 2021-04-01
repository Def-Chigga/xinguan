export default {
  rightsName: {
    type: 'string',
    trim: true,
    allowNull: false,
  },
  rightsDesc: {
    type: 'string',
    trim: true,
    allowNull: false,
  },
  rightsType: {
    type: 'string',
    trim: true,
    allowNull: false,
  },
  rightsPath: {
    required: false,
    allowNull: true,
    type: 'string',
    trim: true,
  },
};
