import React from 'react';
import PropTypes from 'prop-types';

const InputGroup = ({ name, placeholder, value, error, onChange }) => {
	return (
		<div>
			<textarea
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
			/>
			{error && <div>{error}</div>}
		</div>
	);
};

InputGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	icon: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
	type: 'text'
};

export default InputGroup;
