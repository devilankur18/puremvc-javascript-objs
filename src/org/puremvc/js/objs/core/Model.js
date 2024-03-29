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