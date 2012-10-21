/*
 PureMVC Javascript Objs by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * @classDescription
 * A utility class used by MacroCommandTest.
 * 
 * @see puremvc.MacroCommandTest MacroCommandTest
 * @see puremvc.MacroCommandTestCommand MacroCommandTestCommand
 * @see puremvc.MacroCommandTestSub1Command MacroCommandTestSub1Command
 * @see puremvc.MacroCommandTestSub2Command MacroCommandTestSub2Command
 * 
 * @constructor
 */
var MacroCommandTestVO = Objs
(
	"puremvc.MacroCommandTestVO",
	{
		/**
		 * Constructs a <code>MacroCommandTestVO</code> instance.
		 * 
	  	 * @param {Number} input
	  	 * 		A random number to pass to the command.
	 	 */
		initialize: function( input )
		{
			this.input = input;
		},
		
		/**
		 * @type {Number}
		 */
		input: null,
		
		/**
		 * @type {Number}
		 */
		result1: null,
		
		/**
		 * @type {Number}
		 */
		result2: null
	}
);