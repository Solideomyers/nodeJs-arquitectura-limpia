/**
 * Represents a user in the system.
 */
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  /**
   * The name of the user.
   */
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  /**
   * The email of the user.
   */
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  /**
   * The password of the user.
   */
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  /**
   * The image URL of the user.
   */
  img: {
    type: String,
  },
  /**
   * The roles assigned to the user.
   */
  roles: {
    type: [String],
    default: ["USER_ROLE"],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
});

/**
 * The Mongoose model for the User collection.
 */
export const UserModel = mongoose.model("User", userSchema);
