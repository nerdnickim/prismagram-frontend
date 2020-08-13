import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import FatText from "../FatText";
import Avatar from "../Avatart";
import { HeartFull, HeartEmpty, Comment as CommentIcon, Arrow } from "../Icons";
import Loader from "../Loader";
import { Link } from "react-router-dom";

const Post = styled.div`
	${(props) => props.theme.whiteBox};
	user-select: none;
	width: 100%;
	max-width: 600px;
	a {
		color: inherit;
	}
	margin-bottom: 25px;
`;

const Header = styled.header`
	padding: 15px;
	display: flex;
	align-items: center;
`;

const UserColumn = styled.div`
	margin-left: 10px;
`;

const Location = styled.span`
	display: block;
	margin-top: 5px;
	font-size: 12px;
`;

const FilesWrapper = styled.div`
	position: relative;
	overflow: hidden;
`;

const Files = styled.div`
	position: relative;
	display: flex;
	transition: all 0.2s ease-out;
`;

const File = styled.img`
	position: relative;
	min-width: 100%;
	height: 600px;
	background-image: url(${(props) => props.src});
	background-size: cover;
	background-position: center;
`;

const Button = styled.span`
	cursor: pointer;
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

const Buttons = styled.div`
	${Button} {
		&:first-child {
			margin-right: 10px;
		}
	}
	margin-bottom: 10px;
`;

const Timestamp = styled.span`
	font-weight: 400;
	text-transform: uppercase;
	opacity: 0.5;
	display: block;
	font-size: 12px;
	margin: 10px 0px;
	padding-bottom: 10px;
	border-bottom: ${(props) => props.theme.lightGreyColor} 1px solid;
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
	cursor: pointer;
	opacity: ${(props) => (props.currentItem === props.length - 1 ? 0.2 : 1)};
`;

const ArrowLeft = styled.div`
	transform: rotateY(180deg);
	padding-right: 10px;
	cursor: pointer;
	opacity: ${(props) => (props.currentItem === 0 ? 0.2 : 1)};
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
	slideRight,
	slideLeft,
	slideRef,
	currentItem,
}) => (
	<Post>
		<Header>
			<Avatar size="sm" url={avatar} />
			<UserColumn>
				<Link to={`/profile/${username}`}>
					<FatText text={username} />
				</Link>
				<Location>{location}</Location>
			</UserColumn>
		</Header>
		<FilesWrapper>
			<Files ref={slideRef}>
				{files && files.map((file) => <File key={file.id} id={file.id} src={file.url} />)}
			</Files>
			<ArrowContain>
				<ArrowLeft onClick={slideLeft} currentItem={currentItem}>
					<Arrow />
				</ArrowLeft>
				<ArrowRight onClick={slideRight} currentItem={currentItem} length={files.length}>
					<Arrow />
				</ArrowRight>
			</ArrowContain>
		</FilesWrapper>
		<Meta>
			<Buttons>
				<Button onClick={toggleLike}>{isLiked ? <HeartFull /> : <HeartEmpty />}</Button>
				<Button>
					<CommentIcon />
				</Button>
			</Buttons>
			<FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
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
	</Post>
);
