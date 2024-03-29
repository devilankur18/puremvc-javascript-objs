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