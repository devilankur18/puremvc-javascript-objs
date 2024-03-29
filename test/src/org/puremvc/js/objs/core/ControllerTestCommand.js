/*
 PureMVC Javascript Objs by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A SimpleCommand subclass used by ControllerTest.
 *
 * @see puremvc.ControllerTest ControllerTest
 * @see puremvc.ControllerTestVO ControllerTestVO
 *
 * @extends puremvc.SimpleCommand SimpleCommand
 * 
 * @constructor
 */
var ControllerTestCommand = Objs
(
	"puremvc.ControllerTestCommand",
	"puremvc.SimpleCommand",
	{
		/**
		 * Fabricate a result by multiplying the input by 2.
		 * 
		 * @param {Notification} note
		 * 		The note carrying the ControllerTestVO
		 */
		execute: function ( note ) 
		{
			var vo/*ControllerTestVO*/ = note.getBody();
		
			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
);