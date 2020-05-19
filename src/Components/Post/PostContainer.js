import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";

const PostContainer = ({
	id,
	user,
	files,
	likeCount,
	isLiked,
	comments,
	createdAt,
	caption,
	location,
}) => {
	const [isLikedS, setIsLiked] = useState(isLiked);
	const [likeCountS, setLikeCount] = useState(likeCount);
	const [currentItem, setCurrentItem] = useState(0);
	const comment = useInput("");
	const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, { variables: { postId: id } });
	const [addCommentMutation] = useMutation(ADD_COMMENT, {
		variables: { postId: id, text: comment.value },
	});
	const slide = () => {
		const totalFiles = files.length;
		if (currentItem === totalFiles - 1) {
			setTimeout(() => setCurrentItem(0), 2000);
		} else {
			setTimeout(() => setCurrentItem(currentItem + 1), 2000);
		}
	};

	useEffect(() => {
		slide();
	}, [currentItem]);

	const toggleLike = async () => {
		toggleLikeMutation();
		if (isLikedS === true) {
			setIsLiked(false);
			setLikeCount(likeCountS - 1);
		} else {
			setIsLiked(true);
			setLikeCount(likeCountS + 1);
		}
	};

	return (
		<PostPresenter
			user={user}
			files={files}
			likeCount={likeCountS}
			isLiked={isLikedS}
			comments={comments}
			createdAt={createdAt}
			newComment={comment}
			setIsLiked={setIsLiked}
			setLikeCount={setLikeCount}
			caption={caption}
			location={location}
			currentItem={currentItem}
			toggleLike={toggleLike}
		/>
	);
};

PostContainer.propTypes = {
	id: PropTypes.string.isRequired,
	user: PropTypes.shape({
		id: PropTypes.string.isRequired,
		avatar: PropTypes.string,
		username: PropTypes.string.isRequired,
	}).isRequired,
	files: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		})
	).isRequired,
	likeCount: PropTypes.number,
	isLiked: PropTypes.bool.isRequired,
	comments: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
			user: PropTypes.shape({
				id: PropTypes.string.isRequired,
				username: PropTypes.string.isRequired,
			}).isRequired,
		})
	).isRequired,
	createdAt: PropTypes.string.isRequired,
	caption: PropTypes.string.isRequired,
	location: PropTypes.string,
};

export default PostContainer;