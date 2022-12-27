function toggleTab(evt, tabName) {
    // Declare all variables
    let i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName + "_tab").style.display = "block";
    evt.currentTarget.className += " active";
}

function stringToHex(str) {
    return "#" + str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase().substring(0, 6).replace(/[^a-f0-9]/g, "f").padEnd(6, "0");
}

$(document).ready(function () {
    // $("#btn_modal").click();
    let status = {
        page: "home",
        frame: {
            style: "qrcg-scan-me-arrow-frame",
            color: "#000000",
            text: "Scan Me"
        },
        sharp: {
            style: "rounded-2",
            code_color: "#000000",
            back_color: "#ffffff"
        },
        logo: {
            style: "no-logo",
        },
        edges: {
            tab: "all",
            all: {
                style: "17",
                outer_color: "#000000",
                inner_color: "#000000",
            },
            top_left: {
                style: "17",
                outer_color: "#000000",
                inner_color: "#000000",
            },
            top_right: {
                style: "17",
                outer_color: "#000000",
                inner_color: "#000000",
            },
            bottom_left: {
                style: "17",
                outer_color: "#000000",
                inner_color: "#000000",
            }
        }
    };

    $(".tablinks").click(function (e) {
        status.edges.tab = $(this).data("target");
        toggleTab(e, status.edges.tab);
    });

    const corner_url = "./images/corner/corner-img-no.png";

    function makeCornerUrl(no) {
        return corner_url.replace("img-no", no);
    }

    function init_page() {
        // Page
        $(".qr-content").addClass("d-none");
        $("#" + status.page + "_content").removeClass("d-none");
        if (status.page !== "home") {
            $("#btn_back").removeClass("d-none");
        } else {
            $("#btn_back").addClass("d-none");
        }
        // Frame
        $("div[data-target^=frame]").removeClass("active");
        $("div[data-target='frame."+status.frame.style+"']").addClass("active");
        if (status.frame.color != $(".frame-color-picker input[type=text]")) {
            $(".frame-color-picker input[type=text]").val(status.frame.color);
            $(".frame-color-picker input[type=color]").val(stringToHex(status.frame.color));
        }
        $(".frame-text").val(status.frame.text);
        // SHARP
        $("div[data-target^=sharp]").removeClass("active");
        $("div[data-target='sharp."+status.sharp.style+"']").addClass("active");
        if (status.sharp.code_color != $(".code-color-picker input[type=text]")) {
            $(".code-color-picker input[type=text]").val(status.sharp.code_color);
            $(".code-color-picker input[type=color]").val(stringToHex(status.sharp.code_color));
        }
        if (status.sharp.back_color != $(".back-color-picker input[type=text]")) {
            $(".back-color-picker input[type=text]").val(status.sharp.back_color);
            $(".back-color-picker input[type=color]").val(stringToHex(status.sharp.back_color));
        }
        // EDGE
        $("#dropdown_all>button>img").attr("src", makeCornerUrl(status.edges.all.style));
        $("#dropdown_top_left>button>img").attr("src", makeCornerUrl(status.edges.top_left.style));
        $("#dropdown_top_right>button>img").attr("src", makeCornerUrl(status.edges.top_right.style));
        $("#dropdown_bottom_left>button>img").attr("src", makeCornerUrl(status.edges.bottom_left.style));
        // LOGO
        $("div[data-target^=logo]").removeClass("active");
        $("div[data-target='logo."+status.logo.style+"']").addClass("active");
        // All
        if (status.edges.all.inner_color != $(".all-inner-color-picker input[type=text]")) {
            $(".all-inner-color-picker input[type=text]").val(status.edges.all.inner_color);
            $(".all-inner-color-picker input[type=color]").val(stringToHex(status.edges.all.inner_color));
        }
        if (status.edges.all.outer_color != $(".all-outer-color-picker input[type=text]")) {
            $(".all-outer-color-picker input[type=text]").val(status.edges.all.outer_color);
            $(".all-outer-color-picker input[type=color]").val(stringToHex(status.edges.all.outer_color));
        }
        // Custom top left
        if (status.edges.top_left.inner_color != $(".tl-inner-color-picker input[type=text]")) {
            $(".tl-inner-color-picker input[type=text]").val(status.edges.top_left.inner_color);
            $(".tl-inner-color-picker input[type=color]").val(stringToHex(status.edges.top_left.inner_color));
        }
        if (status.edges.top_left.outer_color != $(".tl-outer-color-picker input[type=text]")) {
            $(".tl-outer-color-picker input[type=text]").val(status.edges.top_left.outer_color);
            $(".tl-outer-color-picker input[type=color]").val(stringToHex(status.edges.top_left.outer_color));
        }
        // top right
        if (status.edges.top_right.inner_color != $(".tr-inner-color-picker input[type=text]")) {
            $(".tr-inner-color-picker input[type=text]").val(status.edges.top_right.inner_color);
            $(".tr-inner-color-picker input[type=color]").val(stringToHex(status.edges.top_right.inner_color));
        }
        if (status.edges.top_right.outer_color != $(".tr-outer-color-picker input[type=text]")) {
            $(".tr-outer-color-picker input[type=text]").val(status.edges.top_right.outer_color);
            $(".tr-outer-color-picker input[type=color]").val(stringToHex(status.edges.top_right.outer_color));
        }
        // bottom left
        if (status.edges.bottom_left.inner_color != $(".bl-inner-color-picker input[type=text]")) {
            $(".bl-inner-color-picker input[type=text]").val(status.edges.bottom_left.inner_color);
            $(".bl-inner-color-picker input[type=color]").val(stringToHex(status.edges.bottom_left.inner_color));
        }
        if (status.edges.bottom_left.outer_color != $(".bl-outer-color-picker input[type=text]")) {
            $(".bl-outer-color-picker input[type=text]").val(status.edges.bottom_left.outer_color);
            $(".bl-outer-color-picker input[type=color]").val(stringToHex(status.edges.bottom_left.outer_color));
        }

        // ajax request
        $(".qr-img").addClass("d-none");
        $("#loading_bar").removeClass("d-none");
        $.ajax({
            url: "./qr-gen.php",
            type: 'POST',
            data: {data: status},
            success: function(data) {
                const res = JSON.parse(data);
                if (res.status === "success") {
                    $(".qr-img").attr("src", res.path);
                    $(".qr-img").removeClass("d-none");
                    $("#loading_bar").addClass("d-none");
                } else {
                    console.log("error", res);
                }
            },
            error: function (e){
                console.log("------error in server------", e);
            }
        });
    }

    init_page();

    $(".dropdown-item").click(function () {
        status.edges[$(this).data("target").split("-")[0]].style = $(this).data("target").split("-")[1];
        init_page();
    });

    $("#btn_all_frames").click(function () {
        if (status.page !== "all_frames") {
            status.page = "all_frames";
            init_page();
        }
    });

    $("#btn_more_options").click(function () {
        if (status.page !== "more_options") {
            status.page = "more_options";
            init_page();
        }
    });

    $("#btn_back").click(function () {
        if (status.page !== "home") {
            status.page = "home";
            init_page();
        }
    });

    $(".btn-image").click(function () {
        status[$(this).data("target").split(".")[0]].style = $(this).data("target").split(".")[1];
        init_page();
    });

    let timerId = "";

    $(".frame-color-picker input[type=color]").change(function () {
        status.frame.color = $(this).val();
        init_page();
    });

    $(".code-color-picker input[type=color]").change(function () {
        status.sharp.code_color = $(this).val();
        init_page();
    });

    $(".back-color-picker input[type=color]").change(function () {
        status.sharp.back_color = $(this).val();
        init_page();
    });

    $(".all-inner-color-picker input[type=color]").change(function () {
        status.edges.all.inner_color = $(this).val();
        init_page();
    });

    $(".all-outer-color-picker input[type=color]").change(function () {
        status.edges.all.outer_color = $(this).val();
        init_page();
    });

    $(".tl-inner-color-picker input[type=color]").change(function () {
        status.edges.top_left.inner_color = $(this).val();
        init_page();
    });

    $(".tl-outer-color-picker input[type=color]").change(function () {
        status.edges.top_left.outer_color = $(this).val();
        init_page();
    });

    $(".tr-inner-color-picker input[type=color]").change(function () {
        status.edges.top_right.inner_color = $(this).val();
        init_page();
    });

    $(".tr-outer-color-picker input[type=color]").change(function () {
        status.edges.top_right.outer_color = $(this).val();
        init_page();
    });

    $(".bl-inner-color-picker input[type=color]").change(function () {
        status.edges.bottom_left.inner_color = $(this).val();
        init_page();
    });

    $(".bl-outer-color-picker input[type=color]").change(function () {
        status.edges.bottom_left.outer_color = $(this).val();
        init_page();
    });

    $(".frame-color-picker input[type=text]").keyup(function () {
        const color = $(this).val();
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(function () {
            status.frame.color = color;
            init_page();
        }, 250);
    });

    $(".code-color-picker input[type=text]").keyup(function () {
        const color = $(this).val();
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(function () {
            status.sharp.code_color = color;
            init_page();
        }, 250);
    });

    $(".back-color-picker input[type=text]").keyup(function () {
        const color = $(this).val();
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(function () {
            status.sharp.back_color = color;
            init_page();
        }, 250);
    });

    $(".all-inner-color-picker input[type=text]").keyup(function () {
        const color = $(this).val();
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(function () {
            status.edges.all.inner_color = color;
            init_page();
        }, 250);
    });

    $(".all-outer-color-picker input[type=text]").keyup(function () {
        const color = $(this).val();
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(function () {
            status.edges.all.outer_color = color;
            init_page();
        }, 250);
    });

    $(".tl-inner-color-picker input[type=text]").keyup(function () {
        const color = $(this).val();
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(function () {
            status.edges.top_left.inner_color = color;
            init_page();
        }, 250);
    });

    $(".tl-outer-color-picker input[type=text]").keyup(function () {
        const color = $(this).val();
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(function () {
            status.edges.top_left.outer_color = color;
            init_page();
        }, 250);
    });

    $(".tr-inner-color-picker input[type=text]").keyup(function () {
        const color = $(this).val();
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(function () {
            status.edges.top_right.inner_color = color;
            init_page();
        }, 250);
    });

    $(".tr-outer-color-picker input[type=text]").keyup(function () {
        const color = $(this).val();
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(function () {
            status.edges.top_right.outer_color = color;
            init_page();
        }, 250);
    });

    $(".bl-inner-color-picker input[type=text]").keyup(function () {
        const color = $(this).val();
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(function () {
            status.edges.bottom_left.inner_color = color;
            init_page();
        }, 250);
    });

    $(".bl-outer-color-picker input[type=text]").keyup(function () {
        const color = $(this).val();
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(function () {
            status.edges.bottom_left.outer_color = color;
            init_page();
        }, 250);
    });
});