<?php
    $dsn = 'mysql:dbname=registrationAppDb;host=localhost';
    $user = 'registrationApp';
    $password = 'getgood';

    // echo json_encode($_POST);

    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $areaCode = $_POST['areaCode'];
    $phoneNumber = $_POST['phoneNumber'];
    $companyName = $_POST['companyName'];

    // echo $firstName;
    // echo $lastName;
    // echo $email;
    // echo $areaCode;
    // echo $phoneNumber;
    // echo $companyName;
    
    try {
        $dbh = new PDO($dsn, $user, $password);

        $statement = 'INSERT INTO registers
        (
            S_FIRST_NAME,
            S_LAST_NAME,
            S_EMAIL,
            N_AREA_CODE,
            N_PHONE_NUMBER,
            S_COMPANY_NAME
        )
         VALUES(
            :firstName,
            :lastName,
            :email,
            :areaCode,
            :phoneNumber,
            :companyName
         )';

        $query = $dbh->prepare($statement);
        $query->execute([
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'areaCode' => $areaCode,
            'phoneNumber' => $phoneNumber,
            'companyName' => $companyName
        ]);
        $query->setFetchMode(PDO::FETCH_ASSOC);
        $result = $query->fetchAll();

        // echo "Information Submited!";


    } catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
    }
?>