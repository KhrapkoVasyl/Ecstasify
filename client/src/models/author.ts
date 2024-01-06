export interface Author {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  avatar: string;
  file: File;
  imageFile: { base64: string; mimetype: string };
}
