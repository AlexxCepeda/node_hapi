import userService from "../services/user.services.js";

async function getUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    return res.send({ success: true, payload: users });
  } catch (error) {
    console.error("Error in Controller:", error.message);
    return res.status(500).send(error.message);
  }
}

async function getUserById(req, res) {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(id);

    if (user.length === 0) {
      return res.status(404).json({ success: true, message: "User not found" });
    }

    return res.json({ success: true, payload: user });
  } catch (error) {
    console.error("Error in Controller:", error.message);
    return res.status(500).send(error.message);
  }
}

async function createUser(req, res) {
  const data = req.body;
  try {
    const user = await userService.createUser(data);

    return res.status(201).json({ success: true, payload: user });
  } catch (error) {
    console.error("Error in Controller:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
}

async function deleteUserById(req, res) {
  try {
    const { id } = req.params;

    const { rowCount } = await userService.deleteUserById(id);

    if (rowCount === 0) {
      return res.status(404).json({ success: true, message: "User not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error in Controller:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
}

async function updateUserById(req, res) {
  try {
    const { rowCount, rows } = await userService.updateUserById(
      req.params.id,
      req.body
    );
    if (rowCount === 0) {
      return res.status(404).json({ success: true, message: "User not found" });
    }
    return res.json({ success: true, payload: rows[0] });
  } catch (error) {
    console.error("Error in Controller:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export default {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};
