<?php
/**
 * Gravity Forms Integration Class
 * Handles form submissions and creates pins
 */

if (!defined('ABSPATH')) exit;

class SamsOATH_Gravity_Forms_Integration {
    
    public function __construct() {
        // Hook into Gravity Forms submission for OATH form (form ID 1)
        add_action('gform_after_submission_1', array($this, 'process_oath_submission'), 10, 2);
        
        // Hook into Gravity Forms submission for Story form (form ID 2)
        add_action('gform_after_submission_2', array($this, 'process_story_submission'), 10, 2);
        
        // Add custom confirmation redirect
        add_filter('gform_confirmation_1', array($this, 'oath_confirmation'), 10, 4);
    }
    
    /**
     * Process OATH form submission and create pin
     */
    public function process_oath_submission($entry, $form) {
        $pin_manager = new SamsOATH_Pin_Manager();
        
        // Extract form data
        $data = array(
            'name_display' => $this->get_display_name($entry),
            'city' => rgar($entry, '4'), // City field ID
            'state' => rgar($entry, '5'), // State field ID
            'category' => rgar($entry, '3'), // Category field ID
            'email' => rgar($entry, '6'), // Email field ID
            'opted_in' => rgar($entry, '7') == '1' // Opt-in checkbox field ID
        );
        
        // Create the pin
        $pin_id = $pin_manager->create_pin($data);
        
        if (!is_wp_error($pin_id)) {
            // Store pin ID in form entry meta for reference
            gform_update_meta($entry['id'], 'samsoath_pin_id', $pin_id);
            
            // Trigger email automation if opted in
            if ($data['opted_in'] && $data['email']) {
                $this->trigger_email_automation($data['email'], $data);
            }
        }
    }
    
    /**
     * Process story submission
     */
    public function process_story_submission($entry, $form) {
        // Get the submitter's pin ID if they already took the OATH
        $email = rgar($entry, '3'); // Email field in story form
        $pin_id = $this->find_pin_by_email($email);
        
        // Create story post as draft for moderation
        $story_data = array(
            'post_title' => rgar($entry, '4') ?: 'Story from ' . rgar($entry, '1'), // Title or auto-generate
            'post_content' => rgar($entry, '5'), // Story content field ID
            'post_status' => 'pending',
            'post_type' => 'samsoath_story',
            'meta_input' => array(
                '_samsoath_pin_id' => $pin_id,
                '_samsoath_name_display' => rgar($entry, '1'),
                '_samsoath_city' => rgar($entry, '2'),
                '_samsoath_category' => $this->get_category_from_pin($pin_id)
            )
        );
        
        $post_id = wp_insert_post($story_data);
        
        if ($post_id) {
            gform_update_meta($entry['id'], 'samsoath_story_id', $post_id);
        }
    }
    
    /**
     * Get display name based on user's privacy choice
     */
    private function get_display_name($entry) {
        $name_type = rgar($entry, '1'); // Name display type field ID
        $name_value = rgar($entry, '2'); // Name input field ID
        
        switch ($name_type) {
            case 'full_name':
                return sanitize_text_field($name_value);
            case 'first_name':
                $parts = explode(' ', $name_value);
                return sanitize_text_field($parts[0]);
            case 'initials':
                return sanitize_text_field($name_value);
            case 'anonymous':
                return 'A Friend';
            default:
                return 'A Friend';
        }
    }
    
    /**
     * Custom confirmation redirect to thank you page
     */
    public function oath_confirmation($confirmation, $form, $entry, $ajax) {
        $pin_id = gform_get_meta($entry['id'], 'samsoath_pin_id');
        
        // Redirect to thank you page with pin ID
        $confirmation = array('redirect' => home_url('/thank-you/?pin=' . $pin_id));
        
        return $confirmation;
    }
    
    /**
     * Trigger email automation (ActiveCampaign integration point)
     */
    private function trigger_email_automation($email, $data) {
        // This is where you'd integrate with ActiveCampaign
        // For now, just send a simple WordPress email
        
        $subject = 'Welcome to Sam\'s OATH';
        $message = "Hi " . $data['name_display'] . ",\n\n";
        $message .= "Thank you for taking Sam's OATH.\n\n";
        $message .= "Your pin is now on the OATH Map in " . $data['city'] . ", " . $data['state'] . ".\n\n";
        $message .= "You're not the only one.\n\n";
        $message .= "- Frank Sheeder\nFounder, Sam's OATH";
        
        wp_mail($email, $subject, $message);
    }
    
    /**
     * Find pin by email
     */
    private function find_pin_by_email($email) {
        // This would search encrypted emails - simplified for now
        return null;
    }
    
    /**
     * Get category from pin ID
     */
    private function get_category_from_pin($pin_id) {
        if (!$pin_id) return '';
        
        $pin_manager = new SamsOATH_Pin_Manager();
        $pin = $pin_manager->get_pin($pin_id);
        
        return $pin ? $pin->category : '';
    }
}