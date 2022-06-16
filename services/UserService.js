const Users = require("../models/Users");

const UserService = {
  getAll: async function () {
    try {
      const data = await Users.find();
      if (data.length > 0) return data;
      else return null;
    } catch (e) {
      const obj = { message: "error", data: e };
      return obj;
    }
  },
  getOne: async function (id) {
    try {
      const data = await Users.findById(id);
      const obj = { message: "success", data: data };
      return obj;
    } catch (e) {
      const obj = { message: "error", data: e };
      return obj;
    }
  },
  FindOneByEmail: async function (email) {
    try {
      const data = await Users.findOne(email);
      const obj = { message: "success", data: data };
      return obj;
    } catch (e) {
      const obj = { message: "error", data: e };
      return obj;
    }
  },
  getOneByEmail: async function (email) {
    try {
      const data = await Users.findOne(email);
      if (data) return true;
      else return false;
    } catch (e) {
      const obj = { message: "error", data: e };
      return obj;
    }
  },
  add: async function (body) {
    try {
      const savedData = await Users.create(body);
      const data = { message: "success", data: savedData };
      return data;
    } catch (err) {
      const arr = { message: "So error", data: err.message };
      return arr;
    }
  },

  update: async function (body, id) {
    try {
      const savedData = await Users.findByIdAndUpdate(id, body, {
        new: true,
      });
      const data = { message: "success", data: savedData };
      return data;
    } catch (err) {
      const arr = { message: "error", data: err.message };
      return arr;
    }
  },

  delete: async function (body) {
    try {
      const savedData = await Users.findByIdAndDelete(body);
      const data = { message: "success", data: savedData };
      if (savedData != null) {
        return data;
      } else {
        const arr = { message: "No", data: "No data Available" };
        return arr;
      }
    } catch (err) {
      const arr = { message: "error", data: err.message };
      return arr;
    }
  },
};

module.exports = UserService;
