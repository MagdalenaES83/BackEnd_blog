import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";


const {
  readJSON,
  writeJSON,
  writeFile,
  readFile,
  remove,
  createReadStream,
  createWriteStream,
} = fs;

const authorsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/authors.json"
);
const authorsAvatarsFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/authors"
);
const blogPostsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/blogPosts.json"
);
export const blogPostsFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/blogPosts"
);


export const readAuthors = () => readJSON(authorsJSONPath);
export const getAuthorsReadableStream = () => createReadStream(authorsJSONPath);
export const writeAuthors = (content) => writeJSON(authorsJSONPath, content);




export const saveAvatar = (fileName, content) =>
  writeFile(join(authorsAvatarsFolderPath, fileName), content);
export const removeAvatar = (fileName) =>
  remove(join(authorsAvatarsFolderPath, fileName)); // fs-methods


export const readBlogPosts = () => readJSON(blogPostsJSONPath);
export const writeBlogPosts = (content) =>
  writeJSON(blogPostsJSONPath, content);


export const writePDFStream = (path) => createWriteStream(path);
export const readPDFFile = (path) => readFile(path);
export const deletePDFFile = (path) => remove(path);


export const saveCoverCloudinary = new CloudinaryStorage({
  cloudinary,
  params: {
    format: "png",
    folder: "striveBlog/covers",
  },
});

export const saveCover = (fileName, content) =>
  writeFile(join(blogPostsFolderPath, fileName), content);
export const removeCover = (fileName) =>
  remove(join(blogPostsFolderPath, fileName)); // fs method