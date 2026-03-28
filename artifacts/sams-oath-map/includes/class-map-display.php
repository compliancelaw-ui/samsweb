<?php
/**
 * Map Display Class
 * Handles map shortcode and display
 */

if (!defined('ABSPATH')) exit;

class SamsOATH_Map_Display {
    
    public function __construct() {
        add_shortcode('samsoath_map', array($this, 'render_map'));
    }
    
    /**
     * Render the map shortcode
     */
    public function render_map($atts) {
        $atts = shortcode_atts(array(
            'height' => '600px',
            'zoom' => 4,
            'center_lat' => 39.8283,
            'center_lng' => -98.5795
        ), $atts);
        
        ob_start();
        ?>
        <div class="samsoath-map-wrapper">
            <div class="samsoath-map-filters">
                <button class="samsoath-filter active" data-filter="all">Show All</button>
                <button class="samsoath-filter" data-filter="for_someone_i_love">For Someone I Love</button>
                <button class="samsoath-filter" data-filter="in_memory">In Memory</button>
                <button class="samsoath-filter" data-filter="supporter">Supporters</button>
            </div>
            
            <div id="samsoath-map" style="height: <?php echo esc_attr($atts['height']); ?>"></div>
            
            <div class="samsoath-map-legend">
                <div class="legend-item">
                    <span class="legend-dot" style="background-color: #0066CC;"></span>
                    <span>For Someone I Love</span>
                </div>
                <div class="legend-item">
                    <span class="legend-dot" style="background-color: #9B59B6;"></span>
                    <span>In Memory</span>
                </div>
                <div class="legend-item">
                    <span class="legend-dot" style="background-color: #FF6600;"></span>
                    <span>Supporters</span>
                </div>
            </div>
            
            <div class="samsoath-map-stats">
                <p><strong><?php echo $this->get_total_count(); ?></strong> people have taken Sam's OATH</p>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * Get total pin count
     */
    private function get_total_count() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'samsoath_pins';
        return number_format($wpdb->get_var("SELECT COUNT(*) FROM $table_name"));
    }
}