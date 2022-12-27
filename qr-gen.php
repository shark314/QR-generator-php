<?php

function CallAPI($method, $url, $data = false)
{
    $curl = curl_init();

    switch ($method) {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);

            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_PUT, 1);
            break;
        default:
            if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    // Optional Authentication:
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($curl, CURLOPT_USERPWD, "username:password");

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);

    curl_close($curl);

    return $result;
}

// process ajax req
try {
    $data = $_POST["data"];
    $api_token = "iJ6KKMMeE-26WC_X1XrScvRKunhTfuudCtoYe-T-y4hQ6I9Z9PsQbzYE-FEi4meC";
    $qr_gen_url = "https://api.qr-code-generator.com/v1/create?access-token=" . $api_token;

    $params = [
        "qr_code_text" => "hello world",
        "image_format" => "SVG",
        "image_width" => 500,
        "download" => 1,
        "foreground_color" => isset($data["sharp"]["code_color"]) ? $data["sharp"]["code_color"] : "#000000",
        "background_color" => isset($data["sharp"]["back_color"]) ? $data["sharp"]["back_color"] : "#FFFFFF",
        "qr_code_logo" => isset($data["logo"]["style"]) ? $data["logo"]["style"] : "no-logo",
        "frame_color" => isset($data["frame"]["color"]) ? $data["frame"]["color"] : "#FFFFFF",
        "frame_text" => isset($data["frame"]["text"]) ? $data["frame"]["text"] : "Scan Me",
//    "frame_text_color" => "#ffffff",
//    "frame_icon_name" => "app",
        "frame_name" => isset($data["frame"]["style"]) ? $data["frame"]["style"] : "no-frame",
        "qr_code_pattern" => isset($data["sharp"]["style"]) ? $data["sharp"]["style"] : "no-frame"
    ];
    if ($data["edges"]["tab"] == "all") {
        $params = array_merge($params, [
            "marker_left_inner_color" => isset($data["edges"]["all"]["inner_color"]) ? $data["edges"]["all"]["inner_color"] : "#000000",
            "marker_left_outer_color" => isset($data["edges"]["all"]["outer_color"]) ? $data["edges"]["all"]["outer_color"] : "#000000",
            "marker_right_inner_color" => isset($data["edges"]["all"]["inner_color"]) ? $data["edges"]["all"]["inner_color"] : "#000000",
            "marker_right_outer_color" => isset($data["edges"]["all"]["outer_color"]) ? $data["edges"]["all"]["outer_color"] : "#000000",
            "marker_bottom_inner_color" => isset($data["edges"]["all"]["inner_color"]) ? $data["edges"]["all"]["inner_color"] : "#000000",
            "marker_bottom_outer_color" => isset($data["edges"]["all"]["outer_color"]) ? $data["edges"]["all"]["outer_color"] : "#000000",
            "marker_left_template" => isset($data["edges"]["all"]["style"]) ? "version".$data["edges"]["all"]["style"] : "version1",
            "marker_right_template" => isset($data["edges"]["all"]["style"]) ? "version".$data["edges"]["all"]["style"] : "version1",
            "marker_bottom_template" => isset($data["edges"]["all"]["style"]) ? "version".$data["edges"]["all"]["style"] : "version1",
        ]);
    } else {
        $params = array_merge($params, [
            "marker_left_inner_color" => isset($data["edges"]["top_left"]["inner_color"]) ? $data["edges"]["top_left"]["inner_color"] : "#000000",
            "marker_left_outer_color" => isset($data["edges"]["top_left"]["outer_color"]) ? $data["edges"]["top_left"]["outer_color"] : "#000000",
            "marker_right_inner_color" => isset($data["edges"]["top_right"]["inner_color"]) ? $data["edges"]["top_right"]["inner_color"] : "#000000",
            "marker_right_outer_color" => isset($data["edges"]["top_right"]["outer_color"]) ? $data["edges"]["top_right"]["outer_color"] : "#000000",
            "marker_bottom_inner_color" => isset($data["edges"]["bottom_left"]["inner_color"]) ? $data["edges"]["bottom_left"]["inner_color"] : "#000000",
            "marker_bottom_outer_color" => isset($data["edges"]["bottom_left"]["outer_color"]) ? $data["edges"]["bottom_left"]["outer_color"] : "#000000",
            "marker_left_template" => isset($data["edges"]["top_left"]["style"]) ? "version".$data["edges"]["top_left"]["style"] : "version1",
            "marker_right_template" => isset($data["edges"]["top_right"]["style"]) ? "version".$data["edges"]["top_right"]["style"] : "version1",
            "marker_bottom_template" => isset($data["edges"]["bottom_left"]["style"]) ? "version".$data["edges"]["bottom_left"]["style"] : "version1",
        ]);
    }
    $results = CallAPI("POST", $qr_gen_url, $params);

    $file_name = "./qr-codes/user-id/".time().".svg";
    file_put_contents($file_name, $results);
    echo json_encode(["status" => "success", "path" => $file_name]);
    return;
} catch (Exception $e) {
    file_put_contents("./log.txt", 'Caught exception: ' . $e->getMessage() . "\n");
    echo json_encode(["status" => "error", "error" => $e->getMessage()]);
    return;
}