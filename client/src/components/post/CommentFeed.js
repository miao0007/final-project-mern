import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import FlipMove from 'react-flip-move';

const CommentFeed = ({ comments, postId }) => (
	<FlipMove>
		{comments.map((comment) => (
			<CommentItem key={comment._id} comment={comment} postId={postId} />
		))}
	</FlipMove>
);

CommentFeed.propTypes = {
	comments: PropTypes.array.isRequired,
	postId: PropTypes.string.isRequired
};

export default CommentFeed;
