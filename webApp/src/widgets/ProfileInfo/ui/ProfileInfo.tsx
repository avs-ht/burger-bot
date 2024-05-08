import { useTg } from '$/shared/lib/useTg';
import { InfoBlock } from '$/shared/ui/kit/InfoBlock';

export const ProfileInfo = () => {
	const { user } = useTg();

	const userInfo = {
		Имя: user?.first_name || user?.username || '???',
		ID: user?.id || '???',
		'Приглашено друзей': 1,
	};

	return <InfoBlock info={userInfo} />;
};
