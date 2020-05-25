import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useQuery } from "react-apollo-hooks";
import PopUpBridge from "./PopUpBridge";
import { SEE_POST } from "../SharedQueries";
import Loader from "./Loader";
import { HeartFull, CommentFull, CloseBtn } from "./Icons";

const Overlay = styled.div`
	background-color: rgba(0, 0, 0, 0.6);
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	transition: opacity 0.3s linear;
	svg {
		fill: white;
	}
`;

const Container = styled.div`
	position: relative;
	background-image: url(${(props) => props.bg});
	background-size: cover;
	cursor: pointer;
	&:hover {
		${Overlay} {
			opacity: 1;
		}
	}
`;

const Number = styled.div`
	color: white;
	display: flex;
	align-items: center;
	&:first-child {
		margin-right: 20px;
	}
`;

const NumberText = styled.span`
	margin-left: 8px;
	font-size: 18px;
`;

const PostDetailClose = styled.div`
	position: absolute;
	top: 20px;
	right: 40px;
	cursor: pointer;
	z-index: 5;
`;

const Loading = styled.div`
	position: absolute;
	top: 15%;
	left: 40%;
	z-index: 10;
`;

const SquarePost = ({ likeCount, commentCount, file, id }) => {
	const { data, loading } = useQuery(SEE_POST, { variables: { id } });
	let [postDetail, setPostDetail] = useState(false);

	const postDetailShow = (e) => {
		e.preventDefault();
		if (postDetail === true) {
			setPostDetail(false);
			document.querySelector("body").style.overflow = "";
		} else {
			setPostDetail(true);
			document.querySelector("body").style.overflow = "hidden";
		}
	};

	return (
		<>
			<Container bg={file.url} onClick={postDetailShow}>
				{postDetail === true && loading && (
					<Loading>
						<Loader />
					</Loading>
				)}
				<Overlay>
					<Number>
						<HeartFull />
						<NumberText>{likeCount}</NumberText>
					</Number>
					<Number>
						<CommentFull />
						<NumberText>{commentCount}</NumberText>
					</Number>
				</Overlay>
			</Container>
			{!postDetail && null}
			{!loading && postDetail === true && data && data.seeFullPost && (
				<PopUpBridge data={data} />
			)}
			{!loading && postDetail ? (
				<PostDetailClose onClick={postDetailShow}>
					<CloseBtn />
				</PostDetailClose>
			) : null}
		</>
	);
};

SquarePost.propTypes = {
	likeCount: PropTypes.number.isRequired,
	commentCount: PropTypes.number.isRequired,
	file: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
};

export default SquarePost;
