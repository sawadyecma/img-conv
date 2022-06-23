import axios from "axios";
import { useRef, useState } from "react";
import { useFileConvertor } from "./hooks/file/useFileConvertor";
import { FileRepository } from "./infrastructure/file";
import { getImgProps, resizeImg } from "./tools/image";

export const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
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
  const imgProps = getImgProps(
    fileAnalyzerState.status === "success" ? fileAnalyzerState.image : undefined
  );

  const afterImgDataUrl =
    fileAnalyzerState.status === "success"
      ? resizeImg(fileAnalyzerState.image, 100, 100)
      : "";

  return (
    <div>
      <button onClick={onFileSelectButtonClick}>ファイル選択</button>
      <input ref={inputRef} type="file" hidden onChange={onFileSelect}></input>
      <hr />
      <div>
        <p>変換前</p>
        <img alt="変換前" src={beforeImgObjUrl} />
        <div>
          <span>幅: {imgProps.width}</span>
          &nbsp;
          <span>高さ: {imgProps.height}</span>
        </div>
      </div>
      <hr />
      <div>
        <p>変換後</p>
        <img alt="変換後" src={afterImgDataUrl} />
      </div>
      <hr />
      <button onClick={onFileUpload}>ファイルアップロード</button>
    </div>
  );
};

export default App;
