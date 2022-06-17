import axios from "axios";
import { useRef, useState } from "react";

export const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);

  const onFileSelectButtonClick = () => {
    inputRef.current?.click();
  };
  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    setFile(files.item(0) ?? undefined);
    e.target.value = "";
  };

  const onFileUpload = () => {
    const headers = { "content-type": "multipart/form-data" };
    const serverUrl = "http://localhost:8080";
    const data = new FormData();
    data.append("image", file!);
    axios.post("/upload", data, { headers, baseURL: serverUrl });
  };

  return (
    <div>
      React App By Vite
      <button onClick={onFileSelectButtonClick}>ファイル選択</button>
      <input ref={inputRef} type="file" hidden onChange={onFileSelect}></input>
      <button onClick={onFileUpload}>ファイルアップロード</button>
    </div>
  );
};

export default App;
