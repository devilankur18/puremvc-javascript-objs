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