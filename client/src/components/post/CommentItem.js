import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteComment } from '../../actions/postActions';

import { Button, Card, Container, Image } from 'semantic-ui-react';

class CommentItem extends Component {
	onDeleteClick(postId, commentId) {
		this.props.deleteComment(postId, commentId);
	}

	render() {
		const { comment, postId, auth } = this.props;

		return (
			<Container>
				<Card.Group>
					<Card fluid>
						<Image src={comment.avatar} alt="" floated="right" size="mini" />

						<Card.Content>
							<Card.Header>{comment.name}</Card.Header>
							<Card.Description textAlign="center">
								{comment.text}
							</Card.Description>

							{comment.user === auth.user.id ? (
								<Button
									basic
									color="red"
									onClick={this.onDeleteClick.bind(this, postId, comment._id)}
									type="button"
								>
									Delete
								</Button>
							) : null}
						</Card.Content>
					</Card>
				</Card.Group>
			</Container>
		);
	}
}

CommentItem.propTypes = {
	deleteComment: PropTypes.func.isRequired,
	comment: PropTypes.object.isRequired,
	postId: PropTypes.string.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ deleteComment }
)(CommentItem);
