import {html, render} from 'lit-html';
import {styleMap} from 'lit-html/directives/style-map.js';

import {dateInputMask, throttleWrapper} from './utils'
import calendar from './components/Calendar'
import './style/index.css'
import * as styles from './style/index.json'
import getText, {Languages, Dictionary} from './localization'

interface ICustomTheme {
	backgroundColor?: string,
	buttonColor?: string,
	textColor?: string,
}

interface IValues {
	startDate?: Date,
	endDate?: Date,
}

export interface ILocalization{
	local?: Languages
}

interface IRenderAviasalesWidget {
	widgetElement:HTMLElement;
    customTheme:ICustomTheme
	local: Languages
	values: IValues
	constructor: (name: string) => void
	init: (props?:ICustomTheme & ILocalization) => void;
	addDescriptionListener: (func:() => void) => void;
	inputResizeHandler: () => void;
	getTemplate: (props:ICustomTheme) => any;
}

//@ts-ignore
class renderAviasalesWidget implements IRenderAviasalesWidget{
	widgetElement:HTMLElement
    customTheme:ICustomTheme
	local:Languages
	values:IValues
	
	constructor(name:string) {
		this.widgetElement = document.getElementById(name);
		if(!this.widgetElement){
			throw new Error('Не найден элемент для виджета');
		}

		this.customTheme={};
		this.local=Languages.en;
		this.values={}

		this.addResizeListener();
	}


  	init = (props?:ICustomTheme & ILocalization) => {
		const {local, ...theme} = props || {};
		if (Object.keys(theme).length !== 0) {
			this.customTheme = theme;
		}
		//@ts-ignore
		if (local && !Object.values(Languages).includes(local)) {
			throw new Error('Не найден словарь для данного языка');
		}

		this.local = local || this.local;

		render(this.getTemplate(), this.widgetElement);	
	}


	addResizeListener = () => {
		this.containerResizeHandler()
  		const throttleResizeHandler = throttleWrapper<()=>void>(this.containerResizeHandler, 100);
  		window.addEventListener("resize", throttleResizeHandler, false);
	}

	containerResizeHandler = () => {
		const classList = this.widgetElement.classList;
		const width = this.widgetElement.offsetWidth;

		if(width < 290 && !classList.contains(styles.aviasalesWidgetSmall)){
			classList.add(styles.aviasalesWidgetSmall); 
		} else if (width >= 290 && classList.contains(styles.aviasalesWidgetSmall)){
    		classList.remove(styles.aviasalesWidgetSmall);
  		}
	}


	setValue=(e: Event)=>{
		//@ts-ignore
		const {name, valueAsDate} = e.target;
		//@ts-ignore
		this.values[name]=valueAsDate;
	}

	handleSubmit=(e: Event)=>{
		e.preventDefault();
		const { startDate, endDate } = this.values;
		if ( !this.validate() ) {
			alert ('Wrong values')
		} else {
			alert(`Submit from ${startDate.toDateString()} to ${endDate.toDateString()}`)
		}
	}

	validate=()=>{
		const { startDate, endDate } = this.values;
		return endDate>=startDate
	}


	getTemplate = () => {
		const {backgroundColor, textColor, buttonColor} = this.customTheme;
		const widgetStyle = backgroundColor || textColor ? {backgroundColor, color: textColor} : {};
		const calendarHtml = calendar(backgroundColor);

		return html`<div id="aviasales-widget" style=${styleMap(widgetStyle)}>
		  	<div class="${styles.header}">
		      	<p>${getText(this.local, Dictionary.headerFirst)}</p> 
		      	<p>${getText(this.local, Dictionary.headerSecond)}</p>
		  	</div>
		  	<div class="${styles.content}">

		      	<div class="${styles.description}">
		      		<p>${getText(this.local, Dictionary.description)}</p>
		      	</div>
		      
		    
		      	<form class="${styles.form}" @submit=${this.handleSubmit}>
			      	<div class="${styles.dateInput}">
						<input  
						  	placeholder="${getText(this.local, Dictionary.inputPlaceholderFirst)}"
							name='startDate'
							type='date'
							@change=${this.setValue} 
							@keypress=${dateInputMask} 
						>
			          	${calendarHtml}
			      	</div>
			      	<div class="${styles.dateInput}">
						<input 
							placeholder="${getText(this.local, Dictionary.inputPlaceholderSecond)}"
							name='endDate'
							type='date'
							@change=${this.setValue}  
							@keypress=${dateInputMask} 
						>
			          	${calendarHtml}
			      	</div>
			      	<div class="${styles.button}">
				        <button type='submit' style=${styleMap(buttonColor ? {buttonColor} : {})}>
				        	${getText(this.local, Dictionary.button)}
				        </button>
				    </div>
				</form>
		  	</div>
		</div>`;	
	}
}

//@ts-ignore
window.AviasalesInformer=renderAviasalesWidget;