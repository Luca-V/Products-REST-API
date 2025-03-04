import User from "../models/User.js";
import Role from "../models/Role.js";

export async function createUser(req, res) {
  try {
    const { username, email, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    const user = new User({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id)
    });

    user.password = await User.encryptPassword(user.password);

    const savedUser = await user.save();

    return res.status(200).json({ _id: savedUser._id, username: savedUser.username, email: savedUser.email, broles: savedUser.roles });
  } catch (error) {
    console.error(error);
  }
};

export async function getUsers(req, res) {
  const users = await User.find();

  return res.json(users);
};

export async function getUser(req, res) {
  const user = await User.findById(req.params.userId);

  return res.json(user);
};