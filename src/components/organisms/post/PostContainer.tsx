import { useContext, useEffect, useState } from "react"
import { PostType } from "../../../services/post/PostType"
import PostService from "../../../services/post/PostService";
import { Post } from "../../atoms/post/Post";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { PostContext, usePostContext } from "../../../contexts/PostContext";

export const PostContainer = () => {
    const [posts, setPosts] = useState<Array<PostType>>([]);
    const { postSelected, setSelectedPost } = usePostContext();

    const getPosts = () => {
        PostService.findAll().then(data => {
            setPosts(data.data)
        }).catch(err => {
            console.error(err.message);
        })
    }
    useEffect(() => {
        getPosts();
    }, [])

    const readPost = (postId: number) => {
        PostService.findById(postId).then(data => {
            setSelectedPost(data.data);
        }).catch(err => {
            console.error(err.message);
        })
    }

    const deletePost = (postId: number) => {
        const confirmation: boolean = confirm("Are you sure you want to delete this record?")
        if (confirmation) {
            PostService.delete(postId).then(() => {
                getPosts();
                alert("Post Deleted Successfully");
                setSelectedPost(null)
            }).catch(err => {
                console.error(err.message);
            })
        }
    }

    return <div className={styles.mainContainer}>
        <div className={styles.header}><h1>All Posts</h1><Link to={"/post/add"}><button>Add Post</button></Link></div>
        {
            (posts.length == 0) ?
            <div className={styles.empty}> 
                <div>No Posts Found </div>
                <div><Link to={"/post/add"}><button>Add Post</button></Link></div>
            </div>
            :        <div className={styles.postContainer}>
            {
                posts.map((post) => <div key={"post_" + post.id}>
                    <Post post={post} readPost={readPost} />
                </div>)
            }
        </div>
        }
        {
            postSelected && <div className={styles.descriptionContainer}>
                <span onClick={() => setSelectedPost(null)} className={styles.closeButton} title="Close"><svg x="0px" y="0px" fill="white" width="20" height="20" viewBox="0 0 50 50">
                    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                </svg>
                </span>
                <h3 className={styles.title}>{postSelected.title}</h3>
                <div className={styles.author}>{postSelected.author?.name}</div>
                <div className={styles.content}>{postSelected.content}</div>
                <div className={styles.buttonContainer}>
                    <Link to={"/post/edit/"+ postSelected.id}><button>Edit</button></Link>
                    <button onClick={() => deletePost(postSelected.id)}>Delete</button>
                </div>
            </div>
        }
    </div>
}