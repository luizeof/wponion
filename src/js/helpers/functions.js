/* global arguments:true */
/* global console:true */
/* global tippy:true */

let WPOButton = function( element, options ) {
	this.DEFAULTS  = {
		loadingText: window.wponion.core.txt( 'processing', 'Loading ...' ),
		spinner: 'spinner is-active',
	};
	this.$element  = jQuery( element );
	this.options   = jQuery.extend( {}, this.DEFAULTS, options );
	this.isLoading = false;
};

WPOButton.prototype.setState = function( state ) {
	let d    = 'disabled';
	let $el  = this.$element;
	let val  = $el.is( 'input' ) ? 'val' : 'html';
	let data = $el.data();

	state += 'Text';

	if( data.resetText == null ) {
		$el.data( 'resetText', $el[ val ]() );
	}

	setTimeout( jQuery.proxy( function() {
		let $state = ( false !== window.wponion._.isUndefined( $el.data( state ) ) ) ? this.options[ state ] : $el.data( state );

		if( 'html' === val && 'loadingText' === state ) {
			$state += ' ' + '<span class="' + this.options.spinner + ' wpo-spinner"></span>';
		}

		$el[ val ]( $state );

		if( 'loadingText' === state ) {
			this.isLoading = true;
			$el.addClass( d ).attr( d, d ).prop( d, true );
		} else if( this.isLoading ) {
			this.isLoading = false;
			$el.removeClass( d ).removeAttr( d ).prop( d, false );
		}

		if( 'val' === val ) {
			if( true === this.isLoading ) {
				$el.parent().append( jQuery( '<span class="' + this.options.spinner + ' wpo-spinner"></span>' ) );
			} else {
				$el.parent().find( '.wpo-spinner' ).remove();
			}
		}

	}, this ), 0 );
};

