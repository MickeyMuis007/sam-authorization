import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { Document, Model, model, Schema } from "mongoose";
import { IBase } from "../../shared/entities/base.entity";

export interface IUser extends Document, IBase {
  username: string;
  password: string;
  status: string; // Login or Logout
  roles: string[];
  generateAuthToken();
  verifyPassword(password: string);
}

export const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  createdAt: Date,
  createdBy: String,
  lastUpdatedAt: Date,
  lastUpdatedBy: String,
  isActive: Boolean
});

UserSchema.pre<IUser>("save", async function(next) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
    this.createdBy = "Mike";
  }

  if (this.isActive === undefined) {
    this.isActive = true;
  }

  if (this.isModified("password") && this.password) {
    try {
      const salt = 10;
      this.password = await hash(this.password, salt);
    } catch (err) {
      console.log(`Password failed to hash: ${JSON.stringify(err)}`.red);
    }
  }

  this.lastUpdatedAt = now;
  this.lastUpdatedBy = "Mike";
  next();
});

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, lastUpdatedAt: this.lastUpdatedAt, username: this.username },
    "mike",
    { expiresIn: 120 });
  console.log("token", token);
  return token;
};

UserSchema.methods.verifyPassword = async function(password: string) {
  const verifyPassword = await compare(password, this.password);
  console.log(`Valid Password: ${verifyPassword}`.yellow);
  return verifyPassword;
};

export const User: Model<IUser> = model<IUser>("User", UserSchema);
