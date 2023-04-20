const { Schema, model } = require("mongoose");

const Joi = require("joi");

const handelMangoosError = require("../utils/handelMongoosError");

const contsctSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name must be exit"],
    },
    email: {
      type: String,
      required: [true, "email must be exit"],
    },
    phone: {
      type: String,
      required: [true, "phone must be exit"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contsctSchema.post("save", handelMangoosError);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is required`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" is required`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" is required`,
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contsctSchema);

module.exports = {
  Contact,
  schemas,
};
