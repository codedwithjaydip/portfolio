import Project from '../models/Project.js';
import { ApiError } from '../middleware/errorHandler.js';

export async function listProjects(req, res, next) {
  try {
    const filter = {};
    if (req.query.category && req.query.category !== 'All') filter.category = req.query.category;
    if (req.query.featured === 'true') filter.featured = true;

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 }).lean();
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
}

export async function getProject(req, res, next) {
  try {
    const { id } = req.params;
    const query = id.match(/^[0-9a-fA-F]{24}$/) ? { _id: id } : { slug: id };
    const project = await Project.findOne(query).lean();
    if (!project) throw new ApiError(404, 'That project does not exist.');
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
}

export async function createProject(req, res, next) {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    if (error.code === 11000) return next(new ApiError(409, 'A project with that slug already exists.'));
    next(error);
  }
}

export async function updateProject(req, res, next) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) throw new ApiError(404, 'That project does not exist.');
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
}

export async function deleteProject(req, res, next) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) throw new ApiError(404, 'That project does not exist.');
    res.json({ success: true, data: { id: req.params.id } });
  } catch (error) {
    next(error);
  }
}
