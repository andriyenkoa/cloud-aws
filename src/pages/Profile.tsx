import { useAuthenticator } from '@aws-amplify/ui-react';

const Profile = () => {
	const { user, signOut } = useAuthenticator((context) => [context.user]);
	return (
		<div>
			<h2>Welcome, {user.username}!</h2>
			<button onClick={signOut}>Sign Out</button>
		</div>
	);
};

export default Profile;
