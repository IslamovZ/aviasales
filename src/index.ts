import {html, render} from 'lit-html';

const myTemplate = (name:string) => html`<p>Hello ${name}</p>`;

function renderAviasalesWidget(name:string, text?:string){
	const templateText = text || 'World';
	render(myTemplate(templateText), document.getElementById(name));	
} 


renderAviasalesWidget('aviasales');

