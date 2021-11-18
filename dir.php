var files = <?php 
    $out = array();
    foreach (glob('file/*.png') as $filename) {
        $p = pathinfo($filename);
        $out[] = $p['filename'];
    }
    echo json_encode($out); 
?>;