import { ENDPOINTS, Instance } from "../../../constants";
import { ResponseType } from "../../Types/serviceTypes";

async function createUserService(body:{name: string, password: string,email:string}): Promise<ResponseType<any>> {
    const result = await Instance.post(ENDPOINTS.REGISTER, body);
    return result.data;
}


export { createUserService };