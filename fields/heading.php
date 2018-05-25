<?php
/**
 *
 * Initial version created 12-05-2018 / 06:55 PM
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

if ( ! class_exists( 'WPOnion_Field_heading' ) ) {
	/**
	 * Class WPOnion_Field_heading
	 *
	 * @author Varun Sridharan <varunsridharan23@gmail.com>
	 * @since 1.0
	 */
	class WPOnion_Field_heading extends \WPOnion\Field {
		public function output() {
			echo $this->before();
			echo $this->data( 'content' );
			echo $this->after();
		}

		public function field_assets() {
			// TODO: Implement field_assets() method.
		}

		protected function field_default() {
			return array( 'content' => false );
		}
	}
}
