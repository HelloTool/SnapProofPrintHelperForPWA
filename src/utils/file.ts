export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsDataURL(file);
  });
}

interface FilePickerOptions {
  accept: string;
  multiple?: boolean;
}

export function pickFiles({ accept, multiple = false }: FilePickerOptions): Promise<FileList | null> {
  return new Promise((resolve, reject) => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = accept;
      input.multiple = multiple;
      input.style.display = 'none';
      input.onchange = () => {
        resolve(input.files);
      };
      input.click();
    } catch (e) {
      reject(e);
    }
  });
}
