/*
 PureMVC Javascript Objs by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * Test the PureMVC SimpleCommand class.
 *
 * @see puremvc.SimpleCommandTestVO SimpleCommandTestVO
 * @see puremvc.SimpleCommandTestCommand SimpleCommandTestCommand
 */
var SimpleCommandTest = new YUITest.TestCase
(
	{
	    /**
	     * The name of the test case - if not provided, one is automatically
	     * generated by the YUITest framework.
	     * 
	     * @type {String}
	     * @private
	     */
	    name: "PureMVC SimpleCommand class Tests",  
	
	    /**
	     * Sets up data that is needed by each test.
	     */
	    setUp: function()
		{
	    },
	    
	    /**
	     * Cleans up everything that was created by setUp().
	     */
	    tearDown: function()
		{
	    },

  		/**
  		 * Tests if constructing the <code>SimpleCommand</code> also call its
  		 * super by testing for the existence of its <code>Notifier</code>
  		 * superclass facade instance.
  		 */
  		testConstructor: function()
		{
			// Create a new subclass of Notifier and verify that its facade
			// has well been created
   			var simpleCommandTestSub/*SimpleCommandTestSub*/ = new SimpleCommandTestSub();     

   			// test assertions
   			YUITest.Assert.isTrue
			(
				simpleCommandTestSub.hasFacade(),
				"Expecting simpleCommandTestSub.hasFacade() === true"
			);
   		},
	 		
		/**
		 * Tests the <code>execute</code> method of a <code>SimpleCommand</code>.
		 * 
			 * This test creates a new <code>Notification</code>, adding a
		 * <code>SimpleCommandTestVO</code> as the body. 
		 * It then creates a <code>SimpleCommandTestCommand</code> and invokes
		 * its <code>execute</code> method, passing in the note.
		 * 
			 * Success is determined by evaluating a property on the
		 * object that was passed on the Notification body, which will
		 * be modified by the SimpleCommand.
		 * 
		 */
		testSimpleCommandExecute: function()
		{
   			var Notification = Objs("puremvc.Notification");

			// Create the VO
			var vo/*SimpleCommandTestVO*/ = new SimpleCommandTestVO(5);
			
			// Create the Notification (note)
			var note/*Notification*/ = new Notification( 'SimpleCommandTestNote', vo );
			
			// Create the SimpleCommand  			
			var command/*SimpleCommandTestCommand*/ = new SimpleCommandTestCommand();
			
			// Execute the SimpleCommand
			command.execute(note);
			
			// test assertions
			YUITest.Assert.areEqual
			(
				10,
				vo.result,
				"Expecting vo.result == 10"
			);
		}
	}
);