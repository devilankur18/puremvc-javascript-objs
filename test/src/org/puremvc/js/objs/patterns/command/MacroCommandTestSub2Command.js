/*
 PureMVC Javascript Objs by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A SimpleCommand subclass used by MacroCommandTestCommand.
 *
 * @see puremvc.MacroCommandTest MacroCommandTest
 * @see puremvc.MacroCommandTestCommand MacroCommandTestCommand
 * @see puremvc.MacroCommandTestVO MacroCommandTestVO 
 *
 * @extends puremvc.SimpleCommand SimpleCommand
 * 
 * @constructor
 */
var MacroCommandTestSub2Command = Objs
(
	"puremvc.MacroCommandTestSub2Command",
	"puremvc.SimpleCommand",
	{
		/**
		 * Fabricate a result by multiplying the input by itself
		 * 
		 * @param {Notification} note
		 * 		The <code>Notification</code> carrying the
		 * 		<code>MacroCommandTestVO</code>
		 */
		execute: function( note ) 
		{
			var vo/*MacroCommandTestVO*/ = note.getBody();
			
			// Fabricate a result
			vo.result2 = vo.input * vo.input;
		}
	}
);