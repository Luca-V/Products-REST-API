import Role from "../models/Role.js";
import User from "../models/User.js";
import { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } from "../config.js";

export async function createRoles() {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save()
    ]);
  } catch (error) {
    console.error(error);
  }
};

export async function createAdmin() {
  const userFound = await User.findOne({ email: ADMIN_EMAIL });
  
  if (userFound) return;

  const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });

  const newUser = new User({
    username: ADMIN_USERNAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    roles: roles.map((role) => role._id),
  });

  newUser.save()
};

createRoles();
createAdmin();