import request from "./request";

const ENDPOINT = "api/Book";

const getAll = async (params) => {
  const url = `${ENDPOINT}/list`;
  return request.get(url, { params }).then((res) => {
    return res.data.detail;
  });
};

const getById = async (id) => {
  const url = `${ENDPOINT}/?id=${id}`;
  return request.get(url).then((res) => {
    return res.data.detail;
  });
};

const deleteBook = async (id) => {
  const url = `${ENDPOINT}/Delete/?id=${id}`;
  return request.delete(url).then((res) => {
    return res.data.detail;
  });
};

const save = async (data) => {
  if (data.id) {
    const url = `${ENDPOINT}/Update`;
    return request.put(url, data).then((res) => {
      return res.data;
    });
  } else {
    const url = `${ENDPOINT}/Add`;
    return request.post(url, data).then((res) => {
      return res.data.detail;
    });
  }
};

const bookService = { getAll, getById, deleteBook, save };

export default bookService;
