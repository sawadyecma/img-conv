// convert filename extention xxx to png
export function convertExtToPng(filename: string = "noname.png"): string {
  return filename.split(".").slice(0, -1).join(".") + ".png";
}
