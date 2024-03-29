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