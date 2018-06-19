<?php
/**
 *
 * Initial version created 19-06-2018 / 10:38 AM
 *
 * @author Varun Sridharan <varunsridharan23@gmail.com>
 * @version 1.0
 * @since 1.0
 * @package
 * @link
 * @copyright 2018 Varun Sridharan
 * @license GPLV3 Or Greater (https://www.gnu.org/licenses/gpl-3.0.txt)
 */

global $wponion_modern_theme;
$wponion_modern_theme = null;

if ( ! defined( 'ABSPATH' ) ) {
	die;
}

if ( ! class_exists( 'WPOnion_modern_Theme' ) ) {
	/**
	 * Class WPOnion_Theme_WP
	 *
	 * @author Varun Sridharan <varunsridharan23@gmail.com>
	 * @since 1.0
	 */
	class WPOnion_modern_Theme extends \WPOnion\Theme {
		/**
		 * WPOnion_wp_Theme constructor.
		 *
		 * @param $plugin_id
		 */
		public function __construct( $plugin_id ) {
			parent::__construct( $plugin_id, __FILE__ );
		}

		/**
		 * Registers Assets.
		 *
		 * @return mixed|void
		 */
		public function register_assets() {
			//wp_enqueue_style( 'wponion-wp-theme', $this->asset( 'assets/wponion-wp-theme' ), array( 'wponion-core' ) );
			//wp_enqueue_script( 'wponion-wp-theme', $this->asset( 'assets/wponion-wp-theme', 'js' ), array( 'wponion-plugins' ) );
		}

		/**
		 * Renders Metabox MENU HTML.
		 *
		 * @param $menu
		 *
		 * @return string
		 */
		public function meetabox_menu_html( $menu ) {
			$attr          = isset( $menu['attributes'] ) ? $menu['attributes'] : array();
			$attr['title'] = isset( $attr['title'] ) ? $attr['title'] : $menu['title'];
			$page_title    = $menu['title'];
			$attr['href']  = $menu['href'];
			$attr['class'] = isset( $attr['class'] ) ? $attr['class'] : array();
			$attr['class'] = wponion_html_class( $attr['class'], array(
				wponion_html_class( $menu['class'] ),
				( ! empty( $men['icon'] ) ) ? 'nav-with-icon' : '',
				( isset( $menu['is_internal_href'] ) && true === $menu['is_internal_href'] ) ? 'nav-internal-href' : '',
			) );
			$attr          = wponion_array_to_html_attributes( $attr );
			return '<a ' . $attr . '>' . wponion_icon( $menu['icon'] ) . $page_title . '</a>';
		}
	}
}

$wponion_modern_theme = new WPOnion_modern_Theme( $plugin_id );
return $wponion_modern_theme;
