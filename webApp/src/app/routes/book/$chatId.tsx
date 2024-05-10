import { createFileRoute } from '@tanstack/react-router';

import { BookPage } from '$/pages/BookPage';

export const Route = createFileRoute('/book/$chatId')({
	component: BookPageComponent,
});

function BookPageComponent() {
	const { chatId } = Route.useParams();
	return <BookPage chatId={chatId} />;
}
