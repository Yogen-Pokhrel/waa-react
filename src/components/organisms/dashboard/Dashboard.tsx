import { PostProvider } from "../../../contexts/PostContext";
import { PostContainer } from "../post/PostContainer";

const Dashboard = () => {
    return <PostProvider>
        <PostContainer />
    </PostProvider>
}

export default Dashboard;