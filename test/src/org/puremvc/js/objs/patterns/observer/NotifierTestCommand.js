/*
 PureMVC Javascript Objs by Frederic Saunier Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A SimpleCommand subclass used by NotifierTest.
 *
 * @see puremvc.NotifierTest NotifierTest
 * @see puremvc.NotifierTestVO NotifierTestVO
 * 
 * @extends puremvc.SimpleCommand SimpleCommand
 * 
 * @constructor
 */
var NotifierTestCommand = Objs
(
	"puremvc.NotifierTestCommand",
	"puremvc.SimpleCommand",
	{		
		/**
		 * Fabricate a result by multiplying the input by 2
		 * 
		 * @param {Notification} note
		 * 		The Notification carrying the NotifierTestVO
		 */
		execute: function( note ) 
		{
			var vo/*NotifierTestVO*/ = note.getBody();
			
			// Fabricate a result
			vo.result = 2 * vo.input;
		}
	}
);