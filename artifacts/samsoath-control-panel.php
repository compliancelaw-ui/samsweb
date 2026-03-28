<?php
/**
 * SAM'S OATH - CONTROL PANEL
 * 
 * Custom admin dashboard at /frank-admin
 * Password-protected interface for Frank to manage:
 * - Story submissions (review/approve/reject)
 * - Contact messages (all types)
 * - OATH submissions & map
 * - Email preferences
 * - Analytics & stats
 * 
 * Installation: Create as WordPress page template or custom endpoint
 * 
 * @package SamsOATH
 * @version 1.0
 * @created February 17, 2026
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// ============================================================================
// REGISTER CUSTOM REWRITE RULE FOR /frank-admin
// ============================================================================

add_action('init', 'samsoath_register_control_panel_endpoint');
function samsoath_register_control_panel_endpoint() {
    add_rewrite_rule('^frank-admin/?$', 'index.php?samsoath_control_panel=1', 'top');
    add_rewrite_rule('^frank-admin/(.+)/?$', 'index.php?samsoath_control_panel=1&section=$matches[1]', 'top');
}

add_filter('query_vars', 'samsoath_add_query_vars');
function samsoath_add_query_vars($vars) {
    $vars[] = 'samsoath_control_panel';
    $vars[] = 'section';
    return $vars;
}

add_action('template_redirect', 'samsoath_control_panel_template');
function samsoath_control_panel_template() {
    if (get_query_var('samsoath_control_panel')) {
        // Start session for login tracking
        if (!session_id()) {
            session_start();
        }
        
        samsoath_render_control_panel();
        exit;
    }
}

// Don't forget to flush rewrite rules after activation
register_activation_hook(__FILE__, 'flush_rewrite_rules');

// ============================================================================
// AUTHENTICATION
// ============================================================================

/**
 * Check if user is logged into control panel
 */
function samsoath_is_logged_in() {
    return isset($_SESSION['samsoath_logged_in']) && $_SESSION['samsoath_logged_in'] === true;
}

/**
 * Verify login credentials
 */
function samsoath_verify_login($username, $password) {
    // Password hash - CHANGE THIS to your desired password
    // To generate: password_hash('your-password-here', PASSWORD_BCRYPT)
    $stored_hash = '$2y$10$YourHashedPasswordHere'; // UPDATE THIS
    
    $correct_username = 'frank'; // Username: frank
    
    if ($username === $correct_username && password_verify($password, $stored_hash)) {
        $_SESSION['samsoath_logged_in'] = true;
        $_SESSION['samsoath_user'] = $username;
        $_SESSION['samsoath_login_time'] = time();
        return true;
    }
    
    return false;
}

/**
 * Handle logout
 */
function samsoath_logout() {
    session_unset();
    session_destroy();
}

/**
 * Handle login form submission
 */
function samsoath_handle_login() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['samsoath_login'])) {
        $username = sanitize_text_field($_POST['username']);
        $password = $_POST['password'];
        
        if (samsoath_verify_login($username, $password)) {
            wp_redirect(home_url('/frank-admin'));
            exit;
        } else {
            return 'Invalid username or password';
        }
    }
    return '';
}

// ============================================================================
// MAIN RENDER FUNCTION
// ============================================================================

function samsoath_render_control_panel() {
    // Handle logout
    if (isset($_GET['action']) && $_GET['action'] === 'logout') {
        samsoath_logout();
        wp_redirect(home_url('/frank-admin'));
        exit;
    }
    
    // Handle login
    $login_error = samsoath_handle_login();
    
    // Check if logged in
    if (!samsoath_is_logged_in()) {
        samsoath_render_login_page($login_error);
        return;
    }
    
    // Get current section
    $section = get_query_var('section', 'dashboard');
    
    // Render dashboard
    samsoath_render_dashboard_page($section);
}

// ============================================================================
// LOGIN PAGE
// ============================================================================

