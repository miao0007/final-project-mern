import React from 'react';
import PropTypes from 'prop-types';

const SelectListGroup = ({ name, value, error, info, options, onChange }) => {
	const selectOptions = options.map((option) => (
		<option key={option.label} value={option.value}>
			{option.label}
		</option>
	));
	return (
		<div>
			<select name={name} value={value} onChange={onChange}>
				{selectOptions}
			</select>
			{info && <small>{info}</small>}
			{error && <div>{error}</div>}
		</div>
	);
};

SelectListGroup.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired
};

export default SelectListGroup;
