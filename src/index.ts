import {html, render} from 'lit-html';
import {styleMap} from 'lit-html/directives/style-map.js';

import {dateInputMask, throttleWrapper} from './Utils'
import calendar from './components/Calendar'
import './index.css'
import * as styles from './index.json'
import getText, {Languages, Dictionary} from './localization'

interface ICustomTheme {
	backgroundColor?: string,
	buttonColor?: string,
	textColor?: string,
}

export interface ILocalization{
	local?: Languages
}

interface IRenderAviasalesWidget {
	widgetElement:HTMLElement;
	descriptionElement:HTMLElement;
    customTheme:ICustomTheme
    local: Languages
	init: () => void;
	addDescriptionListener: (func:() => void) => void;
	inputResizeHandler: () => void;
	getTemplate: (props:ICustomTheme) => any;
}

//@ts-ignore
window.renderAviasalesWidget = class renderAviasalesWidget implements IRenderAviasalesWidget{
    widgetElement:HTMLElement
    descriptionElement:HTMLElement

    customTheme:ICustomTheme
    local:Languages

	constructor(name:string, props?:ICustomTheme & ILocalization) {
		this.widgetElement = document.getElementById(name);
		if(!this.widgetElement){
			throw new Error('Не найден элемент для виджета');
		}

		const {backgroundColor, buttonColor, textColor, local} = props || {};
		this.customTheme = {backgroundColor, buttonColor, textColor};
		//@ts-ignore
		if (local && !Object.values(Languages).includes(local)) {
			throw new Error('Не найден словарь для данного языка');
		}

		this.local = local || Languages.en;
    }

  	init = () => {
		render(this.getTemplate(), this.widgetElement);	
		this.descriptionElement = document.getElementById("aviasales-widget__description");
		const inputs = document.querySelectorAll('input');
		inputs.forEach(input => dateInputMask(input));

		this.addDescriptionListener(this.inputResizeHandler);
		this.inputResizeHandler();
	}


	addDescriptionListener = (func:() => void) => {
  		const throttleResizeHandler = throttleWrapper<()=>void>(this.inputResizeHandler, 100);
  		window.addEventListener("resize", throttleResizeHandler, false);
	}

	inputResizeHandler = () => {
		if(this.widgetElement.offsetWidth < 290){
			this.descriptionElement.className = `${styles.description} ${styles.descriptionOrderBotttom}`; 
		} else {
	  		this.descriptionElement.className = styles.description; 
		}
	}


	getTemplate = () => {
		const {backgroundColor, textColor, buttonColor} = this.customTheme;
		const widgetStyle = backgroundColor || textColor ? {backgroundColor, color: textColor} : {};
		const calendarHtml = calendar(backgroundColor);

		return html`<div id="aviasales-widget" class="${styles.aviasalesWidget}"  style=${styleMap(widgetStyle)}>
		  	<div class="${styles.header}">
		      	<p>${getText(this.local, Dictionary.headerFirst)}</p> 
		      	<p>${getText(this.local, Dictionary.headerSecond)}</p>
		  	</div>
		  	<div class="${styles.flexContentFirst}">

		      	<div id="aviasales-widget__description" class="${styles.description}">
		      		<p>${getText(this.local, Dictionary.description)}</p>
		      	</div>
		      
		    
		      	<form class="${styles.flexContentSecond}">
			      	<div class="${styles.dateInput}">
			          	<input  placeholder="${getText(this.local, Dictionary.inputPlaceholderFirst)}">
			          	${calendarHtml}
			      	</div>
			      	<div class="${styles.dateInput}">
			          	<input placeholder="${getText(this.local, Dictionary.inputPlaceholderSecond)}">
			          	${calendarHtml}
			      	</div>
			      	<div class="${styles.button}">
				        <button style=${styleMap(buttonColor ? {buttonColor} : {})}>
				        	${getText(this.local, Dictionary.button)}
				        </button>
				    </div>
				</form>
		  	</div>
		</div>`;	
	}
}




// let t = new renderAviasalesWidget('aviasales', {local: Languages.ru});
// let t = new renderAviasalesWidget('aviasales');
// t.init();