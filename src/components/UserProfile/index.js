import React from 'react';
import Profile from './profile';

const UserProfile = (props) => {
	if (global.isServerSide) {
		return null;
	}
	return (
		<Profile
			username={props.match.params.username}
		/>
	);
};

export default UserProfile;
