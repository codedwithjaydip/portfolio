import mongoose from "mongoose"
import { slugify } from "../utils/slugify.js"

const detailSchema = new mongoose.Schema(
  {
    overview: String,
    problem: String,
    solution: String,
    architecture: String,
    challenges: [String],
    learned: [String],
  },
  { _id: false },
)

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A project needs a title."],
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 220,
    },
    description: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    screenshots: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    features: { type: [String], default: [] },
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    secondaryUrl: { type: String, default: "" },
    secondaryLabel: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Full Stack", "AI", "Real-Time", "Other"],
      default: "Other",
      index: true,
    },
    status: {
      type: String,
      enum: ["Completed", "In Development"],
      default: "Completed",
    },
    featured: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 0 },
    details: { type: detailSchema, default: () => ({}) },
  },
  { timestamps: true },
)

projectSchema.pre("validate", function setSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title)
  next()
})

export default mongoose.model("Project", projectSchema)
