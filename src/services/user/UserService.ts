import { ApiResponse } from "../api/ApiResponse";
import axiosInstance from "../api/axiosInstance";
import { UserType } from "./UserType";

class UserService {
    private endPoint = "users"
    findAll (){
        return axiosInstance.get<ApiResponse<Array<UserType>>>(this.endPoint).then((res) =>{
            return res.data
        }).catch((err) =>{
            console.error(err.message);
            return err.data as ApiResponse<Array<UserType>>
        })
    }
}

export default new UserService();