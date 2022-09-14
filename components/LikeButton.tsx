import { useState, useEffect, VoidFunctionComponent } from "react";
import { NextPage } from "next";
import { MdFavorite } from "react-icons/md";

import userAuthStore from "../store/authStore";
import useAuthStore from "../store/authStore";

interface IProps {
    likes: any[];
    handleLike: () => void;
    handleDislike: () => void;
}

const LikeButton = ({ likes, handleLike, handleDislike }: IProps) => {
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const { userProfile }: any = useAuthStore();
    const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

    useEffect(() => {
        if (filterLikes?.length > 0) {
            setAlreadyLiked(true);
        } else {
            setAlreadyLiked(false);
        }
    }, [filterLikes, likes]);

    return (
        <div className="gap-6">
            <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
                {alreadyLiked ? (
                    <div
                        className="bg-primary rounded-full p-2 md:p-4 text-[#F51997]"
                        onClick={handleDislike}
                    >
                        <MdFavorite className="text-lg md:text-2xl" />
                    </div>
                ) : (
                    <div
                        className="bg-primary rounded-full p-2 md:p-4"
                        onClick={handleLike}
                    >
                        <MdFavorite className="text-lg md:text-2xl" />
                    </div>
                )}
                <p className="text-md font-semibold">{likes?.length || 0}</p>
            </div>
        </div>
    );
};

export default LikeButton;
