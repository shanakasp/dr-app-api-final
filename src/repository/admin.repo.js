import sequelize from "../../config/db.connection.js";
import bcrypt from "bcrypt";
import { Admin } from "./../models/model.js";

const adminRepo = {
  registerSuperAdmin: async () => {
    try {
      const encrypted_pw = await bcrypt.hash(process.env.SUPER_ADMIN_PW, 10);
      await sequelize.sync();
      const result = await Admin.create({
        username: process.env.SUPER_ADMIN_USERNAME,
        password: encrypted_pw,
      });
      return !!result; // Assuming `result` is truthy if successful
    } catch (error) {
      throw error;
    }
  }, //for this run initialize.js file
  getSuperAdmin: async () => {
    try {
      const result = await Admin.findAll();
      return result;
    } catch (error) {
      throw error;
    }
  },
  getSuperAdminById: async (superAdminId) => {
    try {
      const result = await Admin.findAll({
        where: {
          id: superAdminId,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  getAdminByUsername: async (username) => {
    try {
      const result = await Admin.findAll({
        where: {
          username: username,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  changeSuperAdminPassword: async (superAdminId, newPasswordHash) => {
    try {
      await sequelize.sync();
      const result = await Admin.update(
        {
          password: newPasswordHash,
        },
        {
          where: {
            id: superAdminId,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default adminRepo;
