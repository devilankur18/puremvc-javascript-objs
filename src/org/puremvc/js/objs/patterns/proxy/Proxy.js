/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
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
			 * The data object controlled by the <code>Proxy</code>.
			 *
			 * @type {Object}
			 * @protected
			 */
			data: null,

			/**
			 * The name of the <code>Proxy</code>.
			 * 
			 * @type {String}
			 * @protected
			 */
			proxyName: null,

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
	 * @type {String}
	 * @constant
	 */
	Proxy.NAME = "Proxy";
};

//Offer a way to hide PureMVC from the global context.
if( typeof HidePureMVC == "undefined" )
	Proxy = Objs("puremvc.Proxy");