export default ( ( window, document, $, jQuery ) => {

	/**
	 * WPOnion Related Functions.
	 */
	$.fn.extend( {
		/**
		 * Animate CSS Related Functions.
		 */
		animateCss: function( animationName, callback ) {
			let animationEnd = ( function( el ) {
				let animations = {
					animation: 'animationend',
					OAnimation: 'oAnimationEnd',
					MozAnimation: 'mozAnimationEnd',
					WebkitAnimation: 'webkitAnimationEnd',
				};

				for( let t in animations ) {
					if( el.style[ t ] !== undefined ) {
						return animations[ t ];
					}
				}
			} )( document.createElement( 'div' ) );

			this.addClass( 'animated ' + animationName ).one( animationEnd, function() {
				$( this ).removeClass( 'animated ' + animationName );
				if( typeof callback === 'function' ) {
					callback( $( this ) );
				}
			} );

			return this;
		},

		/**
		 * A Custom Wrap Class To Handle Tippy Instance
		 * @param $arguments
		 * @returns {*}
		 */
		tippy: function( $arguments ) {
			let tippy_helper = {
				create_instance: function( $elem, $arguments ) {
					$arguments = ( typeof $arguments === 'undefined' ) ? {} : $arguments;
					if( $elem.attr( 'data-tippy-instance-id' ) === undefined ) {
						let $_instance_id = 'Tippy' + window.wponion.core.rand_id();
						$elem.attr( 'data-tippy-instance-id', $_instance_id );

						let $title      = $elem.attr( 'title' );
						let $data_tippy = $elem.attr( 'data-tippy' );

						if( $title && $title !== '' ) {
							if( typeof $arguments.content === 'undefined' ) {
								$arguments.content = $title;
							}
						}

						if( $data_tippy && $data_tippy !== '' ) {
							if( typeof $arguments.content === 'undefined' ) {
								$arguments.content = $data_tippy;
							}
						}

						window[ $_instance_id ] = tippy( $elem[ 0 ], $arguments );
						return true;
					}
					return false;
				},
				get_instance: function( $elem ) {
					if( $elem.attr( 'data-tippy-instance-id' ) === undefined ) {
						return false;
					}
					let $_instance_id = $elem.attr( 'data-tippy-instance-id' );
					return ( undefined !== window[ $_instance_id ] ) ? window[ $_instance_id ] : false;
				}
			};

			if( this.length > 1 ) {
				this.each( function() {
					tippy_helper.create_instance( jQuery( this ), $arguments );
				} );
				return true;
			} else {
				let $status = tippy_helper.create_instance( jQuery( this ), $arguments );
				return ( true === $status ) ? tippy_helper.get_instance( jQuery( this ) ) : false;
			}
		},

		/**
		 * Returns An Active instance
		 * @returns {boolean}
		 */
		tippy_get: function() {
			if( jQuery( this ).attr( 'data-tippy-instance-id' ) === undefined ) {
				return false;
			}
			let $_instance_id = jQuery( this ).attr( 'data-tippy-instance-id' );
			return ( undefined !== window[ $_instance_id ] ) ? window[ $_instance_id ] : false;
		},

		/**
		 * Copy Element Attr To Another Attr.
		 * @param from
		 * @param to
		 */
		copyAttr: function( from, to ) {
			if( jQuery( this ).length > 1 ) {
				jQuery( this ).each( function() {
					jQuery( this ).copyAttr( from, to );
				} );
			} else {
				var $existing = jQuery( this ).attr( from );
				if( typeof $existing !== 'undefined' || $existing !== undefined ) {
					jQuery( this ).attr( to, $existing );
				}
			}
		},

		/**
		 * Move Element Attr To Another Attr.
		 * @param from
		 * @param to
		 */
		moveAttr: function( from, to ) {
			if( jQuery( this ).length > 1 ) {
				jQuery( this ).each( function() {
					jQuery( this ).moveAttr( from, to );
				} );
			} else {
				jQuery( this ).copyAttr( from, to );
				jQuery( this ).removeAttr( from );
			}
		},

		/**
		 * Adds Bootstrap Button Element
		 */
		wponion_button: function Plugin( option ) {
			return this.each( function() {
				var $this   = $( this );
				var data    = $this.data( 'wpobs.button' );
				var options = typeof option === 'object' && option;

				if( !data ) {
					$this.data( 'wpobs.button', ( data = new WPOButton( this, options ) ) );
				}

				data.setState( option );
			} );
		},
	} );

	/**
	 * Returns A Abstract Class Instance.
	 * @param $elem
	 * @param $contxt
	 * @returns {{ajax(*=, *=): *, js_error(*): void, init_field(*=, *=): void, set_args(*): *, js_validate_elem(*=, *): void, js_error_handler(*=): void, id(): *, init_single_field(*=, *=): void, field_debug(): (undefined), handle_args(*=, *=): (*|$data), maybe_js_validate_elem(*=, *=): void, get_field_parent_by_id(*=): (*|jQuery|HTMLElement), option(*=, *=): *, options(): *, js_validator(): void, init(), reload(): *, module(): *, ui_menu_handler(): void, module_init(), set_element(*=): *, set_contxt(*): *, hook: *, element: *, contxt: *}}
	 */
	window.wponion_field = ( $elem, $contxt = {} ) => new window.wponion.field_abstract( $elem, $contxt );

	/**
	 * Triggers Theme Init.
	 * @param $element
	 * @returns {{addAction, removeAction, applyFilters, removeFilter, addFilter, doAction}}
	 */
	window.wponion_theme = ( $element ) => window.wponion.hooks.doAction( 'wponion_theme_init', $element );

	/**
	 *
	 * @param $element
	 * @returns {{}|*}
	 */
	window.wponion_dependency = ( $element = false, $args = false ) => new window.wponion.dependency( $element, $args );

	/**
	 * Handles WPOnion Notices.
	 * @param $elem
	 * @returns {*}
	 */
	window.wponion_notice = ( $elem ) => {
		if( $elem.length > 1 ) {
			$elem.each( function() {
				wponion_notice( jQuery( this ) );
			} );
		} else {
			if( $elem.find( '.wponion-remove' ).length > 0 ) {
				$elem.each( function() {
					let $_el = jQuery( this );
					jQuery( this ).find( '.wponion-remove' ).tippy( {
						appendTo: () => jQuery( this )[ 0 ],
					} );
					jQuery( this ).find( '.wponion-remove' ).on( 'click', function() {
						$_el.slideUp( 'slow', function() {
							$_el.remove();
						} );
					} );
				} );
				return $elem;
			}

			let $auto = $elem.attr( 'data-autoclose' );
			if( $auto ) {
				$auto     = parseInt( $auto );
				let $left = $auto / 1000;
				if( $elem.find( '.wpo-counter' ).length === 1 ) {
					let $runnder = setInterval( function() {
						$elem.find( '.wpo-counter' ).html( $left );
						$left -= 1;
						if( $left < 0 ) {
							clearInterval( $runnder );
							$elem.find( '.wpo-counter' ).html( '0' );
						}
					}, 900 );
				}
				setTimeout( () => {
					$elem.slideUp( 'slow', () => {
						$elem.remove();
					} );
				}, $auto );
			}
		}
	};

	/**
	 * Basic WPOnion JS Setup.
	 */
	window.wponion_setup = () => {
		if( window.wponion._.isUndefined( window.wponion.core.settings_args ) ) {
			let $core = window.wponion.core.windowArgs( 'wponion_core', false );
			let $tans = window.wponion.core.windowArgs( 'wponion_il8n', false );
			if( false === $core ) {
				return;
			}
			window.wponion.core.settings_args    = $core;
			window.wponion.core.text             = $tans;
			window.wponion.core.debug_info       = null;
			window.wponion.core.field_debug_info = null;
		}
	};

	/**
	 * Registers With A Field Callback Hook.
	 * @param $type
	 * @param $callback
	 * @param $module
	 */
	window.wponion_register_field = ( $type, $callback, $module = '' ) => {
		$module = ( '' === $module ) ? '' : $module + '_';
		window.wponion.hooks.addAction( 'wponion_init_' + $module + 'field_' + $type, 'wponion_core', ( $elem ) => {
			try {
				$callback( $elem );
			} catch( e ) {
				console.error( arguments, ' \n' + e + '  \nFor : wponion_init_' + $module + 'field_' + $type );
			}
		} );
	};

	/**
	 * Function Used outside of WPOnion To Create
	 * @param $init_method
	 * @param $methods
	 * @returns {{init: *, new(): $class, prototype: $class}}
	 */
	window.wponion_create_field = ( $init_method, $methods = false ) => {
		let $org_class = require( '../core/field' ).default;
		let $class     = class extends $org_class {
		};

		$class.prototype.init = $init_method;

		if( window.wponion._.isObject( $methods ) ) {
			for( let $key in $methods ) {
				if( $methods.hasOwnProperty( $key ) ) {
					$class.prototype[ $key ] = $methods[ $key ];
				}
			}
		}
		return $class;
	};

	/**
	 * Triggers A Field JS Function To Render it Properly
	 * @param $field_type
	 * @param $argument
	 * @param $module
	 * @param $log_err
	 */
	window.wponion_init_field = ( $field_type, $argument, $module = '', $log_err = true ) => {
		$module = ( '' === $module ) ? '' : $module + '_';
		if( window.wponion.hooks.hasAction( 'wponion_init_' + $module + 'field_' + $field_type ) ) {
			window.wponion.hooks.doAction( 'wponion_init_' + $module + 'field_' + $field_type, $argument );
		} else {
			window.wponion_field( $argument );
			if( true === $log_err ) {
				console.info( 'WPOnion Field Type : ' + $field_type + ' Init Function Not Found', '\nAction Used : wponion_init_' + $module + 'field_' + $field_type );
			}
		}
	};

	/**
	 * Utility Functions.
	 */

	/**
	 * Creates A New Instance of Ajaxer and returns it.
	 * @param $args
	 * @returns {*}
	 */
	window.wponion_ajax = ( $args ) => {
		return new window.wponion.ajaxer( $args );
	};

	/**
	 *
	 * @param data
	 * @param file_name
	 * @param data_type
	 */
	window.wponion_js_file = ( data, file_name = 'file.json', data_type = 'data:text/json;charset=utf-8,' ) => {
		if( window.wponion._.isObject( data ) ) {
			data = encodeURIComponent( JSON.stringify( data ) );
		}

		let dataStr            = data_type + data;
		let downloadAnchorNode = document.createElement( 'a' );
		downloadAnchorNode.setAttribute( 'href', dataStr );
		downloadAnchorNode.setAttribute( 'download', file_name );
		document.body.appendChild( downloadAnchorNode );
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	};

	/**
	 * Creates A Swal With BootStrap Button Class.
	 * @returns {*|Function|Object|void}
	 */
	window.wponion_bs_swal = () => {
		return window.swal.mixin( {
			customClass: {
				confirmButton: 'wpo-btn wpo-btn-success',
				cancelButton: 'wpo-btn wpo-btn-danger'
			},
			buttonsStyling: false,
		} );
	};

	/**
	 * Creates A Swal Toast.
	 * @returns {*|Function|Object|void}
	 */
	window.wponion_swal_toast = () => {
		return window.swal.mixin( {
			toast: true,
			type: 'success',
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000
		} );
	};

	jQuery( window ).on( 'load', function() {

		jQuery( '.wponion-framework pre' ).tippy( {
			theme: 'dark',
			content: 'Click To Copy',
			trigger: 'mouseenter click manual',
			arrow: true,
			followCursor: true,
			hideOnClick: false,
			placement: 'bottom',
		} );

		let clipboard = new ClipboardJS( '.wponion-framework pre', {
			text: function( trigger ) {
				return jQuery( trigger ).html();
			}
		} );

		clipboard.on( 'success', function( e ) {
			let $ins = jQuery( e.trigger ).tippy_get();
			/*$ins.show();
			*/
			$ins.setContent( '<strong>Copied !</strong>' );
			$ins.show();
			setTimeout( function() {
				$ins.hide();
				$ins.setContent( 'Click To Copy' );
			}, 1000 );

			/*window.wponion_swal_toast().fire( {
				title: 'Copied',
				target: e.trigger,
				position: 'top-end',
				customContainerClass: 'position-absolute',
			} );*/
		} );
	} );
} )( window, document, jQuery, jQuery );
