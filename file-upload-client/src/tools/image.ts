export async function convertObjUrlToImage(
  objUrl: ReturnType<typeof URL.createObjectURL>
) {
  return new Promise<HTMLImageElement>((resolve) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.src = objUrl;
  });
}

type GetImagePropsReturnType = {
  width: number;
  height: number;
};

export function getImgProps(img?: HTMLImageElement): GetImagePropsReturnType {
  if (img) {
    return {
      width: img.width,
      height: img.height,
    };
  }
  return {
    width: 0,
    height: 0,
  };
}

/** @returns dataurl */
export function resizeImg(
  img: HTMLImageElement,
  width: number,
  height: number,
  mimeType: string = "image/png"
) {
  const canvas = document.createElement("canvas");
  // specify canvas area length
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("failed to getContext from canvas");
  }
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL(mimeType);
}

export async function convertDataUrlToFile(
  dataUrl: string,
  filename: string = "no-name"
): Promise<File> {
  const blob = await (await fetch(dataUrl)).blob();
  return new File([blob], filename);
}
