import { ReactNode, createContext, useContext, useState } from "react";
import { PostType } from "../services/post/PostType";

type PostContextType = {
    postSelected: PostType | null;
    setSelectedPost: (post: PostType | null) => void;
}

export const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
    const [postSelected, setSelectedPost] = useState<PostType | null>(null);

    return (
        <PostContext.Provider value={{ postSelected, setSelectedPost }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePostContext = () => {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error('usePostContext must be used within a PostProvider');
    }
    return context;
};