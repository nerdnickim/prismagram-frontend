import React from "react";
import PopUp from "./PopUp";

export default ({
	data: {
		seeFullPost: {
			id,
			user,
			files,
			likeCount,
			isLiked,
			comments,
			createdAt,
			caption,
			location,
		},
	},
}) => {
	return (
		<PopUp
			id={id}
			user={user}
			files={files}
			likeCount={likeCount}
			isLiked={isLiked}
			comments={comments}
			createdAt={createdAt}
			caption={caption}
			location={location}
		/>
	);
};
