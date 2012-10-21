/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	var Observer = Objs("puremvc.Observer");
	var View = Objs("puremvc.View");

	/**
	 * @classDescription
	 * The <code>Controller</code> class for PureMVC.
	 *
	 * A singleton <code>Controller</code> implementation.
	 *
	 * In PureMVC, the <code>Controller</code> class follows the 'Command and Controller' strategy,
	 * and assumes these responsibilities:
	 *
	 * <UL>
	 * <LI>Remembering which <code>SimpleCommand</code>s or <code>MacroCommand</code>s are intended
	 * to handle which <code>Notification</code>s.
	 * <LI>Registering itself as an <code>Observer</code> with the <code>View</code> for each
	 * <code>Notification</code> that it has a <code>SimpleCommand</code> or
	 * <code>MacroCommand</code> mapping for.
	 * <LI>Creating a new instance of the proper <code>SimpleCommand</code> or
	 * <code>MacroCommand</code> to handle a given <code>Notification</code> when notified by the
	 * <code>View</code>.
	 * <LI>Calling the <code>SimpleCommand</code>'s or <code>MacroCommand</code>'s
	 * <code>execute</code> method, passing in the <code>Notification</code>.
	 *
	 * Your application must register <code>ICommand</code>s with the <code>Controller</code>.
	 *
 	 * The simplest way is to subclass </code>Facade</code>, and use its
	 * <code>initializeController</code> method to add your registrations.
	 *
	 * @constructor
	 */
	var Controller = Objs
	(
		"puremvc.Controller",
		{
			/**
			 * Local reference to the <code>View</code> singleton.
			 *
			 * @type {View}
			 * @protected
			 */
			view: null,

			/**
			 * Mapping of <code>Notification<code> names to <code>Command</code> constructors references.
			 *
			 * @type {Object}
			 * @protected
			 */
			commandMap: null,

			/**
			 * This <code>IController</code> implementation is a Singleton, so you should not call the
			 * constructor directly, but instead call the static Singleton Factory method
			 * <code>Controller.getInstance()</code>.
			 *
			 * @throws {Error}
			 * 		Throws an error if an instance for this singleton has already been constructed.
			 */
			initialize: function()
			{
				if( Controller.instance )
					throw Error( Controller.SINGLETON_MSG );

				Controller.instance = this;
				this.commandMap = {};
				this.initializeController();
			},

			/**
			 * Initialize the Singleton <code>Controller</code> instance.
		 	 *
			 * Called automatically by the constructor.
			 *
			 * Note that if you are using a subclass of <code>View</code> in your application, you
			 * should <i>also</i> subclass <code>Controller</code> and override the
			 * <code>initializeController</code> method in the following way:
			 * 
			 * <pre>
			 *	// Ensure that the Controller is talking to my View implementation.
			 *	initializeController: function() 
			 *	{
			 *		this.view = MyView.getInstance();
			 *	}
			 * </pre>
			 *
			 * @protected
			 */
			initializeController: function()
			{
				this.view = View.getInstance();
			},

			/**
			 * If a <code>Command</code> has previously been registered to handle the given
			 * <code>Notification</code>, then it is executed.
			 *
			 * @param {Notification} notification
		 	 *		The <code>INotification</code> the command will receive as parameter.
			 */
			executeCommand: function( notification )
			{
				var commandClassRef/*Function*/ = this.commandMap[ notification.getName() ];
				if( commandClassRef )
				{
					var command/*Command*/ = new commandClassRef();
					command.execute(notification);
				}
			},

			/**
			 * Register a particular <code>Command</code> class as the handler for a particular
			 * <code>Notification</code>.
			 *
			 * If a <code>Command</code> has already been registered to handle
			 * <code>Notification</code>s with this name, it is no longer used, the new
			 * <code>Command</code> is used instead.
			 *
			 * The <code>Observer</code> for the new <code>Command</code> is only created if this is
			 * the first time a <code>Command</code> has been registered for this
			 * <code>Notification</code> name.
			 *
			 * @param {String} notificationName
			 * 		The name of the <code>Notification</code>.
			 *
			 * @param {Function} commandClassRef
			 * 		The constructor of the <code>Command</code>.
			 */
			registerCommand: function( notificationName, commandClassRef )
			{
				if( !this.commandMap[notificationName] )
					this.view.registerObserver( notificationName, new Observer( this.executeCommand, this ) );

				this.commandMap[notificationName] = commandClassRef;
			},

			/**
			 * Check if a <code>Command</code> is registered for a given <code>Notification</code>.
			 *
			 * @param {String} notificationName
			 * 		Name of the <code>Notification</code> to check wheter an <code>ICommand</code> is
			 * 		registered for.
			 * 
			 * @return {Boolean}
			 * 		A <code>Command</code> is currently registered for the given
			 * 		<code>notificationName</code>.
			 */
			hasCommand: function( notificationName )
			{
				return this.commandMap[notificationName] != null;
			},

			/**
			 * Remove a previously registered <code>SimpleCommand</code> or
			 * <code>MacroCommand</code> to <code>Notification</code> mapping.
			 *
			 * @param {String} notificationName
			 * 		The name of the <code>Notification</code> to remove the
			 * 		<code>SimpleCommand</code> or <code>MacroCommand</code>	mapping	for.
			 */
			removeCommand: function( notificationName )
			{
				// if the Command is registered...
				if( this.hasCommand(notificationName) )
				{
					this.view.removeObserver( notificationName, this );
					delete this.commandMap[notificationName];
				}
			}
		}
	);

	/**
	 * Singleton instance local reference.
	 *
	 * @type {Controller}
	 * @protected
	 */
	Controller.instance = null;

	/**
	 * Error message used to indicate that a controller singleton is already constructed when
	 * trying to constructs the class twice.
	 * @constant
	 * @type {String}
	 * @protected
	 */
	Controller.SINGLETON_MSG = "Controller Singleton already constructed!";

	/**
	 * <code>Controller</code> Singleton Factory method.
	 *
	 * @return {Controller}
	 * 		The singleton instance of the <code>Controller</code>
	 */
	Controller.getInstance = function()
	{
		if( !Controller.instance )
			Controller.instance = new Controller();

		return Controller.instance;
	}
};

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Controller = Objs("puremvc.Controller");