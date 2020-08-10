import React from "react";
import styled, { keyframes } from "styled-components";
import { LoadingLogo } from "./Icons";

const Animation = keyframes`
    0%{
        transform: rotate(0deg);
    }

    100%{
        transform: rotate(360deg);
    }
`;

const LoadingContain = styled.div`
	animation: ${Animation} 0.7s linear infinite;
	width: 100%;
	text-align: center;
`;

const Loading = () => (
	<LoadingContain>
		<LoadingLogo size={36} />
	</LoadingContain>
);

export default Loading;
