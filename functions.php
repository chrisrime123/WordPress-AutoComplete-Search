<?php 
add_action( 'wp_ajax_nopriv_custom_search', 'custom_search' );
add_action( 'wp_ajax_custom_search', 'custom_search' );

function custom_search() {
	$my_query = new WP_Query(array(
		'post_type' => array('post', 'page'), //add custom post types here if you want to search
		's'  => $_REQUEST['s']
	));
	$search_posts = $my_query->posts;
	foreach($search_posts as $index => $search_post){
		$search_posts[$index]->post_content = strip_tags($search_post->post_content);
	}
	print json_encode($search_posts);
	exit;
}