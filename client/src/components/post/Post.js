import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';

import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions';

class Post extends Component {
	UNSAFE_componentDidMount() {
		this.props.getPost(this.props.match.params.id);
	}

	render() {
		const { post, loading } = this.props.post;
		let postContent;

		if (post === null || loading || Object.keys(post).length === 0) {
			postContent = <Spinner />;
		} else {
			postContent = (
				<div>
					<PostItem post={post} showActions={false} />
					<br />
					<CommentFeed postId={post._id} comments={post.comments} />
					<br />
					<CommentForm postId={post._id} />
				</div>
			);
		}

		return (
			<div>
				<Link to="/discuss"><span className='back'>Back To Feed</span></Link>
				{postContent}
			</div>
		);
	}
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	post: state.post
});

export default connect(
	mapStateToProps,
	{ getPost }
)(Post);
