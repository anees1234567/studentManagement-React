import { ENDPOINTS, Instance } from "../../../constants";
import { ResponseType } from "../../Types/serviceTypes";
import { studentListResponseType, studentListType } from "./types";

async function getAllStudents(data:{pageSize:number,pageNumber:number,filter:any}): Promise<ResponseType<studentListResponseType>> {
    const result = await Instance.get(`${ENDPOINTS.GET_ALL_STUDENTS}?pageNumber=${data?.pageNumber}&pageSize=${data?.pageSize}&searchText=${data?.filter?.searchText}`);
    return result.data;
}
async function addOrEditStudentService(data:studentListType): Promise<ResponseType<any>> {
    const result = await Instance.post(`${ENDPOINTS.ADD_STUDENTS}`,data);
    return result.data;
}

async function deleteStudentService(id:string): Promise<ResponseType<any>> {
    const result = await Instance.delete(`${ENDPOINTS.Delete_STUDENTS}/${id}`);
    return result.data;
}



export { getAllStudents,addOrEditStudentService,deleteStudentService};