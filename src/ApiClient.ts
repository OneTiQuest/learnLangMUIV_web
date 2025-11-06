export default class Api {
  static host: string = "/api";
  static headers: { [key in string]: string } = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  static setHeader(name: string, value: string) {
    Api.headers[name] = value;
  }

  static unsetHeader(name: string) {
    delete Api.headers[name];
  }

  static async get(url: string) {
    return Api._send_request(url, { method: "GET" });
  }

  static async post(url: string, data?: object) {
    return Api._send_request(url, { method: "POST", body: JSON.stringify(data) });
  }

  static async put(url: string, data?: object) {
    return Api._send_request(url, { method: "PUT", body: JSON.stringify(data) });
  }

  static async patch(url: string, data?: object) {
    return Api._send_request(url, { method: "PATCH", body: JSON.stringify(data) });
  }

  static async delete(url: string) {
    return Api._send_request(url, { method: "DELETE" });
  }

  static async send_file(file: File) {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          const result = await Api._send_request(`/files/`, {
            method: "POST",
            body: JSON.stringify({ file: reader.result })
          });
          res(result);
        } catch (err) {
          rej(err);
        }
      };
    });
  }

  static async get_file(file_name: string) {
    return Api._send_request(`/files/${file_name}`, { method: "GET" });
  }

  static async _send_request(url: string, config: RequestInit): Promise<any> {
    const result = await fetch(`${Api.host}${url}`, {
      ...config,
      headers: {
        ...Api.headers,
        ...config.headers
      }
    });
    return result.json();
  }
}
