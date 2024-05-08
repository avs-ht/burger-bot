import { InfoBlock } from '$/shared/ui/kit/InfoBlock';

const CONTACTS = {
	Телефон: '+7(999)999-99-99',
	Телеграм: '@test',
	Вконтакте: 'test',
	Вебсайт: 'google.com',
	Почта: 'test@gmail.com',
};
export const Contacts = () => {
	return <InfoBlock title="Контактная информация" info={CONTACTS} />;
};
