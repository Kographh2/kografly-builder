export type ClassValue = string | number | boolean | null | undefined | ClassDictionary | ClassArray;
type ClassDictionary = Record<string, unknown>;
type ClassArray = ClassValue[];

function toVal(mix: ClassValue): string {
  let str = "";
  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (Array.isArray(mix)) {
    for (const item of mix) {
      const val = toVal(item);
      if (val) str += (str && " ") + val;
    }
  } else if (typeof mix === "object" && mix) {
    for (const key in mix) {
      if (mix[key]) str += (str && " ") + key;
    }
  }
  return str;
}

export function clsxLite(inputs: ClassValue[]) {
  let output = "";
  for (const input of inputs) {
    const val = toVal(input);
    if (val) output += (output && " ") + val;
  }
  return output;
}
