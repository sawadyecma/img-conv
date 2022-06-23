import { useEffect, useState } from "react";
import { convertObjUrlToImage } from "../../tools/image";

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

    const objUrl = URL.createObjectURL(file);
    (async () => {
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
