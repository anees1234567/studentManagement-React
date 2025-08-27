import { Delete } from "@mui/icons-material";
import axios from "axios";



const API_URL = import.meta.env.VITE_API_URL;


const ENDPOINTS = {
 // Auth based Api

  LOGIN: "/user/loginUser",
  REGISTER: "/user/createUser",
  REFRESH_TOKEN: "/auth/refresh",

//   students  based Api

  GET_ALL_STUDENTS: "/students/getAllStudents",
  ADD_STUDENTS: "/students/addstudent",
  Delete_STUDENTS: "/students/deleteStudent",
};

const STORAGE_KEYS = {
  TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
};

const Instance = axios.create({
    baseURL: API_URL,
})
export { API_URL , ENDPOINTS, STORAGE_KEYS ,Instance};