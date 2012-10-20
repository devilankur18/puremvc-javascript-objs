/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/
new function()
{
	var Observer = Objs("puremvc.Observer");

	/**
	 * @classDescription
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
	 * @see puremvc.Mediator Mediator
	 * @see puremvc.Observer Observer
	 * @see puremvc.Notification Notification
	 * 
	 * @constructor
	 */
	var View = Objs
	(
		"puremvc.View",
		{
			/**
			 * @private
			 *
			 * Mapping of <code>Mediator</code> names to <code>Mediator</code> instances.
			 *
			 * @type {Object}
			 */
			mediatorMap: null,
			
			/**
			 * @private
			 * 
			 * Mapping of <code>Notification</code> names to
			 * <code>Observers</code> lists.
			 *
			 * @type {Object}
			 */
			observerMap: null,
			
			/**
			 * Initialize a <code>View</code> instance.
			 * 
			 * @throws {Error}
			 * 		Throws an error if an instance for this singleton has already been constructed.
			 */
			initialize: function()
			{
				if( View.instance )
					throw Error( View.SINGLETON_MSG );
			
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
			initializeView: function() {},
			
			/**
			 * Register an <code>Observer</code> to be notified of <code>Notifications</code> with a
			 * given name.
			 *
			 * @param {String} notificationName
			 * The name of the <code>Notification</code>s to notify this <code>Observer</code> of.
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
			 * Notify the <code>Observer</code>s for a particular <code>Notification</code>.
			 *
			 * All previously attached <code>Observer</code>s for this <code>Notification</code>'s
			 * list are notified and are passed a reference to the <code>Notification</code> in the
			 * order in which they were registered.
			 *
			 * @param {Notification} note
			 * 		The <code>Notification</code> to notify <code>Observer</code>s of.
			 */
			notifyObservers: function( note )
			{
				var notificationName/*String*/ = note.getName();
			
				var observersRef/*Array*/ = this.observerMap[notificationName];
				if( observersRef )
				{
					// Copy the array.
					var observers/*Array*/ = observersRef.slice(0);
					var len/*Number*/ = observers.length;
					for( var i/*Number*/=0; i<len; i++ )
					{
						var observer/*Observer*/ = observers[i];
						observer.notifyObserver(note);
					}
				}
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
			 * 		A reference to the <code>Mediator</code> instance.
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
				if( len )
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
			 *		Name of the <code>IMediator</code> instance to be removed.
			 *
			 * @return {Mediator}
			 *		The <code>Mediator</code> that was removed from the <code>View</code> or a
			 *		strict <code>null</null> if the <code>Mediator</code> didn't exist.
			 */
			removeMediator: function( mediatorName )
			{
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
	 * @constant
	 * @type {String}
	 * @private
	 */
	View.SINGLETON_MSG = "View Singleton already constructed!";
	
	/**
	 * @type {View}
	 * @private
	 */
	View.instance = null;
	
	/**
	 * Retrieve the singleton instance of the <code>View</code>.
	 * 
	 * @return {View}
	 * 		The singleton instance of the <code>View</code>.
	 */
	View.getInstance = function()
	{
		if( !View.instance )
			View.instance = new View();
	
		return View.instance;
	}
}

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	View = Objs("puremvc.View");