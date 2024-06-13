import { PostType } from "../../../services/post/PostType";
import styles from "./styles.module.scss";

export const Post = ({post, readPost}: {post: PostType, readPost: (postId: number) => void}) =>{
    return <div className={styles.post} onClick={() => readPost(post.id)}>
        <p>{post.id}</p>
        <h3>{post.title}</h3>
        <p>{post.author?.name}</p>
    </div>
}