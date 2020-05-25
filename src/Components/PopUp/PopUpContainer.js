import React, { useState, useEffect } from "react";
import { useMutation } from "react-apollo-hooks";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import PopUpPresenter from "./PopUpPresenter";
import useInput from "../../Hooks/useInput";
import { TOGGLE_LIKE, ADD_COMMENT } from "../Post/PostQueries";

const PopUpContainer = ({
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
	const [selfComments, setSelfComments] = useState([]);
	const comment = useInput("");
	const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, { variables: { postId: id } });
	const [addCommentMutation, { loading }] = useMutation(ADD_COMMENT, {
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

	const toggleLike = () => {
		toggleLikeMutation();
		if (isLikedS === true) {
			setIsLiked(false);
			setLikeCount(likeCountS - 1);
		} else {
			setIsLiked(true);
			setLikeCount(likeCountS + 1);
		}
	};

	const onKeyPress = async (e) => {
		const { which } = e;
		if (which === 13) {
			e.preventDefault();
			try {
				const {
					data: { addComment },
				} = await addCommentMutation();
				setSelfComments([...selfComments, addComment]);
				comment.setValue("");
			} catch {
				toast.error("Can't send Comment");
			}
		}
	};

	const gapCreatedAt = (value) => {
		const today = new Date();
		const timeValue = new Date(value);

		const betweenTime = Math.floor(
			Math.floor(today.getTime() - timeValue.getTime()) / 1000 / 60
		);
		if (betweenTime < 1) {
			return "방금 전";
		} else if (betweenTime < 60) {
			return `${betweenTime}분 전`;
		}

		const betweenTimeHour = Math.floor(betweenTime / 60);
		if (betweenTimeHour < 24) {
			return `${betweenTimeHour}시간 전`;
		}

		const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
		if (betweenTimeDay < 365) {
			return `${betweenTimeDay}일 전`;
		}

		return `${Math.floor(betweenTimeDay / 365)}년 전`;
	};

	return (
		<PopUpPresenter
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
			onKeyPress={onKeyPress}
			selfComments={selfComments}
			loading={loading}
			gapCreatedAt={gapCreatedAt}
		/>
	);
};

PopUpContainer.propTypes = {
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

export default PopUpContainer;
