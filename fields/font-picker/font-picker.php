<?php
/**
 *
 * Initial version created 19-05-2018 / 02:09 PM
 *
 * @author Varun Sridharan <varunsridharan23@gmail.com>
 * @version 1.0
 * @since 1.0
 * @package
 * @link
 * @copyright 2018 Varun Sridharan
 * @license GPLV3 Or Greater (https://www.gnu.org/licenses/gpl-3.0.txt)
 */

namespace WPOnion\Field;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

if ( ! class_exists( '\WPOnion\Field\font_picker' ) ) {
	/**
	 * Class font
	 *
	 * @package WPOnion\Field
	 * @author Varun Sridharan <varunsridharan23@gmail.com>
	 * @since 1.0
	 */
	class font_picker extends \WPOnion\Field {
		/**
		 * font constructor.
		 *
		 * @param array $field
		 * @param array $value
		 * @param array $unique
		 */
		public function __construct( $field = array(), $value = array(), $unique = array() ) {
			if ( ! defined( 'WPONION_ADD_FONT_DATA' ) ) {
				define( 'WPONION_ADD_FONT_DATA', true );
			}
			parent::__construct( $field, $value, $unique );
		}

		/**
		 * Final HTML Output;
		 *
		 * @return mixed;
		 */
		protected function output() {
			$this->before();

			$websafe                = wponion_websafe_fonts();
			$this->select_framework = wponion_validate_select_framework( $this->field );

			echo '<div class="wponion-font-select-container">';
			echo wponion_add_element( $this->font_select( $websafe ), $this->value( 'font' ), $this->unique( $this->field_id() ) );
			echo '</div>';

			echo '<div class="wponion-font-select-container">';
			echo wponion_add_element( $this->variant_select( $websafe ), $this->value( 'variant' ), $this->unique( $this->field_id() ) );
			echo '</div>';

			$this->after();
		}

		/**
		 * Returns Font Select Args.
		 *
		 * @param $websafe
		 *
		 * @return array
		 */
		protected function font_select( $websafe ) {
			$fonts = array_keys( wponion_google_fonts_data() );
			$data  = array_filter( array(
				'type'                  => 'select',
				'id'                    => 'font',
				'only_field'            => true,
				'class'                 => 'wponion-font-selector',
				'options'               => array(
					__( 'Websafe Fonts' ) => array_combine( $websafe['fonts'], $websafe['fonts'] ),
					__( 'Google Fonts' )  => array_combine( $fonts, $fonts ),
				),
				$this->select_framework => $this->data( $this->select_framework ),
			) );
			$this->debug( 'Font Select', $data );
			return $data;
		}

		/**
		 * Returns Font Variant
		 *
		 * @param $websafe
		 *
		 * @return array
		 */
		protected function variant_select( $websafe ) {
			$data = array_filter( array(
				'type'                  => 'select',
				'id'                    => 'variant',
				'only_field'            => true,
				'class'                 => 'wponion-variant-selector',
				'options'               => $websafe['variants'],
				$this->select_framework => $this->data( $this->select_framework ),
			) );
			$this->debug( 'variant Fonts', $data );
			return $data;
		}

		/**
		 * Returns all fields default.
		 *
		 * @return array|mixed
		 */
		protected function field_default() {
			// TODO: Implement field_default() method.
		}

		/**
		 * Returns all required values to use in js.
		 *
		 * @return array
		 */
		protected function js_field_args() {
			return array();
		}

		/**
		 * Loads the required plugins assets.
		 *
		 * @return mixed|void
		 */
		public function field_assets() {
		}
	}
}
