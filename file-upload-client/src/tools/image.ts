export const convertObjUrlToImage = async (
  objUrl: ReturnType<typeof URL.createObjectURL>
) => {
  return new Promise<HTMLImageElement>((resolve) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.src = objUrl;
  });
};
