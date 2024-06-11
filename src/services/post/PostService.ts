import { PostType } from "./PostType";

class PostService {
    private fakePost : Array<PostType> = [
        {
            id: 111,
            title: "Happiness",
            author: "John",
            description: "I am a description of happiness"
        },
        {
            id: 112,
            title: "MIU",
            author: "Dean" ,
            description: "Welcome to MIU"
        },
        {
            id: 113,
            title: " Enjoy Life",
            author: "Jasmine",
            description: "I hope you are enjoying the course"
        }
    ]
    findAll (){
        //pretending this call is being made from the API
        return this.fakePost;
    }
}

export default new PostService();