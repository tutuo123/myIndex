<?php
header('content-type:text/html;charset="utf-8"');
error_reporting(0);

$news = array(
	array(‘img’=>’video/1.jpg’),
	array(‘img’=>’video/2.jpg’),
	array(‘img’=>’video/3.jpg’),
	array(‘img’=>’video/4.jpg’),
	array(‘img’=>’video/5.jpg’),
	array(‘img’=>’video/6.jpg’),
	array(‘img’=>’video/7.jpg’),
	array(‘img’=>’video/8.jpg’),
	array(‘img’=>’video/9.jpg’),
	array(‘img’=>’video/10.jpg’),
	array(‘img’=>’video/11.jpg’),
	array(‘img’=>’video/12.jpg’),
	array(‘img’=>’video/13.jpg’),
	array(‘img’=>’video/14.jpg’),
	array(‘img’=>’video/15.jpg’),
	array(‘img’=>’video/16.jpg’),	
);

echo json_encode($news);
