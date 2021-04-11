<?php 
// PHP program to delete a file named gfg.txt  
// using unlike() function  
   
$file_pointer = "data-files/watch-history.json";  
   
// Use unlink() function to delete a file  
if (!unlink($file_pointer)) {  
    echo ("$file_pointer cannot be deleted due to an error");  
    header("Location: index.html?uploadsuccess");
}  
else {  
    echo ("$file_pointer has been deleted");  
    header("Location: index.html?uploadsuccess");
}  
  
?>  