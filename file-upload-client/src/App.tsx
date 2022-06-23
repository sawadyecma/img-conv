import axios, { Axios } from "axios";
import { useRef, useState } from "react";
import { FileRepository } from "./infrastructure/file";

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
    const fileRepository = new FileRepository(axios.create());
    fileRepository.upload(file!);
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
