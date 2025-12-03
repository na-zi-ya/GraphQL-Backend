import Employee, { IEmployee } from "../models/Employee";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server-express";
import dotenv from "dotenv";
import { paginate } from "../utils/pagination";

dotenv.config();

const resolvers = {
  Query: {
    employees: async (_: any, args: any, context: any) => {
      try {
        if (!context.user) throw new AuthenticationError("Not authenticated");

        const { page = 1, limit = 10, sortField = "name", sortOrder = 1, filter } = args;
        const query = filter ? { name: { $regex: filter, $options: "i" } } : {};

        return await paginate(Employee, query, page, limit, sortField, sortOrder);

      } catch (error: any) {
        console.error("Error fetching employees:", error);
        throw new UserInputError("Unable to fetch employees");
      }
    },

    employee: async (_: any, { id }: { id: string }, context: any) => {
      try {
        if (!context.user) throw new AuthenticationError("Not authenticated");

        const employee = await Employee.findById(id);
        if (!employee) throw new UserInputError("Employee not found");

        return employee;

      } catch (error) {
        console.error("Error fetching employee:", error);
        throw new UserInputError("Unable to fetch employee");
      }
    },
  },

  Mutation: {
    addEmployee: async (_: any, args: IEmployee, context: any) => {
      try {
        if (!context.user) throw new AuthenticationError("Not authenticated");
        if (context.user.role !== "admin")
          throw new AuthenticationError("Not authorized");

        const employee = new Employee(args);
        return await employee.save();

      } catch (error) {
        console.error("Error adding employee:", error);
        throw new UserInputError("Unable to add employee");
      }
    },

    updateEmployee: async (_: any, { id, ...args }: any, context: any) => {
      try {
        if (!context.user) throw new AuthenticationError("Not authenticated");
        if (context.user.role !== "admin")
          throw new AuthenticationError("Not authorized");

        const updated = await Employee.findByIdAndUpdate(id, args, { new: true });
        if (!updated) throw new UserInputError("Employee not found");

        return updated;

      } catch (error) {
        console.error("Error updating employee:", error);
        throw new UserInputError("Unable to update employee");
      }
    },

    // register: async (_: any, { username, password, role }: any) => {
    //   try {
    //     const existingUser = await User.findOne({ username });
    //     if (existingUser)
    //       throw new UserInputError("Username already exists");

    //     const hashedPassword = await bcrypt.hash(password, 10);

    //     const user = new User({ username, password: hashedPassword, role });
    //     await user.save();

    //     const token = jwt.sign(
    //       { id: user._id, role: user.role },
    //       process.env.JWT_SECRET!,
    //       { expiresIn: "1d" }
    //     );

    //     return {
    //       id: user._id,
    //       username: user.username,
    //       role: user.role,
    //       token,
    //     };

    //   } catch (error) {
    //     console.error("Error during registration:", error);
    //     throw new UserInputError("Registration failed");
    //   }
    // },

    register: async (_: any, { username, email, password, role }: any) => {
      try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser)
          throw new UserInputError("Username or Email already exists");
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = new User({ username, email, password: hashedPassword, role });
        await user.save();
    
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET!,
          { expiresIn: "1d" }
        );
    
        return {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          token,
        };
    
      } catch (error) {
        console.error("Error during registration:", error);
        throw new UserInputError("Registration failed");
      }
    },
    
    login: async (_: any, { username, password }: any) => {
      try {
        const user = await User.findOne({ username });
        if (!user) throw new AuthenticationError("Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new AuthenticationError("Invalid credentials");

        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET!,
          { expiresIn: "1d" }
        );

        return {
          id: user._id,
          username: user.username,
          role: user.role,
          token,
        };

      } catch (error) {
        console.error("Login error:", error);
        throw new AuthenticationError("Login failed");
      }
    },
  },
};

export default resolvers;
