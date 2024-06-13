import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { UserType } from "../../../services/user/UserType";
import UserService from "../../../services/user/UserService";
import { CreatePostType } from "../../../services/post/PostType";
import PostService from "../../../services/post/PostService";

const AddPostContainer = () =>{
    const [users, setUsers] = useState<Array<UserType>>([]);
    const [formValue, setFormValue] = useState<CreatePostType>({
        title: "",
        authorId: -1,
        content: ""
    })

    const getUsers = () =>{
        UserService.findAll().then(data =>{
            setUsers(data.data);
        }).catch(err =>{
            console.error("Error while fetching users" + err.message);
        })
    }

    const updateForm = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormValue({...formValue, [event.target.name] : event.target.value })
    }

    const submitForm = () =>{
        let validationError = "";
        Object.entries(formValue).forEach(([key,value]) =>{
            if(typeof value == "string" && value == ""){
                validationError += key + " is required \n";
            }else if(value == -1){
                validationError += key + " is required \n";
            }
        })
        if(validationError.length > 0){
            alert(validationError);
            return;
        }

        PostService.save(formValue).then(data => {
            alert("Post Added Successfully\n Post ID: " + data.data?.id);
            window.location.href = "/";
        }).catch(err => {
            console.error("Error while adding post" + err.message);
        })
        
    }


    useEffect(() =>{
        getUsers();
    },[])

    return <div className={styles.mainContainer}>
        <div className={styles.header}><Link to={"/"}>Back</Link><h1>All Posts</h1></div>
        <div className={styles.formContainer}>
            <div className={styles.formItem}>
                <label>Title</label>
                <input type="text" name="title" placeholder="Enter post title" onChange={updateForm} value={formValue.title} />
            </div>
            <div className={styles.formItem}>
                <label>Author</label>
                <select name="authorId" onChange={updateForm} defaultValue={formValue.authorId}>
                    <option value="-1" disabled>Select User</option>
                    {
                        users.map(user => <option key={"options_" + user.id} value={user.id}>{user.name}</option>)
                    }
                </select>
            </div>
            <div className={styles.formItem}>
                <label>Content</label>
                <textarea name="content" placeholder="Enter your post content" onChange={updateForm}  rows={10} defaultValue={formValue.content}></textarea>
            </div>
            <div className={styles.buttonContainer}>
                <Link to={"/"}><button>Cancel</button></Link>
                <button className={styles.saveButton} onClick={submitForm}>Save</button>
            </div>
        </div>
    </div>
}

export default AddPostContainer;