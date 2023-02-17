import request from "./request";

const ENDPOINT = "api/User";

const getAllUsers = async (params) => {
  const url = `${ENDPOINT}/list`;
  return request.get(url, { params }).then((res) => {
    return res.data.detail;
  });
};

const getAllRoles = async () => {
  const url = `${ENDPOINT}/Roles`;
  return request.get(url).then((res) => {
    return res.data.detail;
  });
};

const getById = async (id) => {
  const url = `${ENDPOINT}?id=${id}`;
  return request.get(url).then((res) => {
    return res.data.detail;
  });
};

const deleteUser = async (id) => {
  const url = `${ENDPOINT}/Delete?id=${id}`;
  return request.delete(url).then((res) => {
    return res.data.detail;
  });
};

const update = async (data) => {
  const url = `${ENDPOINT}`;
  return request.put(url, data).then((res) => {
    return res.data.detail;
  });
};

const updateProfile = async (data) => {
  const url = `${ENDPOINT}`;
  return request.put(url, data).then((res) => {
    return res.data;
  });
};

const userService = {
  getAllUsers,
  getAllRoles,
  getById,
  deleteUser,
  update,
  updateProfile,
};

export default userService;
