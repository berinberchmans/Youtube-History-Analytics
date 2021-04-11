<?php
if (isset($_POST['submit'])) {
  $file = $_FILES['watch-history'];
  // print_r($file);
  $fileName = $_FILES['watch-history']['name'];
  $fileTmpName = $_FILES['watch-history']['tmp_name'];
  $fileSize = $_FILES['watch-history']['size'];
  $fileError = $_FILES['watch-history']['error'];
  $fileType = $_FILES['watch-history']['type'];

  $fileExt = explode('.', $fileName);
  $fileActualExt = strtolower(end($fileExt));

  $allowed = array('json');

  if (in_array($fileActualExt, $allowed)) {
    if ($fileError === 0) {
      if($fileSize < 10000000){
          // $fileNameNew = uniqid('', true).".".$fileActualExt;
          $target_dir = "data-files/watch-history.json";
          move_uploaded_file($fileTmpName,$target_dir);
          header("Location: index.html?uploadsuccess");
      }else{
        echo "File too big!";
      }
    }else{
      echo "Error uploading file!";
    }
  } else {
    echo "Upload the watch-history.json file!";
  }
}
// $target_dir = "./data-files/";
// $target_file = $target_dir . basename($_FILES["watch-history"]["name"]);
// $uploadOk = 1;
