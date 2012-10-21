/*
 PureMVC Javascript Objs by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	var Model = Objs("puremvc.Model");
	var View = Objs("puremvc.View");
	var Controller = Objs("puremvc.Controller");
	var Notification = Objs("puremvc.Notification");

	/**
	 * @classDescription
	 * A singleton implementation.
	 * 
	 * In PureMVC, the <code>Facade</code> class assumes these responsibilities:
	 *
	 * <UL>
	 * <LI>Initializing the <code>Model</code>, <code>View</code> and <code>Controller</code>
	 * singletons.
	 * <LI>Providing the ability to override the specific <code>Model</code>, <code>View</code> and
	 * <code>Controller</code> singletons created.
	 * <LI>Providing a single point of contact to the application for registering
	 * <code>Command</code>s and notifying <code>Observer</code>s.
	 *
	 * This <code>Facade</code> implementation is a singleton and cannot be instantiated directly,
	 * but instead calls the static singleton factory method <code>Facade.getInstance()</code>.
	 *
	 * @constructor
	 */
	var Facade = Objs
	(
		"puremvc.Facade",
		{
			/**
			 * Local reference to the <code>Model</code> singleton.
			 *
			 * @type {Model}
			 * @protected
			 */
			model: null,
			
			/**
			 * Local reference to the <code>View</code> singleton.
			 *
			 * @type {View}
			 * @protected
			 */
			view: null,
			
			/**
			 * Local reference to the <code>Controller</code> singleton.
			 *
			 * @type {Controller}
			 * @protected
			 */
			controller: null,

			/**
			 * @constructs
			 *
			 * Constructs a <code>Controller</code> instance.
			 *
			 * This <code>IFacade</code> implementation is a singleton, so you should not call the
			 * constructor directly, but instead call the static singleton factory method
			 * <code>Facade.getInstance()</code>.
			 *
			 * @throws {Error}
			 *		Throws an error if an instance of this singleton has already been constructed.
			 */
			initialize: function()
			{
				if( Facade.instance )
					throw Error( Facade.SINGLETON_MSG );

				Facade.instance = this;
				this.initializeFacade();
			},

			/**
			 * Called automatically by the constructor.
			 * Initialize the Singleton <code>Facade</code> instance.
			 *
			 * Override in your subclass to do any subclass specific initializations. Be sure to
			 * extend the <code>Facade</code> with the methods and properties on your implementation
			 * and call <code>Facade.initializeFacade()</code>.
			 *
			 * @protected
			 */
			initializeFacade: function()
			{
				this.initializeModel();
				this.initializeController();
				this.initializeView();
			},

			/**
			 * Initialize the <code>Model</code>.
			 *
			 * Called by the <code>initializeFacade</code> method. Override this method in your
			 * subclass of <code>Facade</code> if one or both of the following are true:
			 *
			 * <UL>
			 * <LI>You wish to initialize a different <code>Model</code>.
			 * <LI>You have <code>Proxy</code>s to register with the <code>Model</code> that do not
			 * retrieve a reference to the <code>Facade</code> at construction time.
			 *
			 * If you don't want to initialize a different <code>IModel</code>, call
			 * <code>Facade.initializeModel.call()</code> at the beginning of your method, then register
			 * <code>Proxy</code>s.
			 *
			 * Note: This method is <i>rarely</i> overridden; in practice you are more likely to use
			 * a <code>Command</code> to create and register <code>Proxy</code>s with the
			 * <code>Model</code>, since <code>Proxy</code>s with mutable data will likely need to
			 * send <code>Notification</code>s and thus will likely want to fetch a reference to the
			 * <code>Facade</code> during their construction.
			 *
			 * @protected
			 */
			initializeModel: function()
			{
				if( !this.model )
					this.model = Model.getInstance();
			},

			/**
			 * Initialize the <code>Controller</code>.
			 *
			 * Called by the <code>initializeFacade</code> method. Override this method in your
			 * subclass of <code>Facade</code> if one or both of the following are true:
			 * 
			 * <UL>
			 * <LI>You wish to initialize a different <code>Controller</code>.
			 * <LI>You have <code>Command</code>s to register with the <code>Controller</code> at
			 * startup.
			 *
			 * If you don't want to initialize a different <code>IController</code>, call
			 * <code>super.initializeController()</code> at the beginning of your method, then register
			 * <code>Command</code>s.
			 *
			 * @protected
			 */
			initializeController: function()
			{
				if( !this.controller )
					this.controller = Controller.getInstance();
			},

			/**
			 * Initialize the <code>View</code>.
			 *
			 * Called by the <code>initializeFacade</code> method. Override this method in your
			 * subclass of <code>Facade</code> if one or both of the following are true:
			 * <UL>
			 * <LI>You wish to initialize a different <code>View</code>.
			 * <LI>You have <code>Observer</code>s to register with the <code>View</code>
			 * 
			 * If you don't want to initialize a different <code>View</code>, call
			 * <code>$super.initializeView()</code> at the beginning of your method, then register
			 * <code>Mediator</code> instances.
			 *
			 * Note: This method is <i>rarely</i> overridden; in practice you are more likely to use
			 * a <code>Command</code> to create and register <code>Mediator</code>s with the
			 * <code>View</code>, since <code>Mediator</code> instances will need to send
			 * <code>Notification</code>s and thus will likely want to fetch a reference to the
			 * <code>Facade</code> during their construction.
			 *
			 * @protected
			 */
			initializeView: function()
			{
				if( !this.view )
					this.view = View.getInstance();
			},

			/**
			 * Register a <code>Command</code> with the <code>IController</code> associating it to a
			 * <code>Notification</code> name.
			 *
			 * @param {String} notificationName
			 * 		The name of the <code>Notification</code> to associate the <code>Command</code>
			 * 		with.
			 *
			 * @param {Function} commandClassRef
			 * 		A reference to the constructor of the <code>Command</code>.
			 */
			registerCommand: function( notificationName, commandClassRef )
			{
				this.controller.registerCommand( notificationName, commandClassRef );
			},

			/**
			 * Remove a previously registered <code>Command</code> to <code>Notification</code>
			 * mapping from the <code>Controller</code>.
			 *
			 * @param {String} notificationName
			 * 		The name of the <code>Notification</code> to remove the <code>Command</code>
			 * 		mapping for.
			 */
			removeCommand: function( notificationName )
			{
				this.controller.removeCommand( notificationName );
			},
			
			/**
			 * Check if a <code>SimpleCommand</code> or a <code>MacroCommand</code> is registered
			 * for a given <code>Notification</code>.
			 *
			 * @param {String} notificationName
			 * 		The name of the <code>Notification</code> to verify for the existence of a
			 * 		<code>Command</code> mapping for.
			 *
			 * @return {Boolean}
			 * 		A <code>Command</code> is currently registered for the given <code>name</code>.
			 */
			hasCommand: function( notificationName )
			{
				return this.controller.hasCommand( notificationName );
			},

			/**
			 * Register a <code>Proxy</code> with the <code>Model</code> by name.
			 *
			 * @param proxy {Proxy}
			 * 		The <code>Proxy</code> to be registered with the <code>Model</code>.
			 */
			registerProxy: function( proxy )
			{
				this.model.registerProxy(proxy);
			},

			/**
			 * Retrieve a <code>Proxy</code> from the <code>Model</code> by name.
			 *
			 * @param {String} proxyName
			 * 		The name of the <code>Proxy</code> to be retrieved.
			 *
			 * @return {Proxy}
			 * 		The <code>Proxy</code> previously registered with the given
			 *		<code>proxyName</code>.
			 */
			retrieveProxy: function( proxyName )
			{
				return this.model.retrieveProxy(proxyName);
			},

			/**
			 * Remove an <code>Proxy</code> from the <code>Model</code> by name.
			 *
			 * @param {String} proxyName
			 * 		The <code>Proxy</code> to remove from the <code>Model</code>.
			 *
			 * @return {Proxy}
			 * 		The <code>Proxy</code> that was removed from the <code>Model</code>.
			 */
			removeProxy: function( proxyName )
			{
				var proxy/*Proxy*/;
				if( this.model )
					proxy = this.model.removeProxy( proxyName );

				return proxy
			},

			/**
			 * Check if a <code>Proxy</code> is registered.
			 *
			 * @param {String} proxyName
			 * 		The <code>Proxy</code> to verify the existence of a registration with the
			 * 		<code>Model</code>.
			 *
			 * @return {Boolean}
			 * 		A <code>Proxy</code> is currently registered with the given
			 * 		<code>proxyName</code>.
			 */
			hasProxy: function( proxyName )
			{
				return this.model.hasProxy(proxyName);
			},

			/**
			 * Register a <code>Mediator</code> with the <code>View</code>.
			 *
			 * @param {Mediator} mediator
			 * 		A reference to the <code>Mediator</code>.
			 */
			registerMediator: function( mediator )
			{
				if( this.view )
					this.view.registerMediator(mediator);
			},

			/**
			 * Retrieve an <code>Mediator</code> from the <code>View</code>.
			 *
			 * @param {String} mediatorName
			 * 		The name of the registered <code>Mediator</code> to retrieve.
			 *
			 * @return {Mediator}
			 * 		The <code>Mediator</code> previously registered with the given
			 * 		<code>mediatorName</code>.
			 */
			retrieveMediator: function( mediatorName )
			{
				return this.view.retrieveMediator( mediatorName );
			},

			/**
			 * Remove an <code>Mediator</code> from the <code>View</code>.
			 *
			 * @param {String} mediatorName
			 * 		Name of the <code>Mediator</code> to be removed.
			 *
			 * @return {Mediator}
			 * 		The <code>Mediator</code> that was removed from the <code>View</code>.
			 */
			removeMediator: function( mediatorName )
			{
				var mediator/*IMediator*/;
				if( this.view )
					mediator = this.view.removeMediator( mediatorName );

				return mediator;
			},

			/**
			 * Check if a <code>Mediator</code> is registered or not.
			 *
			 * @param {String} mediatorName
			 * 		The name of the <code>Mediator</code> to verify the existence of a registration
			 * 		for.
			 *
			 * @return {Boolean}
			 * 		A <code>Mediator</code> is registered with the given <code>mediatorName</code>.
			 */
			hasMediator: function( mediatorName )
			{
				return this.view.hasMediator(mediatorName);
			},
			
			/**
			 * Notify <code>Observer</code>s.
			 *
			 * This method is left public mostly for backward compatibility, and to allow you to
			 * send custom notification classes using the <code>Facade</code>.
			 *
			 *
			 * Usually you should just call <code>sendNotification</code> and pass the parameters,
			 * never having to construct the <code>Notification</code> yourself.
			 *
			 * @param {Notification} notification
			 * 		The <code>Notification</code> to have the <code>View</code> notify
			 * 		<code>Observers</code> of.
			 */
			notifyObservers: function( notification )
			{
				if( this.view )
					this.view.notifyObservers( notification );
			},
			
			/**
			 * Create and send a <code>Notification</code>.
			 *
			 * Keeps us from having to construct new notification instances in our implementation
			 * code.
			 *
			 * @param {String} name
			 * 		The name of the notification to send.
			 *
			 * @param {Object} body
			 * 		The body of the notification to send (optional).
			 *
			 * @param {String} type
			 * 		The type of the notification to send (optional).
			 */
			sendNotification: function( name, body, type )
			{
				this.notifyObservers( new Notification( name, body, type ) );
			}
		}
	);

	/**
	 * @type {String}
	 * @constant
	 * @protected
	 */
	Facade.SINGLETON_MSG = "Facade Singleton already constructed!";
	
	/**
	 * The Singleton Facade instance.
	 *
	 * @type {Facade}
	 * @protected
	 */
	Facade.instance = null;

	/**
	 * <code>Facade</code> singleton factory method.
	 * 
	 * @return {Facade}
	 * 		The singleton instance of <code>Facade</code>.
	 */
	Facade.getInstance = function()
	{
		if( !Facade.instance )
			Facade.instance = new Facade();

		return Facade.instance;
	}
};

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Facade = Objs("puremvc.Facade");