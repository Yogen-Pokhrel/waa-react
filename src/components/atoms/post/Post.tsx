import { PostType } from "../../../services/post/PostType";
import styles from "./styles.module.scss";

export const Post = ({post, readPost}: {post: PostType, readPost: (post: PostType) => void}) =>{
    return <div className={styles.post} onClick={() => readPost(post)}>
        <p>{post.id}</p>
        <h3>{post.title}</h3>
        <p>{post.author}</p>
    </div>
}