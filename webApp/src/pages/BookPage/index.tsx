import BookTable from '$/features/BookTable';
import { Page } from '$/shared/ui/Page';

export const BookPage = ({ chatId }: { chatId: string }) => (
	<Page>
		<BookTable chatId={chatId} />
	</Page>
);
