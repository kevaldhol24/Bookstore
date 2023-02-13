import request from "./request";

const ENDPOINT = "api/cart";

const add = async (data) => {
  const url = `${ENDPOINT}/add`;
  return request
    .post(url, data)
    .then((res) => {
      return res.data.detail;
    })
    .catch((e) => {
      return Promise.reject(e.response);
    });
};

const getList = async (id) => {
  const url = `${ENDPOINT}/list?UserId=${id}`;
  return request.get(url).then((res) => {
    return res.data.detail;
  });
};

const updateItem = async (data) => {
  const url = `${ENDPOINT}/Update`;
  return request
    .put(url, data)
    .then((res) => {
      return res.data.detail;
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

const removeItem = async (id) => {
  const url = `${ENDPOINT}?id=${id}`;
  return request
    .delete(url)
    .then((res) => {
      return res.data.detail;
    })
    .catch((e) => {
      return e;
    });
};

const cartService = { add, getList, updateItem, removeItem };

export default cartService;
