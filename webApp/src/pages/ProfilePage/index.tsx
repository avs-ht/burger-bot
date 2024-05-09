import { Page } from '$/shared/ui/Page';
import ProfileInfo from '$/widgets/ProfileInfo';

export const ProfilePage = ({ id }: { id: string }) => {
	return (
		<Page>
			<ProfileInfo id={id} />
		</Page>
	);
};
