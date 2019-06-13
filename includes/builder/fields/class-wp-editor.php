<?php
/**
 *
 * @author Varun Sridharan <varunsridharan23@gmail.com>
 * @version 1.0
 * @since 1.0
 * @link
 * @copyright 2019 Varun Sridharan
 * @license GPLV3 Or Greater (https://www.gnu.org/licenses/gpl-3.0.txt)
 */

namespace WPO\Fields;

if ( ! class_exists( 'WPO\Fields\WP_Editor' ) ) {
	/**
	 * Class WP_Editor
	 *
	 * @package WPO\Fields
	 * @author Varun Sridharan <varunsridharan23@gmail.com>
	 * @since 1.0
	 */
	class WP_Editor extends \WPO\Field {
		/**
		 * Upload constructor.
		 *
		 * @param bool  $id
		 * @param bool  $title
		 * @param array $args
		 */
		public function __construct( $id = false, $title = false, $args = array() ) {
			parent::__construct( 'wp_editor', $id, $title, $args );
		}

		/**
		 * @param      $args
		 * @param bool $merge
		 *
		 * @return $this
		 */
		public function settings( $args, $merge = true ) {
			$this->_set_array_handler( 'settings', $args, $merge );
			return $this;
		}
	}
}