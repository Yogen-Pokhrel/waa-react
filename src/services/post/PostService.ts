import { ApiResponse } from "../api/ApiResponse";
import axiosInstance from "../api/axiosInstance";
import { CreatePostType, PostType } from "./PostType";

class PostService {
    private endPoint = "posts"
    
    save(postData: CreatePostType){
        return axiosInstance.post<ApiResponse<PostType>>(this.endPoint, postData).then((res) =>{
            return res.data
        }).catch((err) =>{
            console.log("Error in " + this.constructor.name + " Message: "+ err.message)
            throw err;
        })
    }

    update(id: number, postData: CreatePostType){
        return axiosInstance.put<ApiResponse<PostType>>(this.endPoint+"/"+id, postData).then((res) =>{
            return res.data
        }).catch((err) =>{
            console.log("Error in " + this.constructor.name + " Message: "+ err.message)
            throw err;
        })
    }

    findAll (){
        return axiosInstance.get<ApiResponse<Array<PostType>>>(this.endPoint).then((res) =>{
            return res.data
        }).catch((err) =>{
            console.log("Error in " + this.constructor.name + " Message: "+ err.message)
            throw err;
        })
    }

    findById(id: number){
        return axiosInstance.get<ApiResponse<PostType>>(this.endPoint + "/"+id).then((res) =>{
            return res.data
        }).catch((err) =>{
            console.log("Error in " + this.constructor.name + " Message: "+ err.message)
            throw err;
        })
    }

    delete(id: number){
        return axiosInstance.delete<ApiResponse<PostType>>(this.endPoint + "/"+id).then((res) =>{
            return res.data
        }).catch((err) =>{
            console.log("Error in " + this.constructor.name + " Message: "+ err.message)
            throw err;
        })
    }
}

export default new PostService();