<?php
/**
 * Admin Settings Class
 * Handles plugin settings page
 */

if (!defined('ABSPATH')) exit;

class SamsOATH_Admin_Settings {
    
    public function __construct() {
        add_action('admin_menu', array($this, 'add_settings_page'));
        add_action('admin_init', array($this, 'register_settings'));
    }
    
    /**
     * Add settings page to WordPress admin
     */
    public function add_settings_page() {
        add_options_page(
            'Sam\'s OATH Map Settings',
            'Sam\'s OATH Map',
            'manage_options',
            'samsoath-settings',
            array($this, 'render_settings_page')
        );
    }
    
    /**
     * Register settings
     */
    public function register_settings() {
        register_setting('samsoath_settings', 'samsoath_mapbox_token');
        
        add_settings_section(
            'samsoath_main_section',
            'Map Configuration',
            array($this, 'section_callback'),
            'samsoath-settings'
        );
        
        add_settings_field(
            'samsoath_mapbox_token',
            'Mapbox Access Token',
            array($this, 'mapbox_token_callback'),
            'samsoath-settings',
            'samsoath_main_section'
        );
    }
    
    /**
     * Section description
     */
    public function section_callback() {
        echo '<p>Configure your map settings below.</p>';
    }
    
    /**
     * Mapbox token field
     */
    public function mapbox_token_callback() {
        $token = get_option('samsoath_mapbox_token', '');
        echo '<input type="text" name="samsoath_mapbox_token" value="' . esc_attr($token) . '" class="regular-text" />';
        echo '<p class="description">Get a free token at <a href="https://account.mapbox.com/access-tokens/" target="_blank">mapbox.com</a></p>';
    }
    
    /**
     * Render settings page
     */
    public function render_settings_page() {
        if (!current_user_can('manage_options')) {
            return;
        }
        
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            <form action="options.php" method="post">
                <?php
                settings_fields('samsoath_settings');
                do_settings_sections('samsoath-settings');
                submit_button('Save Settings');
                ?>
            </form>
            
            <hr>
            
            <h2>Map Statistics</h2>
            <?php $this->display_stats(); ?>
        </div>
        <?php
    }
    
    /**
     * Display pin statistics
     */
    private function display_stats() {
        global $wpdb;
        $table_name = $wpdb->prefix . 'samsoath_pins';
        
        $total = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
        $for_someone = $wpdb->get_var("SELECT COUNT(*) FROM $table_name WHERE category = 'for_someone_i_love'");
        $in_memory = $wpdb->get_var("SELECT COUNT(*) FROM $table_name WHERE category = 'in_memory'");
        $supporters = $wpdb->get_var("SELECT COUNT(*) FROM $table_name WHERE category = 'supporter'");
        $with_stories = $wpdb->get_var("SELECT COUNT(*) FROM $table_name WHERE has_story = 1");
        
        ?>
        <table class="widefat">
            <tbody>
                <tr>
                    <td><strong>Total OATH-Takers:</strong></td>
                    <td><?php echo number_format($total); ?></td>
                </tr>
                <tr>
                    <td><strong>For Someone I Love:</strong></td>
                    <td><?php echo number_format($for_someone); ?></td>
                </tr>
                <tr>
                    <td><strong>In Memory:</strong></td>
                    <td><?php echo number_format($in_memory); ?></td>
                </tr>
                <tr>
                    <td><strong>Supporters:</strong></td>
                    <td><?php echo number_format($supporters); ?></td>
                </tr>
                <tr>
                    <td><strong>With Stories:</strong></td>
                    <td><?php echo number_format($with_stories); ?></td>
                </tr>
            </tbody>
        </table>
        <?php
    }
}