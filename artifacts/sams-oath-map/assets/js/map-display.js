/**
 * Sam's OATH Map Display JavaScript
 */

(function($) {
    'use strict';
    
    let map;
    let markers = [];
    let allPins = [];
    
    // Initialize map when document is ready
    $(document).ready(function() {
        if ($('#samsoath-map').length) {
            initMap();
        }
    });
    
    /**
     * Initialize Mapbox map
     */
    function initMap() {
        // Check if Mapbox token is set
        if (!samsoathData.mapboxToken) {
            $('#samsoath-map').html('<p style="padding: 20px; text-align: center;">Mapbox token not configured. Please add your token in Settings → Sam\'s OATH Map.</p>');
            return;
        }
        
        mapboxgl.accessToken = samsoathData.mapboxToken;
        
        // Create map
        map = new mapboxgl.Map({
            container: 'samsoath-map',
            style: 'mapbox://styles/mapbox/light-v11',
            center: [-98.5795, 39.8283], // Center of USA
            zoom: 3.5
        });
        
        // Add navigation controls
        map.addControl(new mapboxgl.NavigationControl());
        
        // Load pins when map is ready
        map.on('load', function() {
            loadPins();
        });
        
        // Setup filter buttons
        setupFilters();
    }
    
    /**
     * Load pins from API
     */
    function loadPins(category = null) {
        let apiUrl = samsoathData.apiUrl;
        
        if (category) {
            apiUrl += '?category=' + category;
        }
        
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(pins) {
                allPins = pins;
                displayPins(pins);
            },
            error: function(error) {
                console.error('Error loading pins:', error);
            }
        });
    }
    
    /**
     * Display pins on map
     */
    function displayPins(pins) {
        // Clear existing markers
        markers.forEach(marker => marker.remove());
        markers = [];
        
        // Add new markers
        pins.forEach(function(pin) {
            addMarker(pin);
        });
    }
    
    /**
     * Add individual marker to map
     */
    function addMarker(pin) {
        // Get color based on category
        const color = samsoathData.colors[pin.category] || '#999999';
        
        // Create marker element
        const el = document.createElement('div');
        el.className = 'samsoath-marker';
        el.style.backgroundColor = color;
        el.style.width = '12px';
        el.style.height = '12px';
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
        el.style.cursor = 'pointer';
        
        // Create popup content
        const popupHTML = createPopupHTML(pin);
        
        // Create popup
        const popup = new mapboxgl.Popup({ offset: 15 })
            .setHTML(popupHTML);
        
        // Create marker
        const marker = new mapboxgl.Marker(el)
            .setLngLat([parseFloat(pin.longitude), parseFloat(pin.latitude)])
            .setPopup(popup)
            .addTo(map);
        
        markers.push(marker);
    }
    
    /**
     * Create popup HTML content
     */
    function createPopupHTML(pin) {
        let categoryLabel = '';
        
        switch(pin.category) {
            case 'for_someone_i_love':
                categoryLabel = 'For someone I love';
                break;
            case 'in_memory':
                categoryLabel = 'In memory of someone I lost';
                break;
            case 'supporter':
                categoryLabel = 'Supporter';
                break;
        }
        
        let html = '<div class="samsoath-popup">';
        html += '<div class="samsoath-popup-name">' + escapeHTML(pin.name_display) + '</div>';
        html += '<div class="samsoath-popup-location">' + escapeHTML(pin.city) + ', ' + escapeHTML(pin.state) + '</div>';
        html += '<div class="samsoath-popup-category">' + categoryLabel + '</div>';
        html += '<div class="samsoath-popup-date">' + pin.date_formatted + '</div>';
        
        // Add story link if they have a story
        if (pin.has_story && pin.story_id) {
            html += '<a href="' + getStoryURL(pin.story_id) + '" class="samsoath-popup-story-link">Read Their Story →</a>';
        }
        
        html += '</div>';
        
        return html;
    }
    
    /**
     * Get story URL
     */
    function getStoryURL(storyId) {
        // This will be the WordPress permalink for the story post
        return '/?p=' + storyId;
    }
    
    /**
     * Escape HTML to prevent XSS
     */
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
    
    /**
     * Setup filter buttons
     */
    function setupFilters() {
        $('.samsoath-filter').on('click', function() {
            const filter = $(this).data('filter');
            
            // Update active state
            $('.samsoath-filter').removeClass('active');
            $(this).addClass('active');
            
            // Filter pins
            if (filter === 'all') {
                displayPins(allPins);
            } else {
                const filteredPins = allPins.filter(pin => pin.category === filter);
                displayPins(filteredPins);
            }
        });
    }
    
})(jQuery);