function samsoath_render_login_page($error = '') {
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sam's OATH - Control Panel Login</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #3EABA8 0%, #4A6FA5 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .login-container {
                background: white;
                padding: 40px;
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                width: 90%;
                max-width: 400px;
            }
            .login-header {
                text-align: center;
                margin-bottom: 30px;
            }
            .login-header h1 {
                color: #333;
                font-size: 24px;
                margin-bottom: 8px;
            }
            .login-header p {
                color: #666;
                font-size: 14px;
            }
            .form-group {
                margin-bottom: 20px;
            }
            .form-group label {
                display: block;
                margin-bottom: 8px;
                color: #333;
                font-weight: 500;
            }
            .form-group input {
                width: 100%;
                padding: 12px;
                border: 2px solid #e0e0e0;
                border-radius: 6px;
                font-size: 16px;
                transition: border-color 0.3s;
            }
            .form-group input:focus {
                outline: none;
                border-color: #3EABA8;
            }
            .error-message {
                background: #ffebee;
                color: #c62828;
                padding: 12px;
                border-radius: 6px;
                margin-bottom: 20px;
                font-size: 14px;
            }
            .login-button {
                width: 100%;
                padding: 14px;
                background: #3EABA8;
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.3s;
            }
            .login-button:hover {
                background: #2c8985;
            }
            .footer-note {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="login-container">
            <div class="login-header">
                <h1>Sam's OATH</h1>
                <p>Control Panel</p>
            </div>
            
            <?php if ($error): ?>
                <div class="error-message"><?php echo esc_html($error); ?></div>
            <?php endif; ?>
            
            <form method="POST">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required autofocus>
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                
                <button type="submit" name="samsoath_login" class="login-button">
                    Login
                </button>
            </form>
            
            <div class="footer-note">
                Authorized access only
            </div>
        </div>
    </body>
    </html>
    <?php
}

// ============================================================================
// DASHBOARD PAGE
// ============================================================================

