export enum Languages{
	en = 'en',
	ru = 'ru'
}

export enum Dictionary{
	headerFirst = 'headerFirst',
	headerSecond = 'headerSecond',
	description = 'description',
	inputPlaceholderFirst = 'inputPlaceholderFirst',
	inputPlaceholderSecond = 'inputPlaceholderSecond',
	button = 'button',
}

const RuDictionary : Record<Dictionary, string> = {
	headerFirst: 'Откуда это?',
	headerSecond: 'Почему мы используем это?',
	description: 'Это давно установленный факт, что читатель будет отвлекаться на удобочитаемое содержимое страницы при просмотре ее макета.',
	inputPlaceholderFirst: 'Туда',
	inputPlaceholderSecond: 'Обратно',
	button: 'Поиск',
}

const EnDictionary : Record<Dictionary, string> = {
	headerFirst: 'Where does it come from?',
	headerSecond: 'Why do we use it?',
	description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
	inputPlaceholderFirst: 'Depart date',
	inputPlaceholderSecond: 'Return date',
	button: 'search',
};

export default function getText(locale:Languages, word:Dictionary) : string {
	if(locale === Languages.en){
		return EnDictionary[word];
	}
	return RuDictionary[word];
}