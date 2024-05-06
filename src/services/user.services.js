import userRepository from "../repository/user.repository.js";

async function getAllUsers() {
  try {
    const users = await userRepository.getUsers();
    return users;
  } catch (error) {
    // Handle the error, such as logging it or throwing a custom error
    throw new Error(error.message);
  }
}

async function getUserById(id) {
  try {
    const user = await userRepository.getUserById(id);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteUserById(id) {
  try {
    const user = await userRepository.deleteUserById(id);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createUser(payload) {
  try {
    const user = await userRepository.createUser(payload);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function updateUserById(id, payload) {
  try {
    const user = await userRepository.patchUserById(id, payload);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};
