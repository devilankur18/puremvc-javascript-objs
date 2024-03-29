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