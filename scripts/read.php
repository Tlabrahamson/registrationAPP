<?php
    $dsn = 'mysql:dbname=registrationAppDb;host=localhost';
    $user = 'registrationApp';
    $password = 'getgood';

    try {
        $dbh = new PDO($dsn, $user, $password);

        $statement = 'SELECT 
            S_FIRST_NAME as firstName,
            S_LAST_NAME as lastName,
            S_EMAIL as email,
            N_AREA_CODE as areaCode,
            N_PHONE_NUMBER as phoneNumber,
            S_COMPANY_NAME as companyName
         FROM registers';

        $query = $dbh->prepare($statement);
        $query->execute();
        $query->setFetchMode(PDO::FETCH_ASSOC);
        $result = $query->fetchAll();

        echo json_encode($result);

    } catch (PDOException $e) {
        echo 'Connection failed: ' . $e->getMessage();
    }
?>