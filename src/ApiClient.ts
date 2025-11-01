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

  static async _send_request(url: string, config: RequestInit): Promise<any> {
    const result = await fetch(`${Api.host}${url}`, {
      ...config,
      headers: {
        ...Api.headers,
        ...config.headers
      }
    });
    return {
      ok: result.ok,
      ...(await result.json())
    }
  }
}
