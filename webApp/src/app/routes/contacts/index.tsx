import { createFileRoute } from '@tanstack/react-router';

import { ContactsPage } from '$/pages/ContactsPage';

export const Route = createFileRoute('/contacts/')({
	component: ContactsPage,
});
