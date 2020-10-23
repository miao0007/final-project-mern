import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

import styled from 'styled-components';
import { Button, Card, Grid, Icon, Image } from 'semantic-ui-react';

class PostItem extends Component {
	onDeleteClick(id) {
		this.props.deletePost(id);
	}

	onLikeClick(id) {
		this.props.addLike(id);
	}

	onUnlikeClick(id) {
		this.props.removeLike(id);
	}

	findUserLike(likes) {
		const { auth } = this.props;
		if (likes.filter((like) => like.user === auth.user.id).length > 0) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		const { post, auth, showActions } = this.props;

		return (
			<Spacing>
				<Grid centered columns={1}>
					<Grid.Column>
						<Card.Group>
							<Card fluid>
								<Card.Content>
									<br />
									<Image src={post.avatar} floated="right" size="mini" />
									<Card.Header>{post.name}</Card.Header>
									<Card.Description as="h2" textAlign="center">
										{post.text}
									</Card.Description>
									<br />
									<div>
										{showActions ? (
											<SpanSpacing>
												<button
													onClick={this.onLikeClick.bind(this, post._id)}
													type="button"
												>
													<Icon name="thumbs up" />
												</button>
												<SpanSpacing>{post.likes.length}</SpanSpacing>
												<button
													onClick={this.onUnlikeClick.bind(this, post._id)}
													type="button"
												>
													<Icon name="thumbs down" />
												</button>
												<SpanSpacing>
													<br />
													<Button
														size="small"
														basic
														color="blue"
														as={Link}
														to={`/post/${post._id}`}
													>
														Comments
													</Button>
												</SpanSpacing>
												{post.user === auth.user.id ? (
													<Button
														basic
														color="red"
														onClick={this.onDeleteClick.bind(this, post._id)}
														type="button"
													>
														Delete
													</Button>
												) : null}
											</SpanSpacing>
										) : null}
									</div>
								</Card.Content>
							</Card>
						</Card.Group>
					</Grid.Column>
				</Grid>
			</Spacing>
		);
	}
}

PostItem.defaultProps = {
	showActions: true
};

PostItem.propTypes = {
	deletePost: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ deletePost, addLike, removeLike }
)(PostItem);

const Spacing = styled.div`
	margin-top: 3rem;
`;

const SpanSpacing = styled.span`
	padding: 4px;
`;
