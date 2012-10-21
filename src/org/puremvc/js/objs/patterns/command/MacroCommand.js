/*
 PureMVC Javascript for Objs port by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2011 Futurescale, Inc., Some rights reserved.
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
			 * An array of <code>SimpleCommands</code> or subclasses of.
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