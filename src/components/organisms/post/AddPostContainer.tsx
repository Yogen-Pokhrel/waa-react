import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import { UserType } from "../../../services/user/UserType";
import UserService from "../../../services/user/UserService";
import { CreatePostType } from "../../../services/post/PostType";
import PostService from "../../../services/post/PostService";

const AddPostContainer = () =>{
    const [users, setUsers] = useState<Array<UserType>>([]);
    const formRef = useRef<HTMLFormElement>(null);

    const getUsers = () =>{
        UserService.findAll().then(data =>{
            setUsers(data.data);
        }).catch(err =>{
            console.error("Error while fetching users" + err.message);
        })
    }

    const submitForm = () => {
        if (!formRef.current) return;

        const formElements = formRef.current.elements as HTMLFormControlsCollection;
        const title = (formElements.namedItem("title") as HTMLInputElement).value;
        const authorId = parseInt((formElements.namedItem("authorId") as HTMLSelectElement).value);
        const content = (formElements.namedItem("content") as HTMLTextAreaElement).value;

        let validationError = "";
        if (title === "") {
            validationError += "Title is required \n";
        }
        if (authorId === -1) {
            validationError += "Author is required \n";
        }
        if (content === "") {
            validationError += "Content is required \n";
        }
        if (validationError.length > 0) {
            alert(validationError);
            return;
        }

        const formValue: CreatePostType = { title, authorId, content };
        PostService.save(formValue).then(data => {
            alert("Post Added Successfully\n Post ID: " + data.data?.id);
            window.location.href = "/";
        }).catch(err => {
            console.error("Error while adding post: " + err.message);
        });
    };


    useEffect(() =>{
        getUsers();
    },[])

    return <div className={styles.mainContainer}>
        <div className={styles.header}><Link to={"/"}>Back</Link><h1>All Posts</h1></div>
        <form ref={formRef} className={styles.formContainer}>
                <div className={styles.formItem}>
                    <label>Title</label>
                    <input type="text" name="title" placeholder="Enter post title" />
                </div>
                <div className={styles.formItem}>
                    <label>Author</label>
                    <select name="authorId" defaultValue="-1">
                        <option value="-1" disabled>Select User</option>
                        {users.map(user => (
                            <option key={"options_" + user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.formItem}>
                    <label>Content</label>
                    <textarea name="content" placeholder="Enter your post content" rows={10}></textarea>
                </div>
                <div className={styles.buttonContainer}>
                    <Link to={"/"}><button>Cancel</button></Link>
                    <button type="button" className={styles.saveButton} onClick={submitForm}>Save</button>
                </div>
            </form>
    </div>
}

export default AddPostContainer;