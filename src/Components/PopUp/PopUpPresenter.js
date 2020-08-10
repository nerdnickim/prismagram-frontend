import React from "react";
import styled from "styled-components";

import Loader from "../Loader";
import { HeartFull, HeartEmpty, Comment as CommentIcon, Arrow } from "../Icons";
import Avatar from "../Avatart";
import FatText from "../FatText";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-autosize-textarea/lib";

const PostDetailWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 4;
`;

const PostDetail = styled.div`
	position: relative;
	width: 1000px;
	height: 600px;
	background-color: ${(props) => props.theme.bgColor};
`;

const PostFilesContain = styled.div`
	width: 65%;
	height: 100%;
	position: relative;
	float: left;
	overflow: hidden;
`;

const PostFiles = styled.div`
	position: relative;
	display: flex;
	transition: all 0.2s ease-out;
	height: 100%;
`;

const PostFile = styled.img`
	min-width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center;
`;

const PostInfoContain = styled.div`
	position: relative;
	width: 35%;
	height: 100%;
	float: right;
`;

const Header = styled.header`
	padding: 15px;
	display: flex;
	align-items: center;
	border-bottom: ${(props) => props.theme.lightGreyColor} 1px solid;
	padding-bottom: 10px;
`;

const UserColumn = styled.div`
	margin-left: 10px;
`;

const Location = styled.span`
	display: block;
	margin-top: 5px;
	font-size: 12px;
`;

const Meta = styled.div`
	padding: 15px;
	.loader {
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

const Button = styled.span`
	cursor: pointer;
`;

const Buttons = styled.div`
	${Button} {
		&:first-child {
			margin-right: 10px;
		}
	}
	margin-bottom: 10px;
	border-top: ${(props) => props.theme.lightGreyColor} 1px solid;
	padding-top: 10px;
`;

const Timestamp = styled.span`
	font-weight: 400;
	text-transform: uppercase;
	opacity: 0.5;
	display: block;
	font-size: 12px;
	margin: 10px 0px;
	padding-bottom: 10px;
`;

const Textarea = styled(TextareaAutosize)`
	border: none;
	width: 100%;
	font-size: 14px;
	resize: none;
	&:focus {
		outline: none;
	}
`;

const Comments = styled.ul`
	margin-top: 10px;
`;

const Comment = styled.li`
	margin-bottom: 7px;
	span {
		margin-right: 5px;
	}
`;

const ArrowContain = styled.div`
	position: absolute;
	top: 45%;
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
`;

const ArrowRight = styled.div`
	padding-left: 10px;
`;

const ArrowLeft = styled.div`
	transform: rotateY(180deg);
	padding-right: 10px;
`;

export default ({
	user: { username, avatar },
	location,
	files,
	isLiked,
	likeCount,
	createdAt,
	newComment,
	toggleLike,
	onKeyPress,
	comments,
	selfComments,
	loading,
	gapCreatedAt,
	slideLeft,
	slideRight,
	slideRef,
}) => {
	return (
		<PostDetailWrapper>
			<PostDetail>
				<PostFilesContain>
					<PostFiles ref={slideRef}>
						{files &&
							files.map((file, index) => (
								<PostFile
									key={file.id}
									id={file.id}
									src={file.url}
								/>
							))}
					</PostFiles>
					<ArrowContain>
						<ArrowLeft onClick={slideLeft}>
							<Arrow />
						</ArrowLeft>
						<ArrowRight onClick={slideRight}>
							<Arrow />
						</ArrowRight>
					</ArrowContain>
				</PostFilesContain>
				<PostInfoContain>
					<Header>
						<Avatar size="sm" url={avatar} />
						<UserColumn>
							<Link to={`/${username}`}>
								<FatText text={username} />
							</Link>
							<Location>{location}</Location>
						</UserColumn>
					</Header>
					<Meta>
						{comments && (
							<Comments key={comments.id}>
								{comments.map((comment) => (
									<Comment key={comment.id}>
										<FatText text={comment.user.username} />
										{comment.text}
									</Comment>
								))}
								{selfComments.map((comment) => (
									<Comment key={comment.id}>
										<FatText text={comment.user.username} />
										{comment.text}
									</Comment>
								))}
							</Comments>
						)}
						<Buttons>
							<Button onClick={toggleLike}>
								{isLiked ? <HeartFull /> : <HeartEmpty />}
							</Button>
							<Button>
								<CommentIcon />
							</Button>
						</Buttons>
						<FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
						<Timestamp>{gapCreatedAt(createdAt)}</Timestamp>
						{loading && <Loader />}
						{!loading && (
							<Textarea
								placeholder="add a comment"
								onKeyPress={onKeyPress}
								value={newComment.value}
								onChange={newComment.onChange}
							/>
						)}
					</Meta>
				</PostInfoContain>
			</PostDetail>
		</PostDetailWrapper>
	);
};