function samsoath_render_dashboard_page($section) {
    global $wpdb;
    
    // Get stats
    $total_oaths = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}oath_submissions");
    $stories_pending = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}story_submissions WHERE status = 'pending'");
    $stories_published = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}story_submissions WHERE status = 'published'");
    $messages_unread = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}contact_messages WHERE status = 'unread'");
    
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Control Panel - Sam's OATH</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: #f5f5f5;
                color: #333;
            }
            
            /* Header */
            .header {
                background: linear-gradient(135deg, #3EABA8 0%, #4A6FA5 100%);
                color: white;
                padding: 20px 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header h1 {
                font-size: 24px;
            }
            .header-right {
                display: flex;
                gap: 20px;
                align-items: center;
            }
            .user-info {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .logout-btn {
                color: white;
                text-decoration: none;
                padding: 8px 16px;
                border: 1px solid rgba(255,255,255,0.3);
                border-radius: 6px;
                transition: all 0.3s;
            }
            .logout-btn:hover {
                background: rgba(255,255,255,0.1);
            }
            
            /* Layout */
            .container {
                display: flex;
                min-height: calc(100vh - 68px);
            }
            
            /* Sidebar */
            .sidebar {
                width: 260px;
                background: white;
                padding: 20px 0;
                box-shadow: 2px 0 10px rgba(0,0,0,0.05);
            }
            .nav-item {
                padding: 14px 30px;
                color: #666;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 12px;
                transition: all 0.3s;
                cursor: pointer;
                border-left: 3px solid transparent;
            }
            .nav-item:hover {
                background: #f9f9f9;
                color: #3EABA8;
            }
            .nav-item.active {
                background: #f0f9f9;
                color: #3EABA8;
                border-left-color: #3EABA8;
                font-weight: 600;
            }
            .nav-item i {
                width: 20px;
                text-align: center;
            }
            .nav-badge {
                margin-left: auto;
                background: #e74c3c;
                color: white;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 600;
            }
            
            /* Main Content */
            .main-content {
                flex: 1;
                padding: 30px;
                overflow-y: auto;
            }
            
            /* Stats Cards */
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            .stat-card {
                background: white;
                padding: 24px;
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                transition: transform 0.3s, box-shadow 0.3s;
            }
            .stat-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 4px 16px rgba(0,0,0,0.12);
            }
            .stat-card .icon {
                width: 48px;
                height: 48px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                margin-bottom: 12px;
            }
            .stat-card.teal .icon { background: #e6f7f6; color: #3EABA8; }
            .stat-card.blue .icon { background: #e8f0f7; color: #4A6FA5; }
            .stat-card.orange .icon { background: #fef3ef; color: #E8956F; }
            .stat-card.green .icon { background: #f0f7f0; color: #7AB87A; }
            .stat-card .number {
                font-size: 36px;
                font-weight: 700;
                margin: 8px 0;
                color: #333;
            }
            .stat-card .label {
                color: #666;
                font-size: 14px;
            }
            
            /* Section Header */
            .section-header {
                margin-bottom: 24px;
            }
            .section-header h2 {
                font-size: 28px;
                color: #333;
                margin-bottom: 8px;
            }
            .section-header p {
                color: #666;
                font-size: 14px;
            }
            
            /* Card */
            .card {
                background: white;
                border-radius: 12px;
                padding: 24px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                margin-bottom: 20px;
            }
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 16px;
                border-bottom: 2px solid #f0f0f0;
            }
            .card-header h3 {
                font-size: 20px;
                color: #333;
            }
            
            /* Story Item */
            .story-item {
                padding: 20px;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                margin-bottom: 16px;
                transition: all 0.3s;
            }
            .story-item:hover {
                border-color: #3EABA8;
                box-shadow: 0 4px 12px rgba(62, 171, 168, 0.1);
            }
            .story-meta {
                display: flex;
                gap: 20px;
                margin-bottom: 12px;
                font-size: 13px;
                color: #666;
            }
            .story-meta span {
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .story-title {
                font-size: 18px;
                font-weight: 600;
                color: #333;
                margin-bottom: 8px;
            }
            .story-excerpt {
                color: #666;
                line-height: 1.6;
                margin-bottom: 16px;
            }
            .story-actions {
                display: flex;
                gap: 10px;
            }
            .btn {
                padding: 8px 16px;
                border-radius: 6px;
                border: none;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.3s;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                gap: 6px;
            }
            .btn-primary {
                background: #3EABA8;
                color: white;
            }
            .btn-primary:hover {
                background: #2c8985;
            }
            .btn-secondary {
                background: #f0f0f0;
                color: #333;
            }
            .btn-secondary:hover {
                background: #e0e0e0;
            }
            .btn-danger {
                background: #e74c3c;
                color: white;
            }
            .btn-danger:hover {
                background: #c0392b;
            }
            
            /* Messages */
            .message-item {
                padding: 16px;
                border-left: 4px solid #e0e0e0;
                background: #fafafa;
                margin-bottom: 12px;
                border-radius: 4px;
            }
            .message-item.unread {
                border-left-color: #3EABA8;
                background: #f0f9f9;
            }
            .message-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
            }
            .message-from {
                font-weight: 600;
                color: #333;
            }
            .message-type {
                font-size: 12px;
                padding: 3px 8px;
                border-radius: 12px;
                background: #e0e0e0;
                color: #666;
            }
            .message-type.press { background: #fef3ef; color: #E8956F; }
            .message-type.workplace { background: #e8f0f7; color: #4A6FA5; }
            .message-content {
                color: #666;
                font-size: 14px;
                line-height: 1.5;
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .container { flex-direction: column; }
                .sidebar { width: 100%; }
                .stats-grid { grid-template-columns: 1fr; }
            }
            
            /* Loading State */
            .loading {
                text-align: center;
                padding: 40px;
                color: #999;
            }
            
            /* Empty State */
            .empty-state {
                text-align: center;
                padding: 60px 20px;
                color: #999;
            }
            .empty-state i {
                font-size: 48px;
                margin-bottom: 16px;
                opacity: 0.3;
            }
        </style>
    </head>
    <body>
        <!-- Header -->
        <div class="header">
            <h1>Sam's OATH Control Panel</h1>
            <div class="header-right">
                <div class="user-info">
                    <i class="fas fa-user-circle"></i>
                    <span>Frank Sheeder</span>
                </div>
                <a href="?action=logout" class="logout-btn">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            </div>
        </div>
        
        <div class="container">
            <!-- Sidebar Navigation -->
            <div class="sidebar">
                <a href="#" class="nav-item <?php echo $section === 'dashboard' ? 'active' : ''; ?>" data-section="dashboard">
                    <i class="fas fa-home"></i>
                    <span>Dashboard</span>
                </a>
                <a href="#" class="nav-item <?php echo $section === 'stories' ? 'active' : ''; ?>" data-section="stories">
                    <i class="fas fa-book"></i>
                    <span>Story Review</span>
                    <?php if ($stories_pending > 0): ?>
                        <span class="nav-badge"><?php echo $stories_pending; ?></span>
                    <?php endif; ?>
                </a>
                <a href="#" class="nav-item <?php echo $section === 'messages' ? 'active' : ''; ?>" data-section="messages">
                    <i class="fas fa-envelope"></i>
                    <span>Messages</span>
                    <?php if ($messages_unread > 0): ?>
                        <span class="nav-badge"><?php echo $messages_unread; ?></span>
                    <?php endif; ?>
                </a>
                <a href="#" class="nav-item <?php echo $section === 'oath' ? 'active' : ''; ?>" data-section="oath">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>OATH Submissions</span>
                </a>
                <a href="#" class="nav-item <?php echo $section === 'email' ? 'active' : ''; ?>" data-section="email">
                    <i class="fas fa-paper-plane"></i>
                    <span>Email Center</span>
                </a>
                <a href="#" class="nav-item <?php echo $section === 'analytics' ? 'active' : ''; ?>" data-section="analytics">
                    <i class="fas fa-chart-line"></i>
                    <span>Analytics</span>
                </a>
                <a href="#" class="nav-item <?php echo $section === 'settings' ? 'active' : ''; ?>" data-section="settings">
                    <i class="fas fa-cog"></i>
                    <span>Settings</span>
                </a>
            </div>
            
            <!-- Main Content -->
            <div class="main-content">
                <?php
                switch ($section) {
                    case 'stories':
                        samsoath_render_stories_section();
                        break;
                    case 'messages':
                        samsoath_render_messages_section();
                        break;
                    case 'oath':
                        samsoath_render_oath_section();
                        break;
                    case 'email':
                        samsoath_render_email_section();
                        break;
                    case 'analytics':
                        samsoath_render_analytics_section();
                        break;
                    case 'settings':
                        samsoath_render_settings_section();
                        break;
                    default:
                        samsoath_render_dashboard_overview();
                }
                ?>
            </div>
        </div>
        
        <script>
            // Navigation handling
            document.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const section = this.dataset.section;
                    window.location.href = '/frank-admin/' + section;
                });
            });
        </script>
    </body>
    </html>
    <?php
}

// ============================================================================
// DASHBOARD OVERVIEW SECTION
// ============================================================================

function samsoath_render_dashboard_overview() {
    global $wpdb;
    
    // Get comprehensive stats
    $stats = [
        'total_oaths' => $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}oath_submissions"),
        'stories_pending' => $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}story_submissions WHERE status = 'pending'"),
        'stories_published' => $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}story_submissions WHERE status = 'published'"),
        'messages_unread' => $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}contact_messages WHERE status = 'unread'"),
    ];
    
    // Get recent activity
    $recent_stories = $wpdb->get_results("
        SELECT id, title, name_display, submitted_at 
        FROM {$wpdb->prefix}story_submissions 
        WHERE status = 'pending' 
        ORDER BY submitted_at DESC 
        LIMIT 5
    ");
    
    $recent_messages = $wpdb->get_results("
        SELECT id, name, message_type, submitted_at 
        FROM {$wpdb->prefix}contact_messages 
        WHERE status = 'unread' 
        ORDER BY submitted_at DESC 
        LIMIT 5
    ");
    
    ?>
    <div class="section-header">
        <h2>Welcome Back, Frank</h2>
        <p><?php echo date('l, F j, Y'); ?></p>
    </div>
    
    <!-- Stats Grid -->
    <div class="stats-grid">
        <div class="stat-card teal">
            <div class="icon"><i class="fas fa-hands-helping"></i></div>
            <div class="number"><?php echo number_format($stats['total_oaths']); ?></div>
            <div class="label">OATH Takers</div>
        </div>
        
        <div class="stat-card orange">
            <div class="icon"><i class="fas fa-book-open"></i></div>
            <div class="number"><?php echo number_format($stats['stories_published']); ?></div>
            <div class="label">Stories Published</div>
        </div>
        
        <div class="stat-card blue">
            <div class="icon"><i class="fas fa-clock"></i></div>
            <div class="number"><?php echo number_format($stats['stories_pending']); ?></div>
            <div class="label">Pending Review</div>
        </div>
        
        <div class="stat-card green">
            <div class="icon"><i class="fas fa-envelope-open"></i></div>
            <div class="number"><?php echo number_format($stats['messages_unread']); ?></div>
            <div class="label">Unread Messages</div>
        </div>
    </div>
    
    <!-- Today's Priorities -->
    <?php if ($stats['stories_pending'] > 0 || $stats['messages_unread'] > 0): ?>
    <div class="card">
        <div class="card-header">
            <h3>🎯 Today's Priorities</h3>
        </div>
        <ul style="list-style: none;">
            <?php if ($stats['stories_pending'] > 0): ?>
                <li style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                    <strong><?php echo $stats['stories_pending']; ?></strong> 
                    <?php echo $stats['stories_pending'] === 1 ? 'story' : 'stories'; ?> awaiting review
                </li>
            <?php endif; ?>
            <?php if ($stats['messages_unread'] > 0): ?>
                <li style="padding: 12px 0;">
                    <strong><?php echo $stats['messages_unread']; ?></strong> 
                    unread <?php echo $stats['messages_unread'] === 1 ? 'message' : 'messages'; ?>
                </li>
            <?php endif; ?>
        </ul>
    </div>
    <?php endif; ?>
    
    <!-- Recent Stories Pending -->
    <?php if (!empty($recent_stories)): ?>
    <div class="card">
        <div class="card-header">
            <h3>📝 Recent Story Submissions</h3>
            <a href="/frank-admin/stories" class="btn btn-secondary">View All</a>
        </div>
        <?php foreach ($recent_stories as $story): ?>
            <div class="story-item">
                <div class="story-meta">
                    <span><i class="fas fa-user"></i> <?php echo esc_html($story->name_display); ?></span>
                    <span><i class="fas fa-clock"></i> <?php echo human_time_diff(strtotime($story->submitted_at), current_time('timestamp')); ?> ago</span>
                </div>
                <div class="story-title"><?php echo esc_html($story->title); ?></div>
                <div class="story-actions">
                    <a href="/frank-admin/stories?review=<?php echo $story->id; ?>" class="btn btn-primary">
                        <i class="fas fa-eye"></i> Review
                    </a>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <?php endif; ?>
    
    <!-- Recent Messages -->
    <?php if (!empty($recent_messages)): ?>
    <div class="card">
        <div class="card-header">
            <h3>💬 Recent Messages</h3>
            <a href="/frank-admin/messages" class="btn btn-secondary">View All</a>
        </div>
        <?php foreach ($recent_messages as $message): ?>
            <div class="message-item unread">
                <div class="message-header">
                    <span class="message-from"><?php echo esc_html($message->name); ?></span>
                    <span class="message-type <?php echo $message->message_type; ?>">
                        <?php echo ucfirst($message->message_type); ?>
                    </span>
                </div>
                <div style="font-size: 12px; color: #999; margin-bottom: 4px;">
                    <?php echo human_time_diff(strtotime($message->submitted_at), current_time('timestamp')); ?> ago
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <?php endif; ?>
    <?php
}

// ============================================================================
// STORIES SECTION (Review Interface)
// ============================================================================

function samsoath_render_stories_section() {
    global $wpdb;
    
    // Handle story actions
    if (isset($_POST['action']) && isset($_POST['story_id'])) {
        $story_id = intval($_POST['story_id']);
        $action = sanitize_text_field($_POST['action']);
        
        if ($action === 'approve') {
            $wpdb->update(
                $wpdb->prefix . 'story_submissions',
                [
                    'status' => 'published',
                    'reviewed_at' => current_time('mysql'),
                    'reviewed_by' => 'frank',
                    'publication_date' => current_time('mysql'),
                    'visible_on_map' => true
                ],
                ['id' => $story_id]
            );
            echo '<div style="background: #d4edda; color: #155724; padding: 12px; border-radius: 6px; margin-bottom: 20px;">Story approved and published!</div>';
            
            // TODO: Send email to author notifying them
            
        } elseif ($action === 'reject') {
            $reason = sanitize_textarea_field($_POST['rejection_reason']);
            $wpdb->update(
                $wpdb->prefix . 'story_submissions',
                [
                    'status' => 'rejected',
                    'reviewed_at' => current_time('mysql'),
                    'reviewed_by' => 'frank',
                    'rejection_reason' => $reason
                ],
                ['id' => $story_id]
            );
            echo '<div style="background: #f8d7da; color: #721c24; padding: 12px; border-radius: 6px; margin-bottom: 20px;">Story rejected.</div>';
            
            // TODO: Send email to author (if provided)
        }
    }
    
    // Get pending stories
    $pending_stories = $wpdb->get_results("
        SELECT * FROM {$wpdb->prefix}story_submissions 
        WHERE status = 'pending' 
        ORDER BY submitted_at DESC
    ");
    
    ?>
    <div class="section-header">
        <h2>Story Review</h2>
        <p>Review and approve submitted stories</p>
    </div>
    
    <?php if (empty($pending_stories)): ?>
        <div class="empty-state">
            <i class="fas fa-check-circle"></i>
            <h3>All Caught Up!</h3>
            <p>No stories pending review</p>
        </div>
    <?php else: ?>
        <?php foreach ($pending_stories as $story): ?>
            <div class="card">
                <div class="card-header">
                    <div>
                        <h3><?php echo esc_html($story->title); ?></h3>
                        <div style="font-size: 14px; color: #666; margin-top: 4px;">
                            By <?php echo esc_html($story->name_display); ?> from <?php echo esc_html($story->city); ?>, <?php echo esc_html($story->state); ?>
                        </div>
                    </div>
                    <div style="font-size: 13px; color: #999;">
                        Submitted <?php echo human_time_diff(strtotime($story->submitted_at), current_time('timestamp')); ?> ago
                    </div>
                </div>
                
                <div style="line-height: 1.8; color: #333; margin-bottom: 24px;">
                    <?php echo nl2br(esc_html($story->content)); ?>
                </div>
                
                <div style="font-size: 13px; color: #666; margin-bottom: 16px;">
                    <strong>Word count:</strong> <?php echo $story->word_count; ?> |
                    <strong>Email:</strong> <?php echo $story->email ? esc_html($story->email) : 'Not provided'; ?>
                </div>
                
                <form method="POST" style="border-top: 2px solid #f0f0f0; padding-top: 20px;">
                    <input type="hidden" name="story_id" value="<?php echo $story->id; ?>">
                    
                    <div style="display: flex; gap: 12px; margin-bottom: 16px;">
                        <button type="submit" name="action" value="approve" class="btn btn-primary">
                            <i class="fas fa-check"></i> Approve & Publish
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="this.parentElement.nextElementSibling.style.display='block'; this.parentElement.style.display='none';">
                            <i class="fas fa-times"></i> Reject
                        </button>
                    </div>
                    
                    <div style="display: none;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 500;">Rejection Reason (optional):</label>
                        <textarea name="rejection_reason" style="width: 100%; padding: 12px; border: 1px solid #e0e0e0; border-radius: 6px; font-family: inherit; margin-bottom: 12px;" rows="3"></textarea>
                        <div style="display: flex; gap: 12px;">
                            <button type="submit" name="action" value="reject" class="btn btn-danger">
                                Confirm Rejection
                            </button>
                            <button type="button" class="btn btn-secondary" onclick="this.parentElement.parentElement.style.display='none'; this.parentElement.parentElement.previousElementSibling.style.display='flex';">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
    <?php
}

// ============================================================================
// MESSAGES SECTION
// ============================================================================

function samsoath_render_messages_section() {
    global $wpdb;
    
    // Handle mark as read
    if (isset($_POST['mark_read'])) {
        $message_id = intval($_POST['message_id']);
        $wpdb->update(
            $wpdb->prefix . 'contact_messages',
            ['status' => 'read', 'read_at' => current_time('mysql')],
            ['id' => $message_id]
        );
    }
    
    // Get all messages
    $messages = $wpdb->get_results("
        SELECT * FROM {$wpdb->prefix}contact_messages 
        ORDER BY submitted_at DESC 
        LIMIT 50
    ");
    
    ?>
    <div class="section-header">
        <h2>Messages</h2>
        <p>All contact form submissions</p>
    </div>
    
    <?php if (empty($messages)): ?>
        <div class="empty-state">
            <i class="fas fa-inbox"></i>
            <h3>No Messages Yet</h3>
            <p>Messages will appear here when people contact you</p>
        </div>
    <?php else: ?>
        <?php foreach ($messages as $msg): ?>
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
                    <div>
                        <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
                            <h3 style="margin: 0;"><?php echo esc_html($msg->name); ?></h3>
                            <span class="message-type <?php echo $msg->message_type; ?>">
                                <?php echo ucfirst($msg->message_type); ?>
                            </span>
                            <?php if ($msg->status === 'unread'): ?>
                                <span style="background: #e74c3c; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">NEW</span>
                            <?php endif; ?>
                        </div>
                        <div style="font-size: 14px; color: #666;">
                            <?php echo esc_html($msg->email); ?>
                            <?php if ($msg->phone): ?>
                                | <?php echo esc_html($msg->phone); ?>
                            <?php endif; ?>
                        </div>
                    </div>
                    <div style="font-size: 13px; color: #999;">
                        <?php echo date('M j, Y g:i A', strtotime($msg->submitted_at)); ?>
                    </div>
                </div>
                
                <?php if ($msg->company): ?>
                    <div style="font-size: 14px; color: #666; margin-bottom: 12px;">
                        <strong>Company:</strong> <?php echo esc_html($msg->company); ?>
                        <?php if ($msg->company_size): ?>
                            (<?php echo esc_html($msg->company_size); ?> employees)
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
                
                <div style="background: #f9f9f9; padding: 16px; border-radius: 6px; line-height: 1.6; margin-bottom: 16px;">
                    <?php echo nl2br(esc_html($msg->message)); ?>
                </div>
                
                <div style="display: flex; gap: 12px;">
                    <a href="mailto:<?php echo esc_attr($msg->email); ?>" class="btn btn-primary">
                        <i class="fas fa-reply"></i> Reply
                    </a>
                    <?php if ($msg->status === 'unread'): ?>
                        <form method="POST" style="display: inline;">
                            <input type="hidden" name="message_id" value="<?php echo $msg->id; ?>">
                            <button type="submit" name="mark_read" class="btn btn-secondary">
                                <i class="fas fa-check"></i> Mark as Read
                            </button>
                        </form>
                    <?php endif; ?>
                </div>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
    <?php
}

// Stub functions for other sections (to be completed)
function samsoath_render_oath_section() {
    echo '<div class="section-header"><h2>OATH Submissions</h2><p>Coming soon...</p></div>';
}

function samsoath_render_email_section() {
    echo '<div class="section-header"><h2>Email Center</h2><p>Coming soon...</p></div>';
}

function samsoath_render_analytics_section() {
    echo '<div class="section-header"><h2>Analytics</h2><p>Coming soon...</p></div>';
}

function samsoath_render_settings_section() {
    echo '<div class="section-header"><h2>Settings</h2><p>Coming soon...</p></div>';
}

?>
