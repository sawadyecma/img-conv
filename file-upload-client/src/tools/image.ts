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
