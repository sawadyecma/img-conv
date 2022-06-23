import axios, { Axios } from "axios";
import { useEffect, useRef, useState } from "react";
import { useFileConvertor } from "./hooks/file/useFileConvertor";
import { FileRepository } from "./infrastructure/file";

type ObjUrls = {
  before: string;
  after: string;
};

export const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [objUrls, setObjUrls] = useState<ObjUrls>({ before: "", after: "" });
  const fileAnalyzerState = useFileConvertor(file);

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

  const beforeImgObjUrl =
    fileAnalyzerState.status === "success" ? fileAnalyzerState.objUrl : "";

  return (
    <div>
      <button onClick={onFileSelectButtonClick}>ファイル選択</button>
      <input ref={inputRef} type="file" hidden onChange={onFileSelect}></input>
      <hr />
      <div>
        <p>変換前</p>
        <img alt="変換前" src={beforeImgObjUrl} />
      </div>
      <hr />
      <div>
        <p>変換後</p>
        <img alt="変換後" src={objUrls.after} />
      </div>
      <hr />
      <button onClick={onFileUpload}>ファイルアップロード</button>
    </div>
  );
};

export default App;
