<?php
/**
 * Geocoder Class
 * Converts city/state to latitude/longitude coordinates
 */

if (!defined('ABSPATH')) exit;

class SamsOATH_Geocoder {
    
    /**
     * Geocode a city and state to coordinates
     * Uses free Nominatim (OpenStreetMap) API
     */
    public function geocode($city, $state) {
        // Build the address string
        $address = urlencode($city . ', ' . $state . ', USA');
        
        // Nominatim API endpoint
        $url = "https://nominatim.openstreetmap.org/search?q={$address}&format=json&limit=1";
        
        // Make the request
        $response = wp_remote_get($url, array(
            'timeout' => 15,
            'headers' => array(
                'User-Agent' => 'SamsOATH/' . SAMSOATH_VERSION
            )
        ));
        
        if (is_wp_error($response)) {
            error_log('Geocoding error: ' . $response->get_error_message());
            return false;
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        if (empty($data)) {
            error_log('Geocoding failed: No results for ' . $city . ', ' . $state);
            return false;
        }
        
        return array(
            'lat' => floatval($data[0]['lat']),
            'lng' => floatval($data[0]['lon'])
        );
    }
    
    /**
     * Batch geocode multiple locations (for import)
     */
    public function batch_geocode($locations) {
        $results = array();
        
        foreach ($locations as $location) {
            $coords = $this->geocode($location['city'], $location['state']);
            
            if ($coords) {
                $results[] = array_merge($location, $coords);
            }
            
            // Respect API rate limits (1 request per second for Nominatim)
            sleep(1);
        }
        
        return $results;
    }
}