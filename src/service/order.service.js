import request from "./request";

const ENDPOINT = "api/Order";

const placeOrder = async (order) => {
  const url = `${ENDPOINT}/add`;
  return request
    .post(url, order)
    .then((res) => {
      return res.data.detail;
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

const orderService = { placeOrder };

export default orderService;
