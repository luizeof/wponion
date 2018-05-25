<?php
/**
 *
 * Initial version created 15-05-2018 / 06:17 AM
 *
 * @author Varun Sridharan <varunsridharan23@gmail.com>
 * @version 1.0
 * @since 1.0
 * @package
 * @link
 * @copyright 2018 Varun Sridharan
 * @license GPLV3 Or Greater (https://www.gnu.org/licenses/gpl-3.0.txt)
 */

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

if ( ! class_exists( 'WPOnion_Field_checkbox_radio' ) ) {
	class WPOnion_Field_checkbox_radio extends \WPOnion\Field {
		public function field_assets() {
			// TODO: Implement field_assets() method.
		}

		protected function field_default() {
			return array(
				'options' => array(),
				'label'   => false,
			);
		}

		protected function output() {
			echo $this->before();

			$options = $this->data( 'options' );

			$this->catch_output( 'start' );

			if ( is_array( $options ) && ! empty( $options ) ) {
				foreach ( $options as $option_key => $option ) {
					if ( ! is_array( $option ) || is_array( $option ) && isset( $option['label'] ) ) {
						echo $this->render_element( $this->handle_options( $option_key, $option ) );
					} elseif ( is_array( $option ) && false === isset( $option['label'] ) ) {
						echo '<div class="wponion-checkbox-radio-group">';
						echo '<div class="wponion-group-header"><h4>' . $option_key . '</h4></div>';
						echo '<ul class="wponion-checkbox-group-lists">';
						foreach ( $option as $key => $value ) {
							echo '<li>';
							echo $this->render_element( $this->handle_options( $key, $value ), true, $option_key );
							echo '</li>';
						}
						echo '</ul>';
						echo '</div>';
					}
				}
			} elseif ( in_array( $this->element_type(), array(
				'switch',
				'checkbox',
			) ) ) {
				echo $this->render_element( $this->handle_options( $this->field_id(), $this->data( 'label' ) ), 'single' );
			}


			echo $this->catch_output( 'stop' );
			echo $this->after();
		}

		protected function render_element( $options, $in_group = false, $group_title = false ) {
			$attr         = $options['attributes'];
			$attr['type'] = ( 'switch' === $this->element_type() ) ? 'checkbox' : $this->element_type();

			if ( ! isset( $attr['class'] ) ) {
				$attr['class'] = array();
			}
			$attr['class'] = wponion_html_class( $attr['class'], $this->element_class( 'form-check-input' ) );
			$attr['value'] = $options['key'];
			$value         = $this->value();
			$wrap_attr     = array();
			$label_attr    = array();

			if ( true === $in_group || 'group' === $in_group ) {
				$gptitle      = sanitize_key( $group_title );
				$attr['name'] = $this->name( '[' . $gptitle . '][]' );
				$value        = $this->get_value( $gptitle );
				$dep_id       = $gptitle . '_' . $options['key'];
			} elseif ( 'single' === $in_group ) {
				$attr['name'] = $this->name();
				$dep_id       = $options['key'];
			} else {
				$attr['name'] = $this->name( '[]' );
				$dep_id       = $options['key'];
			}

			$elem_id    = sanitize_title( $attr['name'] . '_' . $options['key'] );
			$attr['id'] = $elem_id;

			if ( isset( $options['tooltip'] ) && is_array( $options['tooltip'] ) ) {
				$label_attr                      = $options['tooltip']['attr'];
				$label_attr['data-wponion-jsid'] = $this->js_field_id();
				$label_attr['data-field-jsid']   = $elem_id;
				$label_attr['class']             = ' wponion-field-tooltip ';
				wponion_localize()->add( $this->js_field_id(), array( $elem_id . 'tooltip' => $options['tooltip']['data'] ) );
			}

			$wrap_attr['class'] = wponion_html_class( array( 'form-group', 'form-check' ) );
			$field_attr         = $this->attributes( $attr, $dep_id );

			return $this->_element_html( $label_attr, $field_attr, $value, $attr, $options );
		}

		protected function _element_html( $label_attr, $field_attr, $value, $attr, $options ) {
			return '<div class=" form-group form-check ">
				<label ' . wponion_array_to_html_attributes( $label_attr ) . '>
					<input ' . $field_attr . ' ' . $this->checked( $value, $attr['value'], 'checked' ) . '  />' . $options['label'] . '
				</label>
			</div>';
		}
	}
}
