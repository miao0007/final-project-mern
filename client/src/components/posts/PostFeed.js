import React from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';

import PostItem from './PostItem';

const PostFeed = ({ posts }) => (
	<FlipMove>
		{posts.map((post) => <PostItem key={post._id} post={post} />)}
	</FlipMove>
);

PostFeed.propTypes = {
	posts: PropTypes.array.isRequired
};

export default PostFeed;
