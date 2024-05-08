import { Page } from '$/shared/ui/Page';
import Contacts from '$/widgets/Contacts';
import Map from '$/widgets/Map';
import WorkTime from '$/widgets/WorkTime';

export const ContactsPage = () => {
	return (
		<Page>
			<Map />
			<div className="mb-5">
				<Contacts />
			</div>
			<WorkTime />
		</Page>
	);
};
