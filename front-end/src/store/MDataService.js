import http from "../http-common";

class MDataService {
    sendArquivo(data) {
    return http.post("/addArquivo", data);

  }
}
export default new MDataService();