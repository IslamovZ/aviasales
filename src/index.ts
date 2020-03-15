import {html, render} from 'lit-html';
import {styleMap} from 'lit-html/directives/style-map.js';

import {dateInputMask, throttleWrapper} from './Utils'
import calendar from './components/Calendar'
import './index.css'
import * as styles from './index.css.json'
import {Languages} from './localization'

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
    local:Languages
	init: () => void;
	addDescriptionListener: (func:() => void) => void;
	inputResizeHandler: () => void;
	getTemplate: (props:ICustomTheme) => any;
}

class renderAviasalesWidget implements IRenderAviasalesWidget{
    widgetElement:HTMLElement
    descriptionElement:HTMLElement

    customTheme:ICustomTheme
    local:Languages

	constructor(name:string, props?:ICustomTheme & ILocalization) {
		this.widgetElement = document.getElementById(name);
		if(!this.widgetElement){
			throw new Error('Не найден элемент для виджета');
		}

		const {backgroundColor, buttonColor, textColor, local=Languages.en} = props || {};
		this.customTheme = {backgroundColor, buttonColor, textColor};
		this.local = local;

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
			this.descriptionElement.className = "aviasales-widget__description aviasales-widget__description_order-both"; 
		} else {
	  		this.descriptionElement.className = "aviasales-widget__description"; 
		}
	}


	getTemplate = () => {
		const {backgroundColor, textColor, buttonColor} = this.customTheme;
		const widgetStyle = backgroundColor || textColor ? {backgroundColor, color: textColor} : {};
		const calendarHtml = calendar(backgroundColor);

		return html`<div id="aviasales-widget" class="${styles.aviasalesWidget}"  style=${styleMap(widgetStyle)}>
		  <div class="aviasales-widget__header">
		      <p>Where does it come from? </p> 
		      <p>Why do we use it?</p>
		  </div>
		  <div class="aviasales-widget__flex-content-first">

		      <div id="aviasales-widget__description">
		        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
		      </div>
		      
		    
		      <form class="aviasales-widget__flex-content-second">
			      	<div class="aviasales-widget__date-input">
			          <input  placeholder="Depart date">
			          ${calendarHtml}
			      	</div>
			      	<div class="aviasales-widget__date-input">
			          <input placeholder="Return date">
			          ${calendarHtml}
			      	</div>
			      	<div class="aviasales-widget__button">
				        <button style=${styleMap(buttonColor ? {buttonColor} : {})}>
				        	search
				        </button>
				    </div>
				</form>

		  </div>
		</div>
		`;	
	}
}




// let t = new renderAviasalesWidget('aviasales', {backgroundColor:'#222', textColor:'blue'});
let t = new renderAviasalesWidget('aviasales');
t.init();