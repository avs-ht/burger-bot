import { useTg } from '$/shared/lib/useTg';
import { InfoBlock } from '$/shared/ui/kit/InfoBlock';

export const ProfileInfo = ({ id }: { id: string }) => {
	const { user } = useTg();

	const userInfo = {
		Имя: user?.first_name || user?.username || '???',
		ID: user?.id || '???',
		'Приглашено друзей': id,
	};

	return <InfoBlock info={userInfo} />;
};
