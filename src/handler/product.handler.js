//const host = "http://localhost:3000";
const host = "https://lamiroca.vercel.app";

class ProductHandler {
  constructor() {}

  async get(page) {
    const request = await fetch(`${host}/api/products?page=${page}`);
    const response = await request.json();
    return response;
  }

  async getFiltered(page, value, type) {
    if (type === "none") {
      const request = await fetch(`${host}/api/products?page=${page}`);
      const response = await request.json();
      return response;
    } else if (type === "category") {
      const request = await fetch(
        `${host}/api/products?page=${page}&value=${value}`
      );
      const response = await request.json();
      return response;
    } else {
      const request = await fetch(
        `${host}/api/products?page=${page}&value=${value}&type=regex`
      );
      const response = await request.json();
      return response;
    }
  }

  async getByPid(pid) {
    const request = await fetch(`${host}/api/products/${pid}`);
    const response = await request.json();
    return response;
  }

  async handleLogin(user, password) {
    const data = {
      user,
      password,
    };
    const request = await fetch(
      `${host}/api?user=${user}&password=${password}`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const response = await request.json();
    return response;
  }

  async pay(cart) {
    const request = await fetch(`${host}/api/checkout`, {
      method: "POST",
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const response = await request.json();
    if (response) {
      return response;
    } else {
      return false;
    }
  }
}

const productClass = new ProductHandler();
export default productClass;
