import { AxiosInstance } from "axios";
import { serverUrl } from "../config/env";

export class FileRepository {
  constructor(private client: AxiosInstance) {}

  upload(file: File) {
    const headers = { "content-type": "multipart/form-data" };
    const data = new FormData();
    data.append("image", file!);
    this.client.post("/upload", data, { headers, baseURL: serverUrl });
  }
}
