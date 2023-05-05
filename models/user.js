const { Schema, model } = require("mongoose");

const Joi = require("joi");

const handelMangoosError = require("../utils/handelMongoosError");

const emailRedex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minleght: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRedex,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handelMangoosError);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": `"password" is required`,
  }),
  email: Joi.string().pattern(emailRedex).required().messages({
    "any.required": `"email" is required`,
  }),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": `"password" is required`,
  }),
  email: Joi.string().pattern(emailRedex).required().messages({
    "any.required": `"email" is required`,
  }),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRedex).required().messages({
    "any.required": `"email" is required`,
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
