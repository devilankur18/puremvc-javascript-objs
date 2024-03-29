/*
 PureMVC Javascript Objs by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * Test the PureMVC View class.
 */
var ViewTest = new YUITest.TestCase
(
	{
	    /**
         * The name of the test case - if not provided, one is automatically
         * generated by the YUITest framework.
         * 
         * @type {String}
         * @private
         */
        name: "PureMVC View class tests",

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
		 * @type {String}
		 */
  		lastNotification: null,
		
		/**
		 * @type {Number}
		 */
  		counter: 0,

		/**
		 * @type {Boolean}
		 * @private
		 */
  		onRegisterCalled: false,
		
		/**
		 * @type {Boolean}
		 * @private
		 */
  		onRemoveCalled:  false,
		   		
  		/**
  		 * A test variable that proves the viewTestMethod was
  		 * invoked by the View.
  		 * 
  		 * @type {Number}
  		 * @private
  		 */
  		viewTestVar: null,

		/**
  		 * Tests the View Singleton Factory Method 
  		 */
  		testGetInstance: function()
		{
   			var View = Objs("puremvc.View");
  			
   			// Test Factory Method
   			var view/*View*/ = View.getInstance();
   			
   			// test assertions
   			YUITest.Assert.isNotNull
			(
				view,
				"Expecting instance !== null"
			);
			
   			YUITest.Assert.isInstanceOf
			(
				View,
				view,
				"Expecting instance implements View"
			);
   		},

  		/**
  		 * Tests registration and notification of Observers.
  		 * 
  	  		 * An Observer is created to callback the viewTestMethod of
  		 * this ViewTest instance. This Observer is registered with
  		 * the View to be notified of 'ViewTestEvent' events. Such
  		 * an event is created, and a value set on its payload. Then
  		 * the View is told to notify interested observers of this
  		 * Event. 
  		 * 
  	  		 * The View calls the Observer's notifyObserver method
  		 * which calls the viewTestMethod on this instance
  		 * of the ViewTest class. The viewTestMethod method will set 
  		 * an instance variable to the value passed in on the Event
  		 * payload. We evaluate the instance variable to be sure
  		 * it is the same as that passed out as the payload of the 
  		 * original 'ViewTestEvent'.
  		 * 
 		 */
  		testRegisterAndNotifyObserver: function()
		{
   			var View = Objs("puremvc.View");
   			var Observer = Objs("puremvc.Observer");

  			// Get the Singleton View instance
  			var view/*View*/ = View.getInstance();
  			
   			// Create observer, passing in notification method and context
   			var observer/*Observer*/ = new Observer( this.viewTestMethod, this );
   			
   			// Register Observer's interest in a particular Notification with the View 
   			view.registerObserver(ViewTestNote.NAME, observer);
  			
   			// Create a ViewTestNote, setting 
   			// a body value, and tell the View to notify 
   			// Observers. Since the Observer is this class 
   			// and the notification method is viewTestMethod,
   			// successful notification will result in our local 
   			// viewTestVar being set to the value we pass in 
   			// on the note body.
   			var note/*Notification*/ = ViewTestNote.create(10);
			view.notifyObservers(note);

			// test assertions  			
   			YUITest.Assert.areEqual
			(
				10,
				this.viewTestVar,
				"Expecting viewTestVar = 10"
			);
   		},

  		/**
  		 * A utility method to test the notification of Observers by the view.
  		 * 
  		 * @param {Notification} note
  		 * 		The note to test.
  		 */
  		viewTestMethod: function( note )
  		{
  			// set the local viewTestVar to the number on the event payload
  			this.viewTestVar = note.getBody();
  		},

		/**
		 * Tests registering and retrieving a mediator with
		 * the View.
		 */
		testRegisterAndRetrieveMediator: function()
		{
   			var View = Objs("puremvc.View");

  			// Get the Singleton View instance
  			var view/*View*/ = View.getInstance();

			// Create and register the test mediator
			var viewTestMediator/*ViewTestMediator*/ = new ViewTestMediator( this );
			view.registerMediator( viewTestMediator );
			
			// Retrieve the component
			var mediator/*Mediator*/ = view.retrieveMediator( ViewTestMediator.NAME );
			
			// test assertions  			
   			YUITest.Assert.isInstanceOf
			(
				ViewTestMediator,
				mediator,
				"Expecting comp is ViewTestMediator" 
			);
   			
   			this.cleanup();
			
		},
 		
  		/**
  		 * Tests the hasMediator Method
  		 */
  		testHasMediator: function()
		{
   			var View = Objs("puremvc.View");
   			var Mediator = Objs("puremvc.Mediator");

   			// register a Mediator
   			var view/*View*/ = View.getInstance();
			
			// Create and register the test mediator
			var mediator/*Mediator*/ = new Mediator( 'hasMediatorTest', this );
			view.registerMediator( mediator );
			
   			// assert that the view.hasMediator method returns true
   			// for that mediator name
   			YUITest.Assert.isTrue
			(
				view.hasMediator('hasMediatorTest'),
				"Expecting view.hasMediator('hasMediatorTest') === true"
			);

			view.removeMediator( 'hasMediatorTest' );
			
   			// assert that the view.hasMediator method returns false
   			// for that mediator name
   			YUITest.Assert.isFalse
			( 
   				view.hasMediator('hasMediatorTest'),
				"Expecting view.hasMediator('hasMediatorTest') === false"
			);
   		},

		/**
		 * Tests registering and removing a mediator 
		 */
		testRegisterAndRemoveMediator: function()
		{
   			var View = Objs("puremvc.View");
   			var Mediator = Objs("puremvc.Mediator");

  			// Get the Singleton View instance
  			var view/*View*/ = View.getInstance();

			// Create and register the test mediator
			var mediator/*Mediator*/ = new Mediator( 'testing', this );
			view.registerMediator( mediator );
			
			// Remove the component
			var removedMediator/*Mediator*/ = view.removeMediator( 'testing' );
			
			// assert that we have removed the appropriate mediator
   			YUITest.Assert.areEqual
			(
				'testing',
				removedMediator.getMediatorName(),
				"Expecting removedMediator.getMediatorName() == 'testing'"
			);
				
			// assert that the mediator is no longer retrievable
   			YUITest.Assert.isNull
			(
   				view.retrieveMediator( 'testing' ),
				"Expecting view.retrieveMediator( 'testing' ) === null )"
			);
   						
			this.cleanup();
		},
		
		/**
		 * Tests that the View callse the onRegister and onRemove methods
		 */
		testOnRegisterAndOnRemove: function()
		{
   			var View = Objs("puremvc.View");

  			// Get the Singleton View instance
  			var view/*View*/ = View.getInstance();

			// Create and register the test mediator
			var mediator/*Mediator*/ = new ViewTestMediator4( this );
			view.registerMediator( mediator );

			// assert that onRegsiter was called, and the mediator responded by setting our boolean
   			YUITest.Assert.isTrue
			(
				this.onRegisterCalled,
				"Expecting onRegisterCalled === true"
			);
			
			// Remove the component
			view.removeMediator( ViewTestMediator4.NAME );
			
			// assert that the mediator is no longer retrievable
   			YUITest.Assert.isTrue
			(
   				this.onRemoveCalled,
				"Expecting onRemoveCalled === true"
			);
 		
			this.cleanup();
		},
		
		/**
		 * Tests successive regster and remove of same mediator.
		 */
		testSuccessiveRegisterAndRemoveMediator: function()
		{
   			var View = Objs("puremvc.View");

  			// Get the Singleton View instance
  			var view/*View*/ = View.getInstance();

			// Create and register the test mediator, 
			// but not so we have a reference to it
			view.registerMediator( new ViewTestMediator( this ) );

			// test that we can retrieve it
   			YUITest.Assert.isInstanceOf
			(
				ViewTestMediator,
	   			view.retrieveMediator( ViewTestMediator.NAME ), 
				"Expecting view.retrieveMediator( ViewTestMediator.NAME ) isInstanceOf ViewTestMediator"
			);

			// Remove the Mediator
			view.removeMediator( ViewTestMediator.NAME );

			// test that retrieving it now returns null			
   			YUITest.Assert.isNull
			(
   				view.retrieveMediator( ViewTestMediator.NAME ),
				"Expecting view.retrieveMediator( ViewTestMediator.NAME ) === null"
			);

			// test that removing the mediator again once its gone return null 		
   			YUITest.Assert.isNull
			( 
   				view.removeMediator( ViewTestMediator.NAME ),
				"Expecting view.removeMediator( ViewTestMediator.NAME ) === null"
			);

			// Create and register another instance of the test mediator, 
			view.registerMediator( new ViewTestMediator( this ) );
			
   			YUITest.Assert.isInstanceOf
			(
				ViewTestMediator,
   				view.retrieveMediator( ViewTestMediator.NAME ),
				"Expecting view.retrieveMediator( ViewTestMediator.NAME ) is ViewTestMediator"
			);

			// Remove the Mediator
			view.removeMediator( ViewTestMediator.NAME );
			
			// test that retrieving it now returns null			
   			YUITest.Assert.isNull
			(
   				view.retrieveMediator( ViewTestMediator.NAME ),
				"Expecting view.retrieveMediator( ViewTestMediator.NAME ) === null"
			);

			this.cleanup();						  			
		},
		
		/**
		 * Tests registering a Mediator for 2 different notifications, removing the
		 * Mediator from the View, and seeing that neither notification causes the
		 * Mediator to be notified. Added for the fix deployed in version 1.7
		 */
		testRemoveMediatorAndSubsequentNotify: function()
		{
   			var View = Objs("puremvc.View");
   			var Notification = Objs("puremvc.Notification");

  			// Get the Singleton View instance
  			var view/*View*/ = View.getInstance();
			
			// Create and register the test mediator to be removed.
			view.registerMediator( new ViewTestMediator2( this ) );
			
			// test that notifications work
   			view.notifyObservers( new Notification(ViewTest.NOTE1) );
   			YUITest.Assert.areEqual
			(
				ViewTest.NOTE1,
		   		this.lastNotification,
				"Expecting lastNotification == NOTE1"
			);

   			view.notifyObservers( new Notification(ViewTest.NOTE2) );
   			YUITest.Assert.areEqual
			(
				ViewTest.NOTE2,
		   		this.lastNotification,
				"Expecting lastNotification == NOTE2"
			);

			// Remove the Mediator
			view.removeMediator( ViewTestMediator2.NAME );

			// test that retrieving it now returns null			
   			YUITest.Assert.isNull
			(
   				view.retrieveMediator( ViewTestMediator2.NAME ),
				"Expecting view.retrieveMediator( ViewTestMediator2.NAME ) === null"
			);

			// test that notifications no longer work
			// (ViewTestMediator2 is the one that sets lastNotification
			// on this component, and ViewTestMediator)
			this.lastNotification = null;
			
   			view.notifyObservers( new Notification(ViewTest.NOTE1) );
   			YUITest.Assert.areNotEqual
			(
				ViewTest.NOTE1,
		   		this.lastNotification,
				"Expecting lastNotification != NOTE1"
			);

   			view.notifyObservers( new Notification(ViewTest.NOTE2) );
   			YUITest.Assert.areNotEqual
			(
				ViewTest.NOTE2,
				this.lastNotification,
				"Expecting lastNotification != NOTE2"
			);

			this.cleanup();						  			
		},
		
		/**
		 * Tests registering one of two registered Mediators and seeing
		 * that the remaining one still responds.
		 * Added for the fix deployed in version 1.7.1
		 */
		testRemoveOneOfTwoMediatorsAndSubsequentNotify: function()
		{
   			var View = Objs("puremvc.View");
   			var Notification = Objs("puremvc.Notification");

  			// Get the Singleton View instance
  			var view/*View*/ = View.getInstance();
			
			// Create and register that responds to notifications 1 and 2
			view.registerMediator( new ViewTestMediator2( this ) );
			
			// Create and register that responds to notification 3
			view.registerMediator( new ViewTestMediator3( this ) );
			
			// test that all notifications work
   			view.notifyObservers( new Notification(ViewTest.NOTE1) );
   			YUITest.Assert.areEqual
			(
				ViewTest.NOTE1,
		   		this.lastNotification,
				"Expecting lastNotification == NOTE1"
			);

   			view.notifyObservers( new Notification(ViewTest.NOTE2) );
   			YUITest.Assert.areEqual
			(
		   		ViewTest.NOTE2,
				this.lastNotification,
				"Expecting lastNotification == NOTE2"
			);

   			view.notifyObservers( new Notification(ViewTest.NOTE3) );
   			YUITest.Assert.areEqual
			(
				ViewTest.NOTE3,
		   		this.lastNotification, 
				"Expecting lastNotification == NOTE3"
			);
		   			
			// Remove the Mediator that responds to 1 and 2
			view.removeMediator( ViewTestMediator2.NAME );

			// test that retrieving it now returns null			
   			YUITest.Assert.isNull
			(
   				view.retrieveMediator( ViewTestMediator2.NAME ),
				"Expecting view.retrieveMediator( ViewTestMediator2.NAME ) === null" 
			);

			// test that notifications no longer work
			// for notifications 1 and 2, but still work for 3
			this.lastNotification = null;
			
   			view.notifyObservers( new Notification(ViewTest.NOTE1) );
   			YUITest.Assert.areNotEqual
			(
				ViewTest.NOTE1,
		   		this.lastNotification,
				"Expecting lastNotification != NOTE1"
			);

   			view.notifyObservers( new Notification(ViewTest.NOTE2) );
   			YUITest.Assert.areNotEqual
			(
				ViewTest.NOTE2,
		   		this.lastNotification,
				"Expecting lastNotification != NOTE2"
			);

   			view.notifyObservers( new Notification(ViewTest.NOTE3) );
   			YUITest.Assert.areEqual
			(
				ViewTest.NOTE3,
		   		this.lastNotification,
				"Expecting lastNotification == NOTE3"
			);

			this.cleanup();						  			
		},
		
		/**
		 * Tests registering the same mediator twice. 
		 * A subsequent notification should only illicit
		 * one response. Also, since reregistration
		 * was causing 2 observers to be created, ensure
		 * that after removal of the mediator there will
		 * be no further response.
		 * 
		 * Added for the fix deployed in version 2.0.4
		 */
		testMediatorReregistration: function()
		{
   			var View = Objs("puremvc.View");
   			var Notification = Objs("puremvc.Notification");

  			// Get the Singleton View instance
  			var view/*View*/ = View.getInstance();
			
			// Create and register that responds to notification 5
			view.registerMediator( new ViewTestMediator5( this ) );
			
			// try to register another instance of that mediator (uses the same NAME constant).
			view.registerMediator( new ViewTestMediator5( this ) );
			
			// test that the counter is only incremented once (mediator 5's response) 
			this.counter=0;
   			view.notifyObservers( new Notification(ViewTest.NOTE5) );
   			YUITest.Assert.areEqual
			( 
				1,
				this.counter,
				"Expecting counter == 1"
			);

			// Remove the Mediator 
			view.removeMediator( ViewTestMediator5.NAME );

			// test that retrieving it now returns null			
   			YUITest.Assert.isNull
			(
   				view.retrieveMediator( ViewTestMediator5.NAME ),
				"Expecting view.retrieveMediator( ViewTestMediator5.NAME ) === null"
			);

			// test that the counter is no longer incremented  
			this.counter=0;
   			view.notifyObservers( new Notification(ViewTest.NOTE5) );
   			YUITest.Assert.areEqual
			( 
				0,
				this.counter,
				"Expecting counter == 0"
			);
		},
		
		/**
		 * Tests the ability for the observer list to 
		 * be modified during the process of notification,
		 * and all observers be properly notified. This
		 * happens most often when multiple Mediators
		 * respond to the same notification by removing
		 * themselves.  
		 * 
		 * Added for the fix deployed in version 2.0.4
		 */
		testModifyObserverListDuringNotification: function()
		{
   			var View = Objs("puremvc.View");
   			var Notification = Objs("puremvc.Notification");

  			// Get the Singleton View instance
  			var view/*View*/ = View.getInstance();
			
			// Create and register several mediator instances that respond to notification 6 
			// by removing themselves, which will cause the observer list for that notification 
			// to change. versions prior to Standard Version 2.0.4 will see every other mediator
			// fails to be notified.  
			view.registerMediator( new ViewTestMediator6( ViewTestMediator6.NAME+"/1", this ) );
			view.registerMediator( new ViewTestMediator6( ViewTestMediator6.NAME+"/2", this ) );
			view.registerMediator( new ViewTestMediator6( ViewTestMediator6.NAME+"/3", this ) );
			view.registerMediator( new ViewTestMediator6( ViewTestMediator6.NAME+"/4", this ) );
			view.registerMediator( new ViewTestMediator6( ViewTestMediator6.NAME+"/5", this ) );
			view.registerMediator( new ViewTestMediator6( ViewTestMediator6.NAME+"/6", this ) );
			view.registerMediator( new ViewTestMediator6( ViewTestMediator6.NAME+"/7", this ) );
			view.registerMediator( new ViewTestMediator6( ViewTestMediator6.NAME+"/8", this ) );

			// clear the counter
			this.counter=0;

			// send the notification. each of the above mediators will respond by removing
			// themselves and incrementing the counter by 1. This should leave us with a
			// count of 8, since 8 mediators will respond.
			view.notifyObservers( new Notification( ViewTest.NOTE6 ) );

			// verify the count is correct
   			YUITest.Assert.areEqual
			(
				8,
				this.counter,
				"Expecting counter == 8"
			);

			// clear the counter
			this.counter=0;
			view.notifyObservers( new Notification( ViewTest.NOTE6 ) );
			
			// verify the count is 0
   			YUITest.Assert.areEqual
			(
				0,
				this.counter,
				"Expecting counter == 0"
			);

		},
		
		/**
		 * @private
		 */
		cleanup: function()
		{
			var View = Objs("puremvc.View");

			View.getInstance().removeMediator( ViewTestMediator.NAME );
			View.getInstance().removeMediator( ViewTestMediator2.NAME );
			View.getInstance().removeMediator( ViewTestMediator3.NAME );
		}
 	}
);

/**
 * @type {String}
 * @constant
 */
ViewTest.NOTE1 = "Notification1";

/**
 * @type {String}
 * @constant
 */
ViewTest.NOTE2 = "Notification2";

/**
 * @type {String}
 * @constant
 */
ViewTest.NOTE3 = "Notification3";

/**
 * @type {String}
 * @constant
 */
ViewTest.NOTE4 = "Notification4";

/**
 * @type {String}
 * @constant
 */
ViewTest.NOTE5 = "Notification5";

/**
 * @type {String}
 * @constant
 */
ViewTest.NOTE6 = "Notification6";