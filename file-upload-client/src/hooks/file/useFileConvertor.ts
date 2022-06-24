import { useEffect, useState } from "react";
import {
  convertDataUrlToFile,
  convertObjUrlToImage,
} from "../../tools/file/image";
import { convertPdfObjUrlToDataUrl } from "../../tools/file/pdf";
import { convertExtToPng } from "../../tools/file/ext";

type State =
  | {
      status: "loading";
    }
  | {
      status: "failure";
    }
  | {
      status: "success";
      objUrl: string;
      image: HTMLImageElement;
    };

export const useFileConvertor = (file?: File) => {
  const [state, setState] = useState<State>({ status: "loading" });
  useEffect(() => {
    if (!file) {
      setState({ status: "loading" });
      return;
    }

    let objUrl = URL.createObjectURL(file);

    (async () => {
      if (file?.type === "application/pdf") {
        const pdfDataUrl = await convertPdfObjUrlToDataUrl(objUrl);
        URL.revokeObjectURL(objUrl);
        const pdfFile = await convertDataUrlToFile(
          pdfDataUrl,
          convertExtToPng(file.name)
        );
        objUrl = URL.createObjectURL(pdfFile);
      }

      const image = await convertObjUrlToImage(objUrl);
      setState({ status: "success", objUrl, image });
    })();

    return () => {
      if (objUrl) {
        URL.revokeObjectURL(objUrl);
      }
    };
  }, [file]);

  return state;
};
