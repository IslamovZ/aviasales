export enum Languages{
	en = 'en',
	ru = 'ru'
}

export enum Dictionary{
	headerFirst,
	headerSecond,
	description,
	inputPlaceholderFirst,
	inputPlaceholderSecond,
	button
}

const RuDictionary : Record<Dictionary, string> = {
	[Dictionary.headerFirst]: 'Откуда это?',
	[Dictionary.headerSecond]: 'Почему мы используем это?',
	[Dictionary.description]: 'Это давно установленный факт, что читатель будет отвлекаться на удобочитаемое содержимое страницы при просмотре ее макета.',
	[Dictionary.inputPlaceholderFirst]: 'Туда',
	[Dictionary.inputPlaceholderSecond]: 'Обратно',
	[Dictionary.button]: 'Поиск',
}

const EnDictionary : Record<Dictionary, string> = {
	[Dictionary.headerFirst]: 'Where does it come from?',
	[Dictionary.headerSecond]: 'Why do we use it?',
	[Dictionary.description]: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
	[Dictionary.inputPlaceholderFirst]: 'Depart date',
	[Dictionary.inputPlaceholderSecond]: 'Return date',
	[Dictionary.button]: 'search',
};

export default function getText(locale:Languages, word:Dictionary) : string {
	if(locale === Languages.en){
		return EnDictionary[word];
	}
	return RuDictionary[word];
}