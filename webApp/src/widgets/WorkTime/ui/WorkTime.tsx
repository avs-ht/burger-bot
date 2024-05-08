import { InfoBlock } from '$/shared/ui/kit/InfoBlock';

const WORK_TIME = {
	Понедельник: '00:00 - 23:59',
	Вторник: '00:00 - 23:59',
	Среда: '00:00 - 23:59',
	Четверг: '00:00 - 23:59',
	Пятница: '00:00 - 23:59',
	Суббота: '00:00 - 23:59',
	Воскресенье: '00:00 - 23:59',
};
export const WorkTime = () => {
	return <InfoBlock title="Прием заказов осуществляется" info={WORK_TIME} />;
};
