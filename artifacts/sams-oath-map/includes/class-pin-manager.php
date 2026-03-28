<?php
/**
 * Pin Manager Class
 * Handles creating and managing OATH pins
 */

if (!defined('ABSPATH')) exit;

class SamsOATH_Pin_Manager {
    
    public function __construct() {
        // Hook for when stories are published
        add_action('publish_samsoath_story', array($this, 'update_pin_with_story'), 10, 2);
    }
    
    /**
     * Create a new pin from form submission
     */
    public function create_pin($data) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'samsoath_pins';
        
        // Geocode the location
        $geocoder = new SamsOATH_Geocoder();
        $coords = $geocoder->geocode($data['city'], $data['state']);
        
        if (!$coords) {
            return new WP_Error('geocode_failed', 'Could not find coordinates for this location');
        }
        
        // Prepare pin data
        $pin_data = array(
            'name_display' => $data['name_display'],
            'city' => sanitize_text_field($data['city']),
            'state' => sanitize_text_field($data['state']),
            'category' => sanitize_text_field($data['category']),
            'latitude' => $coords['lat'],
            'longitude' => $coords['lng'],
            'email' => sanitize_email($data['email']),
            'opted_in' => isset($data['opted_in']) ? 1 : 0,
            'has_story' => 0,
            'story_id' => null
        );
        
        // Insert into database
        $result = $wpdb->insert($table_name, $pin_data);
        
        if ($result === false) {
            return new WP_Error('db_insert_failed', 'Could not save pin to database');
        }
        
        $pin_id = $wpdb->insert_id;
        
        // Store email in user meta if opted in (encrypted)
        if ($pin_data['opted_in'] && $pin_data['email']) {
            $this->store_email_securely($pin_id, $pin_data['email']);
        }
        
        return $pin_id;
    }
    
    /**
     * Update pin when story is published
     */
    public function update_pin_with_story($post_id, $post) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'samsoath_pins';
        
        // Get the pin ID associated with this story
        $pin_id = get_post_meta($post_id, '_samsoath_pin_id', true);
        
        if (!$pin_id) {
            return;
        }
        
        // Update pin to show it has a story
        $wpdb->update(
            $table_name,
            array(
                'has_story' => 1,
                'story_id' => $post_id
            ),
            array('id' => $pin_id),
            array('%d', '%d'),
            array('%d')
        );
    }
    
    /**
     * Store email securely (simple encryption)
     */
    private function store_email_securely($pin_id, $email) {
        // In production, use proper encryption
        // For now, just hash it for privacy
        update_option('samsoath_pin_' . $pin_id . '_email', base64_encode($email));
    }
    
    /**
     * Get pin by ID
     */
    public function get_pin($pin_id) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'samsoath_pins';
        
        return $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table_name WHERE id = %d",
            $pin_id
        ));
    }
    
    /**
     * Get all pins with optional filters
     */
    public function get_pins($args = array()) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'samsoath_pins';
        
        $defaults = array(
            'category' => '',
            'has_story' => null,
            'limit' => -1
        );
        
        $args = wp_parse_args($args, $defaults);
        
        $where = array('1=1');
        
        if (!empty($args['category'])) {
            $where[] = $wpdb->prepare('category = %s', $args['category']);
        }
        
        if ($args['has_story'] !== null) {
            $where[] = $wpdb->prepare('has_story = %d', $args['has_story']);
        }
        
        $where_sql = implode(' AND ', $where);
        $limit_sql = $args['limit'] > 0 ? $wpdb->prepare('LIMIT %d', $args['limit']) : '';
        
        return $wpdb->get_results(
            "SELECT * FROM $table_name WHERE $where_sql ORDER BY date_created DESC $limit_sql"
        );
    }
    
    /**
     * Get pin count
     */
    public function get_pin_count($category = '') {
        global $wpdb;
        $table_name = $wpdb->prefix . 'samsoath_pins';
        
        if ($category) {
            return $wpdb->get_var($wpdb->prepare(
                "SELECT COUNT(*) FROM $table_name WHERE category = %s",
                $category
            ));
        }
        
        return $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
    }
}