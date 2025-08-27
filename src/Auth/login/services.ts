import { ENDPOINTS, Instance } from "../../../constants";
import { ResponseType } from "../../Types/serviceTypes";

async function login(body:{email: string, password: string}): Promise<ResponseType<any>> {
    const result = await Instance.post(ENDPOINTS.LOGIN, body);
    return result.data;
}


export { login };