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

namespace WPO\Helper;

if ( ! class_exists( '\WPOnion\Helper\Array_Helper' ) ) {
	class Array_Helper extends Base implements \ArrayAccess, \Iterator {
		/**
		 * @var null
		 * @access
		 */
		protected $position = 0;

		/**
		 * @param mixed $offset
		 *
		 * @return bool
		 */
		public function offsetExists( $offset ) {
			return ( isset( $this->{$this->variable}[ $offset ] ) );
		}

		/**
		 * @param mixed $offset
		 *
		 * @return mixed
		 */
		public function offsetGet( $offset ) {
			$defaults = $this->defaults();
			if ( $this->offsetExists( $offset ) ) {
				return $this->{$this->variable}[ $offset ];
			} elseif ( isset( $defaults[ $offset ] ) ) {
				return $defaults[ $offset ];
			}
			return false;
		}

		/**
		 * @param mixed $offset
		 * @param mixed $value
		 */
		public function offsetSet( $offset, $value ) {
			$this->{$this->variable}[ $offset ] = $value;
		}

		/**
		 * @param mixed $offset
		 */
		public function offsetUnset( $offset ) {
			unset( $this->{$this->variable}[ $offset ] );
		}

		/**
		 * @return mixed
		 */
		public function current() {
			$keys = array_keys( $this->{$this->variable} );
			return $this->{$this->variable}[ $keys[ $this->position ] ];
		}

		/**
		 * Changes To Next Position.
		 */
		public function next() {
			++$this->position;
		}

		/**
		 * @return mixed
		 */
		public function key() {
			$keys = array_keys( $this->{$this->variable} );
			return $keys[ $this->position ];
		}

		/**
		 * @return bool
		 */
		public function valid() {
			$keys = array_keys( $this->{$this->variable} );
			return isset( $keys[ $this->position ] );
		}

		/**
		 * Sets Position to 0
		 */
		public function rewind() {
			$this->position = 0;
		}

		/**
		 * Internal Array Set / Get Handler.
		 *
		 * @param      $key
		 * @param null $value
		 *
		 * @return $this|mixed
		 */
		protected function _set_get_args( $key, $value = null ) {
			if ( null === $value ) {
				return $this[ $key ];
			}
			$this[ $key ] = $value;
			return $this;
		}
	}
}