<?php

namespace WPOnion\DB\Storage;

if ( ! class_exists( '\WPOnion\DB\Storage\Term' ) ) {
	/**
	 * Class Term
	 *
	 * @package WPOnion\DB\Storage
	 * @author Varun Sridharan <varunsridharan23@gmail.com>
	 * @since {NEWVERSION}
	 */
	class Term extends Base {
		/**
		 * Metadata Type.
		 *
		 * @var string
		 */
		protected $object_type = 'term';
	}
}