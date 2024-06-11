import { useEffect, useState } from "react"
import { PostType } from "../../../services/post/PostType"
import PostService from "../../../services/post/PostService";
import { Post } from "../../atoms/post/Post";
import styles from "./styles.module.scss";

export const PostContainer = () =>{
    const [posts, setPosts] = useState<Array<PostType>>([]);
    const [title, setTitle] = useState<string>("");
    const [postSelected, setSelectedPost] = useState<PostType | null>();
    useEffect(() =>{
        setPosts(PostService.findAll());
    },[posts, setPosts])

    const update = () =>{
        const newPostsSet = [...posts];
        newPostsSet[0].title = title;
        setPosts(newPostsSet);
    }

    const readPost = (post: PostType) =>{
        setSelectedPost(post);
    }

    return <>
    <div className={styles.postContainer}>
        {
            posts.map((post) => <div key={"post_" + post.id}>
                <Post post={post} readPost={readPost} />
            </div>)
        }
    </div>
    <div className={styles.inputContainer}>
        <input name="post-title" type="text" value={title}  onChange={(e) => setTitle(e.target.value)} />
        <button onClick={update}>Update Title</button>
    </div>
    {
        postSelected && <div className={styles.descriptionContainer}>
            <span onClick={() => setSelectedPost(null)} className={styles.closeButton} title="Close"><svg x="0px" y="0px" fill="white" width="20" height="20" viewBox="0 0 50 50">
                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                </svg>
            </span>
            <h3 className={styles.title}>{postSelected.title}</h3>
            <div className={styles.author}>{postSelected.author}</div>
            <div className={styles.content}>{postSelected.description}</div>
        </div>
    }
    </>
}