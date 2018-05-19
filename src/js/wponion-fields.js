/**
 * @param window = Window Object
 * @param document = Document Object
 * @param $ = jQuery Object
 * @param wpo = $wponion object
 * @param wpf = $wonion.field object
 * @param wpt = $wponion.theme object.
 */
( ( window, document, $, wpo, $wpf, wp ) => {
	let wphooks = wp.hooks;

	/**
	 * Input Mask JS Handler.
	 */
	$wpf.fn.inputmask = function () {
		if ( this.elem.length > 0 ) {
			let $settings = this.arg( 'inputmask' );
			if ( $settings ) {
				this.elem.inputmask( $settings );
				wpo.__plugin_debug_info( this.elem, 'inputmask', $settings );
			}
		}
		return this;
	};

	/**
	 * Handles Maxlength Field.
	 */
	$wpf.fn.maxlength = function () {
		if ( this.elem.length > 0 ) {
			let $settings = this.arg( 'max_length' );
			if ( $settings ) {
				$settings[ 'appendToParent' ] = true;

				if ( $settings[ 'threshold' ] !== undefined ) {
					$settings[ 'threshold' ] = parseInt( $settings[ 'threshold' ] );
				}

				if ( $settings[ 'warningClass' ] === undefined ) {
					$settings[ 'warningClass' ] = 'badge badge-success';
				}

				if ( $settings[ 'limitReachedClass' ] === undefined ) {
					$settings[ 'limitReachedClass' ] = 'badge badge-danger';
				}

				this.elem.maxlength( $settings );
				wpo.__plugin_debug_info( this.elem, 'max_length', $settings );
			}
		}
		return this;
	};

	/**
	 * Renders Fields Debug Popup.
	 */
	$wpf.fn.field_debug = function () {
		if ( this.elem.find( '.wponion-field-debug' ).length > 0 ) {
			let $elem = this.elem;

			$elem.find( '.wponion-field-debug a.wponion-field-debug-handle' ).on( 'click', function () {
				let $data       = wpo._get_debug_info( $( this ), {} );
				let $divID      = wpo.field_js_id( $( this ) ) + 'debugINFO',
					$notice_txt = "<p class='wponion-field-debug-notice'>" + wpo.settings( 'debug_notice' ) + "</p>",
					$elem       = $( "<div id='" + $divID + "' class='wponion-field-debug-popup' ><div id='" + $divID + "' ></div> " + $notice_txt + "</div>" );

				let $ops = swal( {
					html: $elem,
					showConfirmButton: true,
					confirmButtonText: wpo.txt( 'get_json_output', 'Get JSON Output' ),
					showCloseButton: false,
					width: '800px',
					onOpen: ( () => {
						$( '#swal2-content > div > #' + $divID ).jsonView( $data ).overlayScrollbars( {
							className: "os-theme-dark",
							resize: "vertical",
						} );
					} )
				} ).then( ( result ) => {
					if ( result.value ) {
						swal( {
							width: '600px',
							html: '<textarea style="min-width:550px; min-height:300px">' + JSON.stringify( $data ) + '</textarea>'
						} )
					}
				} );
			} )
		}
		return this;
	};

	/**
	 * Icon Picker Field Handler.
	 */
	$wpf.fn.icon_picker = function () {
		let $_this      = this,
			$elem       = $_this.elem,
			$args       = $_this.args(),
			$input      = $elem.find( ".wponion-icon-picker-input" ),
			$remove_btn = $elem.find( 'button.wponion-remove-icon' ),
			$add_btn    = $elem.find( "button.wponion-add-icon" ),
			$preview    = $elem.find( 'span.wponion-icon-preview' );

		let $manager = {

			/**
			 * Stores POPUP Information.
			 */
			elems: null,

			/**
			 * Stores POPUP Information.
			 */
			popup: null,

			/**
			 * Stores POPUP Information.
			 */
			popupel: null,
			/**
			 * Creates A New Instance for ToolTip.
			 */
			init_tooltip: () => {
				if ( $args[ 'popup_tooltip' ] !== 'false' ) {
					let $tp = ( typeof $args[ 'popup_tooltip' ] === 'object' ) ? $args[ 'popup_tooltip' ] : {};
					if ( $manager.elems.length > 0 ) {
						$manager.elems.each( function () {
							tippy( $( this )[ 0 ], $tp );
						} );
					}
				}
			},

			/**
			 * Inits For each and every POPUP.
			 * @param $popupel
			 * @param $instance
			 */
			init: function ( $popupel, $instance ) {
				$manager.popupel = $popupel;
				$manager.popup   = $instance;
				$manager.elems   = $manager.popupel.find( "span.wponion-icon-preview" );
				let $height      = $manager.popupel.find( '.wponion-icon-picker-container-scroll' ).css( 'height' );
				$manager.popupel.find( '.wponion-icon-picker-container-scroll' ).css( 'height', $height );
				$manager.select();
				$manager.input();
				$manager.elems.on( 'click', function () {
					let $icon = $( this ).attr( 'data-icon' );
					$input.val( $icon ).trigger( 'change' );
					swal.closeModal();
				} );
				$manager.init_tooltip();
			},

			/**
			 * Works with POPUP Input Search.
			 */
			input: function () {
				$manager.popupel.find( 'div.wponion-icon-picker-model-header input[type=text]' )
						.on( 'keyup', function () {
							let $val = $( this ).val();
							$manager.elems.each( function () {
								if ( $( this ).attr( 'data-icon' ).search( new RegExp( $val, 'i' ) ) < 0 ) {
									$( this ).parent().hide();
								} else {
									$( this ).parent().show();
								}
							} );
						} );
			},

			/**
			 * Handles Selectbox in popup.
			 */
			select: function () {
				$manager.popupel.find( 'div.wponion-icon-picker-model-header select' ).on( 'change', function () {
					swal.enableLoading();
					let $val = $( this ).val();
					wpo.ajax( 'icon_picker', {
						data: {
							"wponion-icon-lib": $val,
						}
					}, ( $res ) => {
						if ( $res.success ) {
							swal.resetValidationError();
							$( $manager.popupel ).find( "#swal2-content" ).html( $res.data ).show();
							$( $manager.popupel )
								.find( '#swal2-content .wponion-icon-picker-container-scroll' )
								.overlayScrollbars( {
									className: "os-theme-dark",
									resize: "vertical",
								} );
							$manager.init( $manager.popupel, $manager.popup );

						} else {
							$( $manager.popupel ).find( ".wponion-icon-picker-container-scroll" ).remove();
							$manager.popup.showValidationError( $res.data );
						}
					}, () => {
						$manager.popup.showValidationError( wpo.txt( 'unknown_ajax_error' ) );
					}, () => {
						$manager.popup.disableLoading();
					} );
				} );
			}
		};

		if ( $input.val() === '' ) {
			$remove_btn.hide();
			$preview.hide();
		}


		/**
		 * Handles Blur Even / change even in inputfield.
		 */
		$input.on( 'keyup blur change keypress', function () {
			let $val = $( this ).val();

			if ( $val !== '' ) {
				$preview.html( '<i class="' + $val + '"></i>' ).show();
				$remove_btn.show();
			} else {
				$preview.hide();
				$remove_btn.hide();
			}
		} );

		/**
		 * Handles Add Button Click Event.
		 */
		$add_btn.on( 'click', function () {
			let $popup = swal( {
				title: $elem.find( ".wponion-field-title h4" ).html(),
				animation: false,
				allowOutsideClick: false,
				showConfirmButton: false,
				showCloseButton: true,
				width: '700px',
				customClass: "wponion-icon-picker-model",
				onBeforeOpen: ( $elem ) => {
					swal.enableLoading();
					$_this.ajax( 'icon_picker', {
						onSuccess: ( $res ) => {
							if ( $res.success ) {
								swal.resetValidationError();
								let $popup_elem = $( $elem );
								$popup_elem.find( "#swal2-content" ).html( $res.data ).show();
								$popup_elem.find( '#swal2-content .wponion-icon-picker-container-scroll' )
										   .overlayScrollbars( { className: "os-theme-dark", resize: "vertical", } );
								$manager.init( $popup_elem, $popup );
							} else {
								wpo.tost( {
									type: 'error',
									title: $res.data,
								} );
								$popup.showValidationError( $res.data );
							}
						},
						onError: () => {
							$popup.showValidationError( wpo.txt( 'unknown_ajax_error' ) );
						},
						onAlways: () => {
							$popup.disableLoading();
						},
					} );
				}
			} );
		} );

		/**
		 * Handles Remove Button Event.
		 */
		$remove_btn.on( 'click', function () {
			$input.val( '' );
			$preview.hide();
			$remove_btn.hide();
		} );
	};

	/**
	 * Select2 Field Handler.
	 */
	$wpf.fn.select2 = function () {
		let $arg = this.arg( 'select2', {} );
		this.elem.select2( $arg );
	};

	/**
	 * Chosen Field Handler
	 */
	$wpf.fn.chosen = function () {
		let $arg = this.arg( 'chosen' );
		this.elem.chosen( $arg );
	};

	/**
	 * Selectize Field Handler.
	 */
	$wpf.fn.selectize = function () {
		let $arg = this.arg( 'selectize' );
		if ( $arg[ 'theme' ] !== undefined ) {
			this.elem.parent().addClass( $arg[ 'theme' ] );
		}

		this.elem.selectize( $arg );
	};

	/**
	 * Handles Clone Element Functions.
	 */
	$wpf.fn.clone_element = function () {
		let
			$this        = this,
			$elem        = $this.elem,
			$clone_wrap  = $elem.find( 'div.wponion-clone-wrap' ),
			$add_btn     = $clone_wrap.find( ".wponion-clone-add" ),
			$remove_btn  = $clone_wrap.find( ".wponion-clone-remove" ),
			$arg         = $this.arg( 'clone' ),
			$limit       = ( $arg[ 'limit' ] !== undefined ) ? $arg[ 'limit' ] : false,
			$is_toast    = ( $arg[ 'toast_error' ] !== undefined ) ? $arg[ 'toast_error' ] : true,
			$eror_msg    = $arg[ 'error_msg' ],
			$remove_func = function () {
				if ( $( this ).hasClass( 'removing' ) ) {
					return;
				}
				$( this ).addClass( 'removing' ).parent().parent().remove();
				let $count = parseInt( $clone_wrap.attr( 'data-wponion-clone-count' ) ) - 1;
				$clone_wrap.attr( 'data-wponion-clone-count', $count )
			};

		$add_btn.on( 'click', function () {
			let $template = $this.arg( 'clone_template' ),
				$ex_limit = parseInt( $clone_wrap.attr( 'data-wponion-clone-count' ) );

			if ( false !== $limit ) {
				if ( $limit === $ex_limit ) {
					if ( $is_toast === true ) {
						wpo.tost( {
							type: "error",
							title: $eror_msg,
						} );
					} else {
						let $html = $( '<div class="alert alert-warning" role="alert">' + $eror_msg + '</div>' );
						$html.hide();
						$add_btn.parent().prepend( $html );

						$html = $add_btn.parent().find( "div.alert" );
						$html.fadeIn( function () {
							setTimeout( function () {
								$html.fadeOut( 'slow', function () {
									$html.remove();
								} );
							}, 1000 )
						} )
					}
					return;
				}
			}
			let $count = $ex_limit + 1;

			if ( $template ) {
				$template = $template.replace( /{cloneid}/g, $count );// $( $template );
				$clone_wrap.attr( 'data-wponion-clone-count', $count );
				$( this ).parent().parent().find( 'div.wponion-clone-actions' ).before( $( $template ) );
				let $added_ins = $( this ).parent().parent().before();
				$added_ins.find( '.wponion-clone-remove' ).on( 'click', $remove_func );
				wponion_field( $added_ins ).reload();
			}
		} );

		$remove_btn.on( 'click', $remove_func )
	};

	/**
	 * Handles Fields ToolTip Along With A Image Option.
	 */
	$wpf.fn.field_tooltip = function () {
		let $fid = this.elem.attr( 'data-field-jsid' );
		let $tip = {};
		console.log( this.args() );
		if ( this.arg( $fid ) ) {
			let $arg = this.arg( $fid + 'tooltip' );
			if ( $arg[ 'image' ] !== false ) {
				if ( $( '#wponiontooltipimagetippy' ).length === 0 ) {
					$( 'body' )
						.append( $( '<div id="wponiontooltipimagetippy" style="display: none;">Loading.</div>' ) );
				}

				$arg.html          = '#wponiontooltipimagetippy';
				$arg.onShow        = function () {
					const content = this.querySelector( '.tippy-content' );
					if ( $tip.loading ) return;

					$tip.loading = true;

					fetch( $arg[ 'image' ] )
						.then( resp => resp.blob() )
						.then( blob => {
							const url         = URL.createObjectURL( blob );
							content.innerHTML = `<img width="200" height="200" src="${url}">`;
							$tip.loading      = false
						} )
						.catch( e => {
							content.innerHTML = 'Loading failed';
							$tip.loading      = false
						} )
				};
				$arg.onHidden      = function () {
					const content     = this.querySelector( ".tippy-content" );
					content.innerHTML = '';
				};
				$arg.popperOptions = {
					modifiers: {
						preventOverflow: {
							enabled: false
						},
						hide: {
							enabled: false
						}
					}
				};
			}


			$tip = tippy( this.elem[ 0 ], $arg );
		}
	};

	$wpf.fn.font_selector = function () {
		let $this        = this,
			$elem        = this.elem,
			$font_select = $elem.find( 'select.wponion-font-selector' ),
			$variant     = $elem.find( 'select.wponion-variant-selector' ),
			$websafe     = wpo.js_args( 'wponion_websafe_fonts' ),
			$gfonts      = wpo.js_args( 'wponion_gfonts' );

		let $build_options = function ( data ) {
			let $return = '';
			for ( let $_d in data ) {
				$return += `<option value="${$_d}">${data[ $_d ]}</option>`;
			}
			return $return;
		};

		$font_select.on( 'change', function () {
			let $val  = $( this ).val();
			let $html = null;
			if ( $websafe[ 'fonts' ][ $val ] !== undefined ) {
				$html = $build_options( $websafe[ 'variants' ] );
			} else if ( $gfonts[ $val ] !== undefined ) {
				$html = $build_options( $gfonts[ $val ] );
			}
			$variant.html( $html );
			wpo.trigger_update_select( $variant );
		} )
	};

	/**
	 * Reloads All Fields Instance. For the given key.
	 */
	$wpf.fn.reload = function () {
		wphooks.addAction( 'wponion_before_fields_reload' );
		this.init_field( 'input[data-wponion-inputmask]', 'inputmask' );
		this.init_field( '[data-wponion-maxlength]', 'maxlength' );
		this.init_field( '.wponion-element-icon_picker', 'icon_picker' );
		this.init_field( '.select2', 'select2' );
		this.init_field( '.chosen', 'chosen' );
		this.init_field( '.selectize', 'selectize' );
		this.init_field( '.wponion-element-clone', 'clone_element' );
		this.init_field( '.wponion-field-tooltip', 'field_tooltip' );
		this.init_field( '.wponion-element-font', 'font_selector' );
		this.field_debug();
		wphooks.addAction( 'wponion_after_fields_reload' );
	};


	wphooks.addAction( 'wponion_before_init', ( () => {
		wponion_field( '.wponion-framework' ).reload();
	} ) );

} )( window, document, jQuery, $wponion, $wponion_field, wp );
