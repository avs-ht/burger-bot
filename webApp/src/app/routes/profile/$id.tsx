import { createFileRoute } from '@tanstack/react-router';

import { ProfilePage } from '$/pages/ProfilePage';

export const Route = createFileRoute('/profile/$id')({
	component: ProfilePageRoute,
});

function ProfilePageRoute() {
	const { id } = Route.useParams();

	return <ProfilePage id={id} />;
}
