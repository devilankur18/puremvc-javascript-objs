/*
 PureMVC Javascript Objs by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	/**
	 * @classDescription
	 * The base <code>Observer</code> class.
	 *
	 * In PureMVC, the <code>Observer</code> class assumes these responsibilities:
	 * <UL>
	 * <LI>Encapsulate the notification (callback) method of the interested object.
	 * <LI>Encapsulate the notification context (this) of the interested object.
	 * <LI>Provide methods for setting the interested object notification method and context.
	 * <LI>Provide a method for notifying the interested object.
	 *
	 * PureMVC does not rely upon underlying event models such as the one provided in JavaScript DOM API,
	 * and JavaScript does not have an inherent event model.
	 *
	 * The Observer Pattern as implemented within PureMVC exists to support event driven
	 * communication between the application and the actors of the MVC triad (Model, View, Controller).
	 *
	 * An Observer is an object that encapsulates information about an interested object with a
	 * notification method that should be called when an </code>INotification</code> is broadcast.
	 * The Observer then acts as a proxy for notifying the interested object.
	 *
	 * Observers can receive <code>Notification</code>s by having their <code>notifyObserver</code>
	 * method invoked, passing in an object implementing the <code>INotification</code> interface,
	 * such as a subclass of <code>Notification</code>.
	 *
	 * @constructor
	 */
	Objs
	(
		"puremvc.Observer",
		{
			/**
			 * The notification method of the interested object.
			 * 
			 * @type {Function}
			 * @private
			 */
			notify: null,

			/**
			 * The notification context of the interested object.
			 * 
			 * @type {Object}
			 * @private
			 */
			context: null,

			/**
			 * @constructs
			 *
			 * Constructs an <code>Observer</code> instance.
			 *
			 * @param {Function} notifyMethod
			 * 		The notification method of the interested object.
			 * 
			 * @param {Object} notifyContext
			 * 		The notification context of the interested object.
			 */
			initialize: function( notifyMethod, notifyContext )
			{
				this.setNotifyMethod( notifyMethod );
				this.setNotifyContext( notifyContext );
			},

			/**
			 * Get the notification method.
			 *
			 * @return {Function}
			 * 		The notification (callback) method of the interested object.
			 *
			 * @private
			 */
			getNotifyMethod: function()
			{
				return this.notify;
			},

			/**
			 * Set the notification method.
			 *
			 * The notification method should take one parameter of type <code>Notification</code>.
			 *
			 * @param {Function} notifyMethod
			 * 		The notification (callback) method of the interested object.
			 */
			setNotifyMethod: function( notifyMethod )
			{
				this.notify = notifyMethod;
			},

			/**
			 * Get the notification context.
			 *
			 * @return {Object}
			 * 		The notification context (<code>this</code>) of the interested object.
			 *
			 * @private
			 */
			getNotifyContext: function()
			{
				return this.context;
			},

			/**
			 * Set the notification context.
			 *
			 * @param {Object} notifyContext
			 * 		The notification context (this) of the interested object.
			 */
			setNotifyContext: function( notifyContext )
			{
				this.context = notifyContext;
			},

			/**
			 * Notify the interested object.
			 *
			 * @param {Notification} notification
			 * 		The <code>Notification</code> to pass to the interested object's notification
			 *		method.
			 */
			notifyObserver: function( notification )
			{
				this.getNotifyMethod().call( this.getNotifyContext(), notification );
			},

			/**
			 * Compare an object to the notification context.
			 *
			 * @param {Object} object
			 * 		The object to compare.
			 *
			 * @return {Boolean}
			 * 		The object and the notification context are the same.
			 */
			compareNotifyContext: function( object )
			{
		 		return object === this.context;
			}
		}
	);
};

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Observer = Objs("puremvc.Observer");
/*
 PureMVC Javascript Objs by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	/**
	 * @classDescription
	 * The base <code>Notification</code> class.
	 *
	 * PureMVC does not rely upon underlying event models such as the one provided in JavaScript DOM API,
	 * and JavaScript does not have an inherent event model.
	 *
	 * The Observer pattern as implemented within PureMVC exists to support event-driven
	 * communication between the application and the actors of the MVC triad (Model, View and
	 * Controller).
	 *
	 * Notifications are not meant to be a replacement for Events in Flex/Flash/Air/Javascript.
	 * Generally, <code>Mediator</code> subclasses place event listeners on their view components,
	 * which they then handle in the usual way. This may lead to the broadcast of
	 * <code>Notification</code>s to trigger <code>Command</code>s or to communicate with other
	 * <code>Mediators</code>. <code>Proxy</code> and <code>Command</code> instances communicate
	 * with each other and <code>Mediator</code>s by broadcasting <code>Notification</code>s.
	 *
	 * A key difference between JavaScript <code>Event</code>s and PureMVC
	 * <code>Notification</code>s is that <code>Event</code>s follow the 'Chain of Responsibility'
	 * pattern, 'bubbling' up the display hierarchy until some parent component handles the
	 * <code>Event</code>, while PureMVC <code>Notification</code>s follow a 'Publish/Subscribe'
	 * pattern. PureMVC classes need not be related to each other in a parent/child relationship in
	 * order to communicate with one another using <code>Notification</code>s.
	 * 
	 * @constructor
	 */
	Objs
	(
		"puremvc.Notification",
		{
			/**
			 * The name of the notification.
			 * 
			 * @type {String}
			 * @private
			 */
			name: null,

			/**
			 * The body data to send with the notification.
			 * 
			 * @type {Object}
			 * @private
			 */
			body: null,

			/**
			 * The type identifier of the notification.
			 * 
			 * @type {String}
			 * @private
			 */
			type: null,

			/**
			 * Constructs a <code>Notification</code> instance.
			 *
			 * @param {String} name
			 * 		The name of the notification.
			 *
			 * @param {Object} body
			 * 		(optional) Body data to send with the notification.
			 * 
			 * @param {String} type (optional)
			 * 		Type identifier of the notification.
			 */
			initialize: function( name, body, type )
			{			
				this.name = name;
				this.body = body;
				this.type = type;
			},

			/**
			 * Get the name of the <code>Notification</code> instance.
			 *
			 * @return {String}
			 * 		The name of the <code>Notification</code> instance.
			 */
			getName: function()
			{
				return this.name;
			},

			/**
			 * Set the body of the <code>Notification</code> instance.
			 *
			 * @param {Object} body
			 * 		The body of the <code>Notification</code> instance.
			 */
			setBody: function( body )
			{
				this.body = body;
			},

			/**
			 * Get the body of the <code>Notification</code> instance.
			 *
			 * @return {Object}
			 *		The body object of the <code>Notification</code> instance.
			 */
			getBody: function()
			{
				return this.body;
			},

			/**
			 * Set the type of the <code>Notification</code> instance.
			 *
			 * @param {String} type
			 * 		The type of the <code>Notification</code> instance.
			 */
			setType: function( type )
			{
				this.type = type;
			},

			/**
			 * Get the type of the <code>Notification</code> instance.
			 *
			 * @return {String}
			 *		The type of the <code>Notification</code> instance.
			 */
			getType: function()
			{
				return this.type;
			},

			/**
			 * Get a textual representation of the <code>Notification</code> instance.
			 *
			 * @return {String}
			 * 		The textual representation of the <code>Notification</code>	instance.
			 *
			 * @override
			 */
			toString: function()
			{
				var msg/*String*/ = "Notification Name: " + this.getName();
				msg += "\nBody:" + (( this.getBody() == null ) ? "null" : this.getBody().toString());
				msg += "\nType:" + (( this.getType() == null ) ? "null" : this.getType());

				return msg;
			}
		}
	);
};

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Notification = Objs("puremvc.Notification");
/*
 PureMVC Javascript Objs by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	var Observer = Objs("puremvc.Observer");

	/**
	 * @classDescription
	 *
	 * The <code>View</code> class for PureMVC.
	 *
	 * A singleton <code>View</code> implementation.
	 * 
	 * In PureMVC, the <code>View</code> class assumes these responsibilities:
	 * <UL>
	 * <LI>Maintain a cache of <code>Mediator</code> instances.
	 * <LI>Provide methods for registering, retrieving, and removing <code>Mediator</code>s.
	 * <LI>Notifiying <code>Mediator</code>s when they are registered or removed.
	 * <LI>Managing the <code>Observer</code> lists for each <code>Notification</code> in the
	 * application.
	 * <LI>Providing a method for attaching <code>Observer</code>s to an
	 * <code>Notification</code>'s <code>Observer</code> list.
	 * <LI>Providing a method for broadcasting a <code>Notification</code>.
	 * <LI>Notifying the <code>Observer</code>s of a given <code>Notification</code> when it
	 * broadcasts.
	 *
	 * @constructor
	 */
	var View = Objs
	(
		"puremvc.View",
		{
			/**
			 * Mapping of <code>Mediator</code> names to <code>Mediator</code> instances.
			 *
			 * @type {Object}
			 * @protected
			 */
			mediatorMap: null,

			/**
			 * Mapping of <code>Notification</code> names to <code>Observers</code> lists.
			 *
			 * @type {Object}
			 * @protected
			 */
			observerMap: null,

			/**
			 * Constructs a <code>View</code> instance.
			 *
			 * This <code>View</code> implementation is a singleton, so you should not call the
			 * constructor directly, but instead call the static singleton factory method
			 * <code>View.getInstance()</code>.
			 *
			 * @throws {Error}
			 * 		Throws an error if an instance for this singleton has already been constructed.
			 */
			initialize: function()
			{
				if( View.instance )
					throw Error( View.SINGLETON_MSG );

				View.instance = this;
				this.mediatorMap = {};
				this.observerMap = {};
				this.initializeView();
			},

			/**
			 * Initialize the singleton <code>View</code> instance.
			 *
			 * Called automatically by the constructor. This is the opportunity to initialize the
			 * singleton instance in a subclass without overriding the constructor.
			 */
			initializeView: function()
			{
			
			},

			/**
			 * Register an <code>Observer</code> to be notified of <code>Notifications</code> with a
			 * given name.
			 *
			 * @param {String} notificationName
			 * 		The name of the <code>Notification</code>s to notify this <code>Observer</code>
			 *		of.
			 * 
			 * @param {Observer} observer
			 * 		The <code>Observer</code> to register.
			 */
			registerObserver: function( notificationName, observer )
			{
				var observers/*Array*/ = this.observerMap[notificationName];
				if( observers )
					observers.push(observer);
				else
					this.observerMap[notificationName] = [observer];
			},

			/**
			 * Remove the <code>Observer</code> for a given <code>notifyContext</code> from an
			 * <code>Observer</code> list for a given <code>Notification</code> name.
			 *
			 * @param {String} notificationName
			 * 		Which <code>Observer</code> list to remove from.
			 *
			 * @param {Object} notifyContext
			 * 		Remove the <code>Observer</code> with this object as its
			 *		<code>notifyContext</code>.
			 */
			removeObserver: function( notificationName, notifyContext )
			{
				//The observer list for the notification under inspection
				var observers/*Array*/ = this.observerMap[notificationName];

				//Find the observer for the notifyContext.
				var i/*Number*/ = observers.length;
				while( i-- )
				{
					var observer/*Observer*/ = observers[i];
					if( observer.compareNotifyContext(notifyContext) )
					{
						observers.splice( i, 1 );
						break;
					}
				}

				/*
				 * Also, when a Notification's Observer list length falls to zero, delete the
				 * notification key from the observer map.
				 */
				if( observers.length == 0 )
					delete this.observerMap[notificationName];
			},

			/**
			 * Notify the <code>Observer</code>s for a particular <code>Notification</code>.
			 *
			 * All previously attached <code>Observer</code>s for this <code>Notification</code>'s
			 * list are notified and are passed a reference to the <code>Notification</code> in the
			 * order in which they were registered.
			 *
			 * @param {Notification} notification
			 * 		The <code>Notification</code> to notify <code>Observer</code>s of.
			 */
			notifyObservers: function( notification )
			{
				var notificationName/*String*/ = notification.getName();
			
				var observersRef/*Array*/ = this.observerMap[notificationName];
				if( observersRef )
				{
					// Copy the array.
					var observers/*Array*/ = observersRef.slice(0);
					var len/*Number*/ = observers.length;
					for( var i/*Number*/=0; i<len; i++ )
					{
						var observer/*Observer*/ = observers[i];
						observer.notifyObserver( notification );
					}
				}
			},

			/**
			 * Register an <code>Mediator</code> instance with the <code>View</code>.
			 *
			 * Registers the <code>Mediator</code> so that it can be retrieved by name, and further
			 * interrogates the <code>Mediator</code> for its <code>Notification</code> interests.
			 *
			 * If the <code>Mediator</code> returns any <code>Notification</code> names to be
			 * notified about, an <code>Observer</code> is created to encapsulate the
			 * <code>Mediator</code> instance's <code>handleNotification</code> method and register
			 * it as an <code>Observer</code> for all <code>Notification</code>s the
			 * <code>Mediator</code> is interested in.
			 *
			 * @param {Mediator} mediator
			 * 		A reference to a <code>Mediator</code> instance.
			 */
			registerMediator: function( mediator )
			{
				var name/*String*/ = mediator.getMediatorName();
				
				//Do not allow re-registration (you must removeMediator first).
				if( this.mediatorMap[name] )
					return;

				//Register the Mediator for retrieval by name.
				this.mediatorMap[name] = mediator;

				//Get Notification interests, if any.
				var interests/*Array*/ = mediator.listNotificationInterests();
				var len/*Number*/ = interests.length;
				if( len>0 )
				{
			    	//Create Observer referencing this mediator's handlNotification method.
					var observer/*Observer*/ = new Observer( mediator.handleNotification, mediator );
					
					//Register Mediator as Observer for its list of Notification interests.
					for( var i/*Number*/=0; i<len; i++ )
						this.registerObserver( interests[i], observer );
				}

				//Alert the mediator that it has been registered.
				mediator.onRegister();
			},

			/**
			 * Retrieve a <code>Mediator</code> from the <code>View</code>.
			 *
			 * @param {String} mediatorName
			 *		The name of the <code>IMediator</code> instance to retrieve.
			 *
			 * @return {Mediator}
			 *		The <code>Mediator</code> instance previously registered with the given
			 *		<code>mediatorName</code> or an explicit <code>null</code> if it doesn't exists.
			 */
			retrieveMediator: function( mediatorName )
			{
				//Return a strict null when the mediator doesn't exist
				return this.mediatorMap[mediatorName] || null;
			},

			/**
			 * Remove a <code>Mediator</code> from the <code>View</code>.
			 *
			 * @param {String} mediatorName
			 *		Name of the <code>Mediator</code> instance to be removed.
			 *
			 * @return {Mediator}
			 *		The <code>Mediator</code> that was removed from the <code>View</code> or a
			 *		strict <code>null</null> if the <code>Mediator</code> didn't exist.
			 */
			removeMediator: function( mediatorName )
			{
				// Retrieve the named mediator
				var mediator/*Mediator*/ = this.mediatorMap[mediatorName];
				if( !mediator )
					return null;

				//Get Notification interests, if any.
				var interests/*Array*/ = mediator.listNotificationInterests();

				//For every notification this mediator is interested in...
				var i/*Number*/ = interests.length;
				while( i-- ) 
					this.removeObserver( interests[i], mediator );

				// remove the mediator from the map		
				delete this.mediatorMap[mediatorName];

				//Alert the mediator that it has been removed
				mediator.onRemove();
				return mediator;	
			},

			/**
			 * Check if a <code>Mediator</code> is registered or not.
			 *
			 * @param {String} mediatorName
		 	 * 		The <code>Mediator</code> name to check whether it is registered.
			 *
			 * @return {Boolean}
			 *		A <code>Mediator</code> is registered with the given <code>mediatorName</code>.
			 */
			hasMediator: function( mediatorName )
			{
				return this.mediatorMap[mediatorName] != null;
			}
		}
	);

	/**
	 * Error message used to indicate that a <code>View</code> singleton is already
	 * constructed when trying to constructs the class twice.
	 *
	 * @static
	 * @constant
	 * @protected
	 * @type {String}
	 */
	View.SINGLETON_MSG = "View Singleton already constructed!";

	/**
	 * Singleton instance local reference.
	 *
	 * @static
	 * @protected
	 * @type {View}
	 */
	View.instance = null;

	/**
	 * <code>View</code> Singleton Factory method.
	 * 
	 * @return {View}
	 * 		The singleton instance of <code>View</code>.
	 */
	View.getInstance = function()
	{
		if( !View.instance )
			View.instance = new View();

		return View.instance;
	};
};

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	View = Objs("puremvc.View");
/*
 PureMVC Javascript Objs by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	/**
	 * @classDescription
	 * The <code>Model</code> class for PureMVC.
	 *
	 * A singleton implementation.
	 *
	 * In PureMVC, the <code>Model</code> class provides access to model objects (Proxies) by named
	 * lookup.
	 *
	 * The <code>Model</code> assumes these responsibilities:
	 * <UL>
	 * <LI>Maintain a cache of <code>Proxy</code> instances.
	 * <LI>Provide methods for registering, retrieving, and removing <code>Proxy</code> instances.
	 *
	 * Your application must register <code>Proxy</code> instances with the <code>Model</code>.
	 * Typically, you use a <code>Command</code> to create and register <code>Proxy</code> instances
	 * once the <code>Facade</code> has initialized the core actors.
	 *
	 * @constructor
	 */
	var Model = Objs
	(
		"puremvc.Model",
		{
			/**
			 * HashTable of <code>Proxy</code> registered with the <code>Model</code>.
			 * 
			 * @type {Object}
			 * @protected
			 */
			proxyMap: null,

			/**
			 * Constructs a <code>Model</code> instance.
			 *
			 * This <code>Model</code> implementation is a singleton, so you should not call the
			 * constructor directly, but instead call the static singleton factory method
			 * <code>View.getInstance()</code>.
			 *
			 * @throws {Error}
			 * 		Throws an error if an instance for this singleton has already been constructed.
			 *
			 */
			initialize: function()
			{
				if( Model.instance )
					throw Error( Model.SINGLETON_MSG );

				Model.instance = this;
				this.proxyMap = {};
				this.initializeModel();
			},

			/**
			 * Initialize the singleton <code>Model</code> instance.
			 *
			 * Called automatically by the constructor. This is the opportunity to initialize the
			 * singleton instance in a subclass without overriding the constructor.
			 *
			 * @protected
			 */
			initializeModel: function()
			{

			},

			/**
			 * Register a <code>Proxy</code> with the <code>Model</code>.
			 *
			 * @param {Proxy} proxy
			 *		A <code>Proxy</code> to be held by the <code>Model</code>.
			 */
			registerProxy: function( proxy )
			{
				this.proxyMap[proxy.getProxyName()] = proxy;
				proxy.onRegister();
			},

			/**
			 * Remove a <code>Proxy</code> from the <code>Model</code>.
			 *
			 * @param {String} proxyName
			 *		The name of the <code>Proxy</code> instance to be removed.
			 *
			 * @return {Proxy}
			 *		The <code>Proxy</code> that was removed from the <code>Model</code> or an
			 *		explicit <code>null</null> if the <code>Proxy</code> didn't exist.
			 */
			removeProxy: function( proxyName )
			{
				var proxy/*Proxy*/ = this.proxyMap[ proxyName ];
				if( proxy )
				{
					delete this.proxyMap[ proxyName ];
					proxy.onRemove();
				}
			
				return proxy;
			},

			/**
			 * Retrieve an <code>Proxy</code> from the <code>Model</code>.
			 *
			 * @param {String} proxyName
			 *		 The <code>Proxy</code> name to retrieve from the <code>Model</code>.
			 *
			 * @return {Proxy}
			 *		The <code>Proxy</code> instance previously registered with the given
			 *		<code>proxyName</code> or an explicit <code>null</code> if it doesn't exists.
			 */
			retrieveProxy: function( proxyName )
			{
				//Return a strict null when the proxy doesn't exist
				return this.proxyMap[ proxyName ] || null;
			},

			/**
			 * Check if a <code>Proxy</code> is registered.
			 *
			 * @param {String} proxyName
			 *		The name of the <code>Proxy</code> to verify the existence of its registration.
			 *
			 * @return {Boolean}
			 *		A Proxy is currently registered with the given <code>proxyName</code>.
			 */
			hasProxy: function( proxyName )
			{
				return this.proxyMap[proxyName] != null;
			}
		}
	);

	/**
	 * Error message used to indicate that a <code>Model</code> singleton is already
	 * constructed when trying to constructs the class twice.
	 *
	 * @static
	 * @constant
	 * @type {String}
	 * @protected
	 */
	Model.SINGLETON_MSG = "Model Singleton already constructed!";

	/**
	 * <code>Model</code> singleton instance local reference.
	 *
	 * @type {Model}
	 * @protected
	 */
	Model.instance = null;
	
	/**
	 * <code>Model</code> singleton factory method.
	 *
	 * @return {Model}
	 * 		The singleton instance of <code>Model</code>.
	 */
	Model.getInstance = function()
	{
		if( !Model.instance )
			Model.instance = new Model();

		return Model.instance;
	}
};

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Model = Objs("puremvc.Model");
/*
 PureMVC Javascript Objs by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
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
			 * Constructs a <code>Controller</code> instance.
			 *
			 * This <code>Controller</code> implementation is a singleton, so you should not call the
			 * constructor directly, but instead call the static singleton factory method
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
			 * Initialize the singleton <code>Controller</code> instance.
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
		 	 *		The <code>Notification</code> the command will receive as parameter.
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
			 * Register a particular <code>SimpleCommand</code> or <code>MacroCommand</code> class
			 * as the handler for a particular <code>Notification</code>.
			 *
			 * If a <code>SimpleCommand</code> or <code>MacroCommand</code> has already been
			 * registered to handle <code>Notification</code>s with this name, it is no longer
			 * used, the new <code>SimpleCommand</code> or <code>MacroCommand</code> is used
			 * instead.
			 *
			 * The <code>Observer</code> for the new <code>SimpleCommand</code> or
			 * <code>MacroCommand</code> is only created if this is the first time a
			 * <code>SimpleCommand</code> or <code>MacroCommand</code> has been registered for this
			 * <code>Notification</code> name.
			 *
			 * @param {String} notificationName
			 * 		The name of the <code>Notification</code>.
			 *
			 * @param {Function} commandClassRef
			 * 		The constructor of the <code>SimpleCommand</code> or <code>MacroCommand</code>.
			 */
			registerCommand: function( notificationName, commandClassRef )
			{
				if( !this.commandMap[notificationName] )
					this.view.registerObserver( notificationName, new Observer( this.executeCommand, this ) );

				this.commandMap[notificationName] = commandClassRef;
			},

			/**
			 * Check if a <code>SimpleCommand</code> or <code>MacroCommand</code> is registered for
			 * a given <code>Notification</code>.
			 *
			 * @param {String} notificationName
			 * 		Name of the <code>Notification</code> to check wheter a
			 *		<code>SimpleCommand</code> or <code>MacroCommand</code> is registered for.
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
				//If the Command is registered...
				if( this.hasCommand(notificationName) )
				{
					this.view.removeObserver( notificationName, this );
					delete this.commandMap[notificationName];
				}
			}
		}
	);

	/**
	 * Error message used to indicate that a <code>Controller</code> singleton is already
	 * constructed when trying to constructs the class twice.
	 *
	 * @static
	 * @constant
	 * @protected
	 * @type {String}
	 */
	Controller.SINGLETON_MSG = "Controller singleton already constructed!";

	/**
	 * Singleton instance local reference.
	 *
	 * @static
	 * @type {puremvc.Controller}
	 * @protected
	 */
	Controller.instance = null;

	/**
	 * <code>Controller</code> singleton factory method.
	 *
	 * @return {puremvc.Controller}
	 * 		The singleton instance of <code>Controller</code>
	 *
	 * @static
	 */
	Controller.getInstance = function()
	{
		if( !Controller.instance )
			Controller.instance = new Controller();

		return Controller.instance;
	};
};

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Controller = Objs("puremvc.Controller");
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
	 * A base singleton <code>Facade</code> implementation.
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
			 * This <code>Facade</code> implementation is a singleton, so you should not call the
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
			 * Initialize the <code>Controller</code>.
			 *
			 * Called by the <code>initializeFacade</code> method. Override this method in your
			 * subclass of <code>Facade</code> if one or both of the following are true:
			 * 
			 * <UL>
			 * <LI>You wish to initialize a different <code>Controller</code>.
			 * <LI>You have <code>SimpleCommand</code>s or a <code>MacroCommand</code>s to register
			 * with the <code>Controller</code> at startup.
			 *
			 * If you don't want to initialize a different <code>Controller</code>, call
			 * <code>Facade.initializeController.call(this)</code> at the beginning of your method,
			 * then register <code>SimpleCommand</code>s or <code>MacroCommand</code>s.
			 *
			 * @protected
			 */
			initializeController: function()
			{
				if( !this.controller )
					this.controller = Controller.getInstance();
			},

			/**
			 * Register a <code>SimpleCommand</code> or a <code>MacroCommand</code> with the
			 * <code>Controller</code> associating it to a <code>Notification</code> name.
			 *
			 * @param {String} notificationName
			 * 		The name of the <code>Notification</code> to associate the <code>Command</code>
			 * 		with.
			 *
			 * @param {Function} commandClassRef
			 * 		A reference to the constructor of the <code>SimpleCommand</code> or a
			 *		<code>MacroCommand</code>.
			 */
			registerCommand: function( notificationName, commandClassRef )
			{
				this.controller.registerCommand( notificationName, commandClassRef );
			},

			/**
			 * Remove a previously registered <code>SimpleCommand</code> or a
			 * <code>MacroCommand</code> to <code>Notification</code> mapping from the
			 * <code>Controller</code>.
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
				var mediator/*Mediator*/;
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
	 * Error message used to indicate that a <code>Facade</code> singleton is already
	 * constructed when trying to constructs the class twice.
	 *
	 * @static
	 * @constant
	 * @protected
	 * @type {String}
	 */
	Facade.SINGLETON_MSG = "Facade Singleton already constructed!";

	/**
	 * Singleton Facade instance.
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
	};
};

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Facade = Objs("puremvc.Facade");
/*
 PureMVC Javascript Objs by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	var Facade = Objs("puremvc.Facade");

	/**
	 * @classDescription
	 * The base <code>Notifier</code> class.
	 *
	 * <code>MacroCommand</code>, <code>Command</code>, <code>Mediator</code> and <code>Proxy</code>
	 * all have a need to send <code>Notifications</code>.
	 * 
	 * The <code>Notifier</code> base class provides a common method called
	 * <code>sendNotification</code> that relieves implementation code of the necessity to actually
	 * construct <code>Notification</code>s.
	 *
	 * The <code>Notifier</code> class, which all of the above mentioned classes extend, provides an
	 * initialized reference to the <code>Facade</code> singleton, which is required by the
	 * convenience method <code>sendNotification</code>	for sending <code>Notifications</code>, but
	 * it also eases implementation as these classes have frequent <code>Facade</code> interactions
	 * and usually require access to the facade anyway.
	 *
	 * @constructor
	 */
	Objs
	(
		"puremvc.Notifier",
		{
			/**
			 * Local reference to the singleton <code>Facade</code>.
			 *
			 * @type {Facade}
			 * @protected
			 */
			facade: null,

			/**
			 * @constructs
			 *
			 * Constructs a <code>Notifier</code> instance.
			 */
			initialize: function()
			{
				this.facade = Facade.getInstance();
			},

			/**
			 * Create and send a <code>Notification</code>.
			 *
			 * Keeps us from having to construct new <code>Notification</code> instances in our
			 * implementation code.
			 * 
			 * @param {String} name
			 * 		The name of the notification to send.
			 * 
			 * @param {Object} body
			 * 		The body of the notification (optional).
			 *
			 * @param {String} type
			 * 		The type of the notification (optional).
			 */
			sendNotification: function( name, body, type )
			{
				this.facade.sendNotification( name, body, type );
			}
		}
	);
};

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Notifier = Objs("puremvc.Notifier");
/*
 PureMVC Javascript Objs by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	/**
	 * @classDescription
	 * The base <code>SimpleCommand</code> class.
	 * 
	 * Your subclass should override the <code>execute</code> method where your business logic will
	 * handle the <code>Notification</code>.
	 *
	 * As in JavaScript there isn't interfaces, <code>SimpleCommand</code> and
	 * <code>MacroCommand</code> cannot offer the guarantee to have the right signature. We could
	 * have inherited from a common <code>Command</code> class, but to avoid an unwanted complexity
	 * and to respect PureMVC implementation, this is to the developer to take care to inherit from
	 * <code>SimpleCommand</code> in its command and <code>MacroCommand</code> depending on his
	 * need.
	 * 
	 * @extends puremvc.Notifier Notifier
	 *
	 * @constructor
	 */
	Objs
	(
		"puremvc.SimpleCommand",
		"puremvc.Notifier",
		{
			/**
			 * Fulfill the use-case initiated by the given <code>Notification</code>.
			 *
			 * In the Command Pattern, an application use-case typically begins with some user action,
			 * which results in a <code>Notification</code> being broadcast, which is handled by
			 * business logic in the <code>execute</code> method of an <code>SimpleCommand</code> or
			 * <code>MacroCommand</code>.
			 *
			 * @param {Notification} notification 
			 * 		The <code>Notification</code> to handle.
			 */
			execute: function( notification )
			{

			}
		}
	);
};

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	SimpleCommand = Objs("puremvc.SimpleCommand");
/*
 PureMVC Javascript Objs by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	/**
	 * @classDescription 
	 * A base <code>Command</code> implementation that executes other <code>Command</code>s.
	 *
	 * A <code>MacroCommand</code> maintains an list of <code>Command</code> constructor references
	 * called <i>SubCommand</i>s.
	 *
	 * When <code>execute</code> is called, the <code>MacroCommand</code> instantiates and calls
	 * <code>execute</code> on each of its <i>SubCommands</i> turn. Each <i>SubCommand</i> will be
	 * passed a reference to the original <code>Notification</code> that was passed to the
	 * <code>MacroCommand</code>'s <code>execute</code> method.
	 *
	 * Unlike <code>SimpleCommand</code>, your subclass should not override <code>execute</code>,
	 * but instead, should override the <code>initializeMacroCommand</code> method, calling
	 * <code>addSubCommand</code> once for each <i>SubCommand</i> to be executed.
	 *
	 * As in JavaScript there isn't interfaces, <code>SimpleCommand</code> and
	 * <code>MacroCommand</code> cannot offer the guarantee to have the right signature. We could
	 * have inherited from a common <code>Command</code> class, but to avoid an unwanted complexity
	 * and to respect PureMVC implementation, this is to the developer to take care to inherit from
	 * <code>SimpleCommand</code> in its command and <code>MacroCommand</code> depending on his
	 * need.
	 * 
	 * @extends puremvc.Notifier Notifier
	 * 
	 * @constructor
	 */
	var MacroCommand = Objs
	(
		"puremvc.MacroCommand",
		"puremvc.Notifier",
		{
			/**
			 * An array of <code>SimpleCommand</code>s, subclasses of or <code>MacroCommand</code>s.
			 * 
			 * @type {Array}
			 * @protected
			 */
			subCommands: null,

			/**
			 * @constructs
			 *
			 * Constructs a <code>MacroCommand</code> instance.
			 *
			 * You should not need to override this method in your subclasses, instead, override
			 * the <code>initializeMacroCommand</code> method.
			 */
			initialize: function()
			{
				MacroCommand.$super.initialize.call(this);

				this.subCommands = [];
				this.initializeMacroCommand();
			},

			/**
			 * Initialize the <code>MacroCommand</code>.
			 *
			 * In your subclass, override this method to initialize the <code>MacroCommand</code>'s
			 * <i>subCommands</i> list with <code>Command</code> class references like this:
			 *
			 * <pre>
			 *    // Initialize MyMacroCommand
			 *    initializeMacroCommand: function()
			 *    {
			 *    	this.addSubCommand( FirstCommand );
			 *      this.addSubCommand( SecondCommand );
			 *      this.addSubCommand( ThirdCommand );
			 *    }
			 * </pre>
			 *
			 * Note that <i>subCommand</i>s may be any of <code>MacroCommand</code>s or 
			 * <code>SimpleCommands</code> class or subclasses.
			 *
			 * In the JavaScript version it means that it only needs to implement an execute method
			 * and inherits from <code>Notifier</code>.
			 *
			 * @protected
			 */
			initializeMacroCommand: function()
			{
		
			},

			/**
			 * Add an entry to the <i>subCommands</i> list.
			 *
			 * The <i>subCommands</i> will be called in First In/First Out (FIFO) order.
			 *
			 * @param {Function} commandClassRef
			 * 		A reference to the constructor of the <code>Command</code>.
			 *
			 * @protected
			 */
			addSubCommand: function( commandClassRef )
			{
				this.subCommands.push( commandClassRef );
			},

			/**
			 * Execute this <code>MacroCommand</code>'s <i>SubCommands</i>.
			 *
			 * The <i>subCommands</i> will be called in First In/First Out (FIFO)
			 * order.
			 *
			 * @param {Notification} notification
			 *		The <code>Notification</code> object to be passed to each <i>SubCommand</i> of
			 *		the list.
			 *
			 * @final
			 */
			execute: function( notification )
			{
				var	subCommands/*Array*/ = this.subCommands.slice(0);
				var len/*Number*/ = this.subCommands.length;
				for( var i/*Number*/=0; i<len; i++ )
				{
					var commandClassRef/*Function*/ = subCommands[i];
					var commandInstance/*Command*/ = new commandClassRef();
					commandInstance.execute( notification );
				}

				this.subCommands.splice(0);
			}
		}
	);
};

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	MacroCommand = Objs("puremvc.MacroCommand");
/*
 PureMVC Javascript Objs by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	/**
	 * @classDescription
	 * The base <code>Mediator</code> class.
	 * 
	 * Typically, a <code>Mediator</code> will be written to serve one specific control or group
	 * controls and so, will not have a need to be dynamically named.
	 *
	 * @extends puremvc.Notifier Notifier
	 * 
	 * @constructor
	 */
	var Mediator = Objs
	(
		"puremvc.Mediator",
		"puremvc.Notifier",
		{
			/**
			 * The name of the <code>Mediator</code>. Should only be accessed by
			 * <code>Mediator</code> subclasses.
			 * 
			 * @type {String}
			 * @protected
			 */
			mediatorName: null,

			/**
			 * The <code>Mediator</code>'s view component. Should only be accessed by
			 * <code>Mediator</code> subclasses.
			 * 
			 * @type {Object}
			 * @protected
			 */
			viewComponent: null,

			/**
			 * @constructs
			 *
			 * Constructs a <code>Mediator</code> instance.
			 *
			 * @param {String} mediatorName
			 * 		The name of the <code>Mediator</code>.
			 *
			 * @param {Object} viewComponent
			 * 		The view component handled by this <code>Mediator</code>.
			 *
			 */
			initialize: function( mediatorName, viewComponent )
			{
				Mediator.$super.initialize.call(this);

				this.mediatorName = (mediatorName != null) ? mediatorName : Mediator.NAME;
				this.viewComponent = viewComponent;
			},
			
			/**
			 * Get the name of the <code>Mediator</code>.
			 *
			 * @return {String}
			 * 		The <code>Mediator</code> name.
			 */
			getMediatorName: function()
			{
				return this.mediatorName;
			},
			
			/**
			 * Get the Mediators view component.
			 * 
			 * Additionally, an optional explicit getter can be
			 * be defined in the subclass that defines the 
			 * view components, providing a more semantic interface
			 * to the Mediator.
			 * 
			 * This is different from the AS3 implementation in
			 * the sense that no casting is required from the
			 * object supplied as the view component.
			 * 
			 *     getComboBox: function ()
			 *     {
			 *         return this.viewComponent;  
			 *     }
			 * 
			 * @return {Object}
			 * 		The view component
			 */
			getViewComponent: function()
			{
				return this.viewComponent;
			},
			
			/**
			 * Set the <code>Mediator</code>'s view component.
			 *
			 * @param {Object} viewComponent
			 * 		The view component.
			 */
			setViewComponent: function( viewComponent )
			{
				this.viewComponent = viewComponent;
			},
			
			/**
			 * List the <code>Notification</code> names this <code>Mediator</code> is interested in
			 * being notified of.
			 *
			 * @return {Array}
			 * 		The list of notifications names in which is interested the
			 *		<code>Mediator</code>.
			 */
			listNotificationInterests: function()
			{
				return [];
			},
			
			/**
			 * Handle <code>Notification</code>s.
			 *
			 * Typically this will be handled in a switch statement, with one 'case' entry per
			 * <code>Notification</code> the <code>Mediator</code> is interested in.
			 *
			 * @param {Notification} notification
			 * 		The notification instance to be handled.
			 */
			handleNotification: function( notification )
			{
			
			},

			/**
			 * Called by the View when the Mediator is registered. This method has to be overridden
			 * by the subclass to know when the instance is registered.
			 */
			onRegister: function()
			{

			},
			
			/**
			 * Called by the View when the Mediator is removed. This method has to be overridden
			 * by the subclass to know when the instance is removed.
			 */
			onRemove: function()
			{

			}
		}
	);

	/**
	 * Default name of the <code>Mediator</code>.
	 * 
	 * @type {String}
	 * @constant
	 */
	Mediator.NAME = "Mediator";
};

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Mediator = Objs("puremvc.Mediator");
/*
 PureMVC Javascript Objs by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	/**
	 * @classDescription
	 * The base <code>Proxy</code> class.
	 *
	 * In PureMVC, <code>Proxy</code> classes are used to manage parts of the application's data
	 * model.
	 *
	 * A <code>Proxy</code> might simply manage a reference to a local data object, in which case
	 * interacting with it might involve setting and getting of its data in synchronous fashion.
	 *
	 * <code>Proxy</code> classes are also used to encapsulate the application's interaction with
	 * remote services to store or retrieve data, in which case, we adopt an asynchronous idiom
	 * setting data (or calling a method) on the <code>Proxy</code> and listening for a
	 * <code>Notification</code> to be sent when the <code>Proxy</code> has retrieved the data from
	 * the service.
	 *
	 * @extends puremvc.Notifier Notifier
	 * 
	 * @constructor
	 */
	var Proxy = Objs
	( 
		"puremvc.Proxy",
		"puremvc.Notifier",
		{

			/**
			 * The name of the <code>Proxy</code>.
			 * 
			 * @type {String}
			 * @protected
			 */
			proxyName: null,
			
			/**
			 * The data object controlled by the <code>Proxy</code>.
			 *
			 * @type {Object}
			 * @protected
			 */
			data: null,

			/**
			 * @constructs
			 *
			 * Constructs a <code>Proxy</code> instance.
			 *
			 * @param {String} proxyName
			 * 		The name of the <code>Proxy</code> instance.
			 *
			 * @param {Object} data
			 * 		An initial data object to be held by the <code>Proxy</code>.
			 */
			initialize: function( proxyName, data )
			{
				Proxy.$super.initialize.call(this);

				this.proxyName = (proxyName != null) ? proxyName : Proxy.NAME;
				if( data != null )
					this.setData(data);
			},

			/**
			 * Get the name of the <code>Proxy></code> instance.
			 *
			 * @return {String}
			 * 		The name of the <code>Proxy></code> instance.
			 */
			getProxyName: function()
			{
				return this.proxyName;
			},

			/**
			 * Set the data of the <code>Proxy></code> instance.
			 *
			 * @param {Object} data
			 * 		The data to set for the <code>Proxy></code> instance.
			 */
			setData: function( data )
			{
				this.data = data;
			},

			/**
			 * Get the data of the <code>Proxy></code> instance.
			 *
			 * @return {Object}
			 * 		The data held in the <code>Proxy</code> instance.
			 */
			getData: function()
			{
				return this.data;
			},

			/**
			 * Called by the Model when the <code>Proxy</code> is registered. This method has to be
			 * overridden by the subclass to know when the instance is registered.
			 */
			onRegister: function()
			{
			
			},

			/**
			 * Called by the Model when the <code>Proxy</code> is removed. This method has to be
			 * overridden by the subclass to know when the instance is removed.
			 */
			onRemove: function()
			{
			
			}
		}
	);

	/**
	 * The default name of the <code>Proxy</code>
	 * 
	 * @static
	 * @constant
	 * @type {String}
	 */
	Proxy.NAME = "Proxy";
};

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Proxy = Objs("puremvc.Proxy");
