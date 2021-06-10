/**
 * @fileoverview
 */

import View from './View';
import {assert} from 'chai';

document.addEventListener('DOMContentLoaded', ()=>{
	// console.log( Object.prototype.toString.call(mocha) );

	mocha.setup('bdd');

	// describe('getPosLeftPercent', () => {
	// 	let abacusHtmlContainer: HTMLAbacusElement = document.querySelectorAll('#abacus-1')[0] as HTMLAbacusElement;
	// 	let view = new View(abacusHtmlContainer);
	
	// 	for (let i = 0; i < 3; i++) {
	// 		let clientX = i * 200;
			
	// 		it(`координата ${clientX} в пикселях получается 50%`, ()=>{
	// 			assert.equal(view.getPosLeftPercent(clientX), 50);
	// 		});
	// 	}
	// });


	mocha.run();
});