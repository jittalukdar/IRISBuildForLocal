/*#### GLOBAL VARIABLES ####*/
//var BASE_URL = "http://localhost/iris/dev/";
var BASE_URL = "http://dev.wrctechnologies.com/irisdesign/dev/";
var html_body_back = '<input type="text" placeholder="Enter your keyword"><a class="search" href="#">Post</a> <a class="cls" href="#"></a>';
// Regular Expression for Email.
var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
var loading = '<div class="card feedbox">' +
        '<div class="row">' +
        '<div id="newsfeed15" class="col-md-12 newsfeed newsfeed2">' +
        '<div class="card-body" style="text-align: center; padding: 150px 0;">' +
        '<img src="img/loading.gif">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
/*#### GLOBAL VARIABLES ####*/
$(document).ready(function () {
    $("#loadHome").click(function () {
//        $('#base').css('padding-left', '240px');
        $(".loadContent").fadeOut("fast");
        $(".loadContent").load("home.html").css("display", "none");
        $(".loadContent").slideDown(500);
        setTimeout(function () {
            dashboardFunctions();
        }, 1000);
    });
    $("#loadGroups").click(function () {
        $(".loadContent").fadeOut("fast");
        $(".loadContent").load("groups.html").css("display", "none");
        $(".loadContent").slideDown(500);
        setTimeout(function () {
            groupFunction();
        }, 1000);
    });
    $("#loadLearn").click(function () {
        $(".loadContent").fadeOut("fast");
        $(".loadContent").load("learnmeterial.html").css("display", "none");
        $(".loadContent").slideDown(500);
        setTimeout(function () {
            learnMeterialFunctions();
        }, 1000);
    });
    $("#loadGoals").click(function () {
        $(".loadContent").fadeOut("fast");
        $(".loadContent").load("goals.html").css("display", "none");
        $(".loadContent").slideDown(500);
    });
    $("#loadRewards").click(function () {
        $(".loadContent").fadeOut("fast");
        $(".loadContent").load("reward.html").css("display", "none");
        $(".loadContent").slideDown(500);
        setTimeout(function () {
            rewardFunction();
        }, 1000);
    });
    $("#loadEmail").click(function () {
        $(".loadContent").load("email.html");
    });
});
// REGISTRATION CODE
function regFunction() {
    $("#formSubmitReg1").click(function () {
        if (validateRegWithEmailForm()) {
            var todo = "reg";
            var fname = $('#fname').val();
            var lname = $('#lname').val();
            var email = $('#email').val();
            var password = $('#password').val();
            var avatar = $("#imageRaw").val();
            callApiForRegistration(todo, fname, lname, email, password, avatar);
        }
    });
}
function validateForm() {
    var bool = true;
    if ($.trim($("#fname").val()) === "" || $.trim($("#fname").val().length) === 0) {
        $("#fname").addClass("error");
        $("#fname").focus();
        bool = false;
    } else if ($.trim($("#lname").val()) === "" || $.trim($("#lname").val().length) === 0) {
        $("#lname").addClass("error");
        $("#lname").focus();
        bool = false;
    } else if ($.trim($("#email").val()) === "" || $.trim($("#email").val().length) === 0) {
        $("#email").addClass("error");
        $("#email").focus();
        bool = false;
    } else if (!regex.test($("#email").val())) {
        $("#email").addClass("error");
        $("#email").focus();
        bool = false;
    }
//    else if (!checkUniqueEmail($("#email").val())) {
//        $("#email").addClass("error");
//        $("#email").focus();
//        navigator.notification.alert("Your email id must be unique", null, "Notification", "OK");
//        bool = false;
//    } 
    else if ($.trim($("#password").val()) === "" || $.trim($("#password").val().length) === 0) {
        $("#password").addClass("error");
        $("#password").focus();
        bool = false;
    } else if ($.trim($("#cpassword").val()) === "" || $.trim($("#cpassword").val().length) === 0) {
        $("#cpassword").addClass("error");
        $("#cpassword").focus();
        bool = false;
    } else if ($.trim($("#cpassword").val()) !== $.trim($("#password").val())) {
        $("#cpassword").addClass("error");
        $("#cpassword").focus();
        bool = false;
    } else {
        bool = true;
    }
    return bool;
}
function callApiForRegistration(todo, fname, lname, email, password, avatar) {
    $.ajax({
        url: BASE_URL + 'api/registration',
        type: "POST",
        data: {
            todo: todo,
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            avatar: avatar
        },
        success: function (resp) {
            var data = $.parseJSON(resp);
            if (data.code == '200') {
                sessionStorage.setItem("uid", data.uid);
                location.href = 'selectinterest.html';
                if (data.toast !== "") {
                    navigator.notification.alert(data.toast, null, "Notification", "OK");
                }
            } else {
                navigator.notification.alert(data.error, null, "Notification", "OK");
            }
        }
    });
}
function getBankDetails() {
    $.ajax({
        url: BASE_URL + 'api/getSignUpBank',
        type: 'POST',
        data: $("#loginForm").serialize(),
        success: function (resp) {
            var obj = $.parseJSON(resp);
            if (obj.code == '200') {
                $("#signInBankName").text("SIGN IN WITH " + obj.bankname);
            } else {
                $("#signInBankName").text("SIGN IN WITH BANK OF AMERICA");
            }
        }
    });
}
function regEmailFunction() {
//    onLoadRegEmailFunction();
    $("#formSubmitRegEmail").click(function () {
        if (validateRegWithEmailForm()) {
            var todo = "regwithbank";
            var fname = "Test";
            var lname = "Test";
            var email = $('#email').val();
            var password = '';
            var avatar = encodeURI($(".flex-active-slide img").attr("src"));
//            alert(avatar);
            callApiForRegistration(todo, fname, lname, email, password, avatar);
        }
    });
}
function validateRegWithEmailForm() {
    var bool = true;
    if ($.trim($("#email").val()) === "" || $.trim($("#email").val().length) === 0) {
        $("#email").addClass("error");
        $("#email").focus();
        bool = false;
    } else if (!regex.test($("#email").val())) {
        $("#email").addClass("error");
        $("#email").focus();
        bool = false;
    }
//    else if (checkUniqueEmail($("#email").val()) == false) {
//        $("#email").addClass("error");
//        $("#email").focus();
//        navigator.notification.alert("Your email id must be unique", null, "Notification", "OK");
//        bool = false;
//    } 
    else {
        bool = true;
    }
    return bool;
}
/*function onLoadRegEmailFunction() {
 $.ajax({
 url: BASE_URL + 'api/getSignUpBankLogo',
 type: 'POST',
 data: $("#loginForm").serialize(),
 success: function (resp) {
 var obj = $.parseJSON(resp);
 if (obj.code == '200') {
 $("#bankimage").html('<img src="' + obj.banklogo + '" draggable="false" height="130" height="129"/>');
 } else {
 $("#signInBankName").text("SIGN IN WITH BANK OF AMERICA");
 }
 }
 });
 }*/
// REGISTRATION CODE

// SELECT INTEREST CODE
function callSelectInterest() {
    if (sessionStorage.getItem("login")) {
        location.href = "dashboard.html";
    } else {
        fetchInterests();
    }
}
function fetchInterests() {
    $.ajax({
        url: BASE_URL + 'api/fetchInterestMaster',
        type: "POST",
        data: {
            todo: "fetch"
        },
        success: function (resp) {
            var data = $.parseJSON(resp);
            var output = "";
            for (var i = 0; i < data.length; i++) {
                output += '<li id="' + data[i].topic_id + '"><a href="#" onclick="addClassInterests(' + data[i].topic_id + ')">' + data[i].topic_name + '</a></li>';
            }
            $("#interests").html(output);
            var uid = '<input type="hidden" id="uid" name="uid" value="' + sessionStorage.getItem("uid") + '">';
            $("#selInt").append(uid);
        }
    });
    $("#done").click(function () {
        $.ajax({
            url: BASE_URL + 'api/insertRegisteredUsersChoice',
            type: "POST",
            data: $("#selectedForm").serialize(),
            success: function (resp) {
                var data = $.parseJSON(resp);
                if (data.code == "200") {
                    location.href = 'dashboard.html';
                } else {
                    navigator.notification.alert(data.error, null, "Notification", "OK");
                }
            }
        });
    });
}
function addClassInterests(id) {
    var hiddenField = "";
    if ($("#" + id).hasClass("act")) {
        $("#" + id).removeClass("act");
        $("#hf" + id).remove();
    } else {
        hiddenField = '<input type="hidden" id="hf' + id + '" name="selectedInterests[]" value="' + id + '">';
        $("#selInt").append(hiddenField);
        $("#" + id).addClass("act");
    }
}
// SELECT INTEREST CODE

// LOGIN CODE
function loginFunctions() {
    getBankDetails();
    $('.logsin').click(function () {
        if (validateLoginForm()) {
            fetchLoginData();
        }
    });
}
function validateLoginForm() {
    var bool = true;
    if ($.trim($("#email").val()) === "" || $.trim($("#email").val().length) === 0) {
        $("#email").addClass("error");
        $("#email").focus();
        bool = false;
    } else if (!regex.test($("#email").val())) {
        $("#email").addClass("error");
        $("#email").focus();
        bool = false;
    } else if ($.trim($("#password").val()) === "" || $.trim($("#password").val().length) === 0) {
        $("#password").addClass("error");
        $("#password").focus();
        bool = false;
    } else {
        bool = true;
    }
    return bool;
}
function fetchLoginData() {
    $.ajax({
        url: BASE_URL + 'api',
        type: 'POST',
        data: $("#loginForm").serialize(),
        success: function (resp) {
            var obj = $.parseJSON(resp);
            if (obj.code == '100') {
                sessionStorage.setItem("uid", obj.uid);
                sessionStorage.setItem("name", obj.name);
                sessionStorage.setItem("regType", obj.reg_type);
                sessionStorage.setItem("avatar", obj.avatar);
                location.href = 'dashboard.html';
            } else {
                navigator.notification.alert("Sorry wrong username or password. Please try again.", null, "Notification", "OK");
                $('#username').addClass('error');
                $('#username').focus();
            }
        }
    });
}

// LOGIN CODE

// DASHBOARD FUNCTIONS
function dashboardFunctions() {
    checkUserSession();
    $("#groupDetails").html(loading);
    setTimeout(function () {
        fetchDashboardPostsCustom();
    }, 1000);
    setTimeout(function () {
        fetchDashboardPosts();
    }, 2000);
}
function fetchDashboardPostsCustom() {
    $.ajax({
        url: BASE_URL + 'api/fetchDashBoardFeedForCustomPost',
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: {
            user_id: sessionStorage.getItem("uid")
        },
        success: function (resp) {
            $("#groupDetails").html("");
//              alert(JSON.stringify(resp));
            for (var i = 0; i < resp.length; i++) {
                $("#groupDetails").prepend(constructGroupDetailsDiv(i, resp[i].feed_title, resp[i].feed_desc, resp[i].user_name, resp[i].feed_date, resp[i].comment_count, resp[i].likes, resp[i].comment, resp[i].reg_type, resp[i].feed_image));
            }
        }
    });
}
function fetchDashboardPosts() {
//    $(".loadContent").html('<div class="loadingscreen"></div>');
    $.ajax({
        url: BASE_URL + 'api/fetchDashBoardFeed',
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: {
            user_id: sessionStorage.getItem("uid")
        },
        success: function (resp) {
            for (var i = 0; i < resp.length; i++) {
//                alert(JSON.stringify(resp[i].topic_files));
                $("#groupDetails").append(constructDasboardDiv(i, resp[i].feed_title, resp[i].feed_desc, resp[i].user_name, resp[i].feed_date, resp[i].comment_count, resp[i].likes, resp[i].comment, resp[i].topic, resp[i].meterial_count, resp[i].topic_files));
                if (resp[i].meterial_count == 0) {
                    $('#bulb' + i).removeAttr("onclick");
                    $('#options' + i).css('display', 'none');
                    $('#newsfeed' + i).removeClass('padright');
                }
            }
        }
    });
}
function constructDasboardDiv(i, feedTitle, feedDesc, fullName, feedDate, commentCount, likesCount, comments, topicname, meterialCount, topicFiles) {
    var cls = "";
    var txtLink = '';
    var mp3Link = '';
    var mp4Link = '';
    if (meterialCount > 0) {
        cls = "bulb2";
    } else {
        cls = "bulb";
    }
//    alert(decodeURIComponent(topicFiles[0].mp4));
    if (undefined == topicFiles[0].mp3) {
        mp3Link = 0;
    } else {
        mp3Link = decodeURIComponent(topicFiles[0].mp3);
    }
    if (undefined == topicFiles[0].txt) {
        txtLink = 0;
    } else {
        txtLink = decodeURIComponent(topicFiles[0].txt);
    }
    if (undefined == topicFiles[0].mp4) {
        mp4Link = 0;
    } else {
        mp4Link = decodeURIComponent(topicFiles[0].mp4);
    }
    var html = "";
    html += '<div class="card feedbox">' +
            '<div class="row">' +
            '<div class="col-md-3">' +
            '<div class="card-body">' +
            '<article class="style-default-bright">' +
            '<div> <img alt="" src="img/modules/obama.png" class="img-responsive"> </div>' +
            '</article>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-9 newsfeed newsfeed2 padright" id="newsfeed' + i + '">' +
            '<div class="card-body">' +
            '<a href="#">' +
            '<h2>' + feedTitle + '</h2>' +
            '<div class="text-default-light">Posted by <span class="name_post">' + fullName + '</span> <span class="post_time">' + feedDate + '</span> <a href="#">' + commentCount + ' comments <i class="fa fa-comment-o"></i></a></div>' +
            '<p id="desc' + i + '">' + feedDesc + '</p>' +
            '</a>';
    if (commentCount > 0) {
        html += '<hr>' +
                '<h4 style="color:#0080db;">Comment <small>(<a href="postdetails.html">see all comments</a>)</small></h4>' +
                '<ul class="list-comments">';
        for (var j = 0; j < comments.length; j++) {
            html += '<li>' +
                    '<div class="card">' +
                    '<div class="comment-avatar"><img src="img/modules/avatar4.jpg" alt=""></div>' +
                    '<div class="card-body">' +
                    '<h4 class="comment-title">' + comments[j].fullname + '<small>' + comments[j].feed_date + ' at ' + comments[j].feed_time + '</small></h4>' +
                    '<p style="margin-bottom:0;">' + comments[j].feed_comment + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
        }
        html += '</ul>';
    }
    html += '<hr style="margin:0;">' +
            '<div class="options2">' +
            '<ul>' +
            '<li><a title="" class="like active" href="#"> + ' + likesCount + '</a> </li>' +
            '<li><a title="" class="share" href="#"></a> </li>' +
            '<li>#' + topicname + '</li>' +
            '<li><a id="bulb' + i + '" class="' + cls + '" href="javascript:void(0);" onclick="hideOptions(' + i + ')"></a> </li>' +
            '</ul>' +
            '</div>' +
            '<div class="options3" id="options' + i + '" style="top:0 !important;">' +
            '<ul>' +
            '<li><a title="" class="list" href="javascript:void(0)" onclick="runText(\'' + txtLink + '\');"></a> </li>' +
            '<li><a title="" class="music" href="javascript:void(0)" onclick="runMp3(\'' + mp3Link + '\');"></a> </li>' +
            '<li><a title="" class="tv" href="javascript:void(0)" onclick="runMp4(\'' + mp4Link + '\');"></a> </li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    return html;
}
// DASHBOARD FUNCTIONS

// GROUP FUNCTONS
function groupFunction() {
//    checkUserSession();
    setTimeout(function () {
        fetchPublicGroups();
    }, 2000);
    $("#btnCamera").click(function () {
        getPictureFromCamera();
    });
    $("#btnGallery").click(function () {
        getPictureFromGallery();
    });
}
function createGroup() {
    if (validateGroup()) {
        $("#uid").val(sessionStorage.getItem("uid"));
        $.ajax({
            url: BASE_URL + 'api/createGroup',
            type: 'POST',
            data: $("#createGroupForm").serialize(),
            success: function (resp) {
                var data = $.parseJSON(resp);
//                navigator.notification.alert(data.toast, null, "Notification", "OK");
//                location.href = "publicgroup.html";
                window.location.reload();
            }
        });
    }
}
function validateGroup() {
    var bool = true;
    if ($.trim($("#group_name").val()) === "" || $.trim($("#group_name").val().length) === 0) {
        $("#group_name").addClass("error");
        $("#group_name").focus();
        bool = false;
    } else if ($.trim($("#group_content").val()) === "" || $.trim($("#group_content").val().length) === 0) {
        $("#group_content").addClass("error");
        $("#group_content").focus();
        bool = false;
    } else {
        bool = true;
    }
    return bool;
}
function fetchPublicGroups() {
//    $("#groupsDisplay").html('<div class="loadingscreen"></div>');
    $.ajax({
        url: BASE_URL + 'api/fetchUsersPublicGroups',
        type: 'POST',
        data: "uid=" + sessionStorage.getItem("uid"),
        success: function (resp) {
            $("#groupsDisplay").html("");
            var data = $.parseJSON(resp);
            var groupListAppend = "";
            var j = 1;
            for (var i = 0; i < data.length; i++) {
                groupListAppend += constructGroupList(j, data[i].group_id, data[i].group_name, data[i].group_content, data[i].group_image);
                j++;
            }
            $("#groupsDisplay").append(groupListAppend);
        }
    });
}
function fetchMyGroups() {
    $.ajax({
        url: BASE_URL + 'api/fetchUsersPrivateGroups',
        type: 'POST',
        data: "uid=" + sessionStorage.getItem("uid"),
        success: function (resp) {
            $("#groupsDisplayPrivate").html("");
            var data = $.parseJSON(resp);
            var groupListAppend = "";
            var j = 1;
            for (var i = 0; i < data.length; i++) {
                groupListAppend += constructGroupList(j, data[i].group_id, data[i].group_name, data[i].group_content, data[i].group_image);
                j++;
            }
            $("#groupsDisplayPrivate").append(groupListAppend);
        }
    });
}
function constructGroupList(i, group_id, groupName, groupContent, groupImage) {
    var div = "";
    if (i == 1) {
        div += '<div class="row">';
    }
    div += '<div class="col-md-4">' +
            '<article>' +
            '<header>' + groupName + '</header>' +
            '<div class="blog-image">' +
            '<a href="javascript:void(0);" onclick="viewGroupDetails(' + group_id + ')"><img alt="" src="data:image/jpeg;base64,' + groupImage + '" class="img-responsive">' +
            '<div class="row text-center groupbtn">' +
            '<div class="col-sm-4"><a href="#" class="groupsbtn">FOLLOW</a></div>' +
            '<div class="col-sm-4"><a href="#" class="groupsbtn">JOIN</a></div>' +
            '<div class="col-sm-4"><a href="#" class="groupsbtn">223</a></div>' +
            '</div>' +
            '</div>' +
            '<div class="card-body blog-text">' +
            '<p>' + groupContent + '</p>' +
            '</div>' +
            '</article>' +
            '</div>';
    if (i % 3 == 0) {
        div += '</div>';
        div += '<div class="row">';
    }
    return div;
}
function viewGroupDetails(group_id) {
    sessionStorage.setItem("gid", group_id);
    $(".loadContent").fadeOut("fast");
    $(".loadContent").load("group_details.html").css("display", "none");
    $(".loadContent").slideDown(500);
    setTimeout(function () {
        groupPostFunctions();
    }, 1000);
}
// GROUP FUNCTONS

// GROUP POST FUNCTIONS
function groupPostFunctions() {
    $("#groupDetails").html(loading);
    setTimeout(function () {
        fetchCustomGroupPost();
    }, 2000);
}
function customPost() {
    var post_title = $("#post_title").val();
    var post_content = $("#post_content").val();
    $.ajax({
        url: BASE_URL + 'api/customUserPost',
        type: 'POST',
        dataType: 'JSON',
        async: true,
        data: {
            post_title: post_title,
            post_content: post_content,
            group_id: sessionStorage.getItem("gid"),
            user_id: sessionStorage.getItem("uid")
        },
        success: function (resp) {
            callCancelPop();
            setTimeout(function () {
                fetchCustomGroupPost();
            }, 2000);
        }
    });
}
function fetchCustomGroupPost() {
    $.ajax({
        url: BASE_URL + 'api/fetchCustomGroupPosts',
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: {
            group_id: sessionStorage.getItem("gid"),
            user_id: sessionStorage.getItem("uid")
        },
        success: function (resp) {
            $("#groupDetails").html("");
            for (var i = 0; i < resp.length; i++) {
                $("#groupDetails").append(constructGroupDetailsDiv(i, resp[i].feed_title, resp[i].feed_desc, resp[i].user_name, resp[i].feed_date, resp[i].comment_count, resp[i].likes, resp[i].comment, resp[i].reg_type, resp[i].feed_image));
            }
        }
    });
}
function fetchInitialGroupDetails() {
    $.ajax({
        url: BASE_URL + 'api/fetchInitialGroupDetails',
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: {
            group_id: sessionStorage.getItem("gid"),
            user_id: sessionStorage.getItem("uid")
        },
        success: function (resp) {
            var i = 0;
            $("#groupDetails").append(constructGroupDetailsDiv(i, resp[i].feed_title, resp[i].feed_desc, resp[i].user_name, resp[i].feed_date, resp[i].comment_count, resp[i].likes, resp[i].comment, resp[i].reg_type, resp[i].feed_image));
        }
    });
}
function constructGroupDetailsDiv(i, feedTitle, feedDesc, fullName, feedDate, commentCount, likesCount, comments, reg_type, imageRaw) {
//    alert(reg_type);
    var image = "";
    if (reg_type == 1) {
        image = '<img alt="" src="data:image/jpeg;base64,' + imageRaw + '" class="img-responsive">';
    } else {
        image = '<img alt="" src="' + decodeURIComponent(imageRaw) + '" class="img-responsive">';
    }
    var html = "";
    html += '<div class="card feedbox">' +
            '<div class="row">' +
            '<div class="col-md-3">' +
            '<div class="card-body">' +
            '<article class="style-default-bright">' +
            '<div>' + image + '</div>' +
            '</article>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-9 newsfeed newsfeed2" id="newsfeed' + i + '">' +
            '<div class="card-body">' +
            '<a href="#">' +
            '<h2>' + feedTitle + '</h2>' +
            '<div class="text-default-light">Posted by <span class="name_post">' + fullName + '</span> <span class="post_time">' + feedDate + '</span> <a href="#">' + commentCount + ' comments <i class="fa fa-comment-o"></i></a></div>' +
            '<p id="desc' + i + '">' + feedDesc + '</p>' +
            '</a>';
    if (commentCount > 0) {
        html += '<hr>' +
                '<h4 style="color:#0080db;">Comment <small>(<a href="postdetails.html">see all comments</a>)</small></h4>' +
                '<ul class="list-comments">';
        for (var j = 0; j < comments.length; j++) {
            html += '<li>' +
                    '<div class="card">' +
                    '<div class="comment-avatar"><img src="img/modules/avatar4.jpg" alt=""></div>' +
                    '<div class="card-body">' +
                    '<h4 class="comment-title">' + comments[j].fullname + '<small>' + comments[j].feed_date + ' at ' + comments[j].feed_time + '</small></h4>' +
                    '<p style="margin-bottom:0;">' + comments[j].feed_comment + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
        }
        html += '</ul>';
    }
    html += '<hr style="margin:0;">' +
            '<div class="options2">' +
            '<ul>' +
            '<li><a title="" class="like active" href="#"> + ' + likesCount + '</a> </li>' +
            '<li><a title="" class="share" href="#"></a> </li>' +
//            '<li><a id="bulb' + i + '" class="bulb" href="javascript:void(0);" onclick="hideOptions(' + i + ')"></a> </li>' +
            '<li><a id="bulb' + i + '" class="bulb" href="javascript:void(0);"></a> </li>' +
            '</ul>' +
            '</div>' +
//            '<div class="options3" style="top: 0 !important;" id="options' + i + '">' +
//            '<ul>' +
//            '<li><a title="" class="list" href="docs_temp.html"></a> </li>' +
//            '<li><a title="" class="music" href="pdf_temp.html"></a> </li>' +
//            '<li><a title="" class="tv" href="ppt_temp.html"></a> </li>' +
//            '</ul>' +
//            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    // Remove Later
//     $('#options' + i).css('display', 'none');
    $('#newsfeed' + i).removeClass('padright');
    return html;
}
function submitPostForGroup() {
    $("#group_custom_post").submit();
}
// GROUP POST FUNCTIONS

// REWARD FUNCTION
function rewardFunction() {
    setTimeout(function () {
        fetchRewards();
    }, 2000);
}
function fetchRewards() {
    $.ajax({
        url: BASE_URL + 'api/fetchRewards',
        type: 'POST',
        data: "todo=fetchreward",
        success: function (resp) {
//            console.log(resp);
            $("#constructReward").html("");
            var data = $.parseJSON(resp);
            var j = 1;
            for (var i = 0; i < data.length; i++) {
                var hasNext = 1;
                if (j == data.length) {
                    hasNext = 0;
                }
                $("#constructReward").append(constructRewards(i, data[i].title, data[i].desc, data[i].img, data[i].coins, hasNext));
                j++;
            }
        }
    });
}
function constructRewards(loop, title, desc, img, coins, hasNext) {
    var image = decodeURIComponent(img);
    var html = "";
    var cls = "red";
    var text = "Not Enough Coins";
    if (coins <= 10000) {
        cls = "green";
        text = "Reedem";
    }
    html += '<div class="row">' +
            '<div class="col-md-2">' +
            '<article class="style-default-bright">' +
            '<div> <img alt="" src="' + image + '" class="img-responsive"> </div>' +
            '</article>' +
            '</div>' +
            '<div class="col-md-10 rewardbody">' +
            '<div class="card-body">' +
            '<div class="rewardheadsection">' +
            '<h2 class="martop">' + title + '</h2>' +
            '<div class="buttonbox"><button class="notenough"><img src="img/rewards3.png" alt=""> ' + coins + '</button>' +
            '<button class="' + cls + '">' + text + '</button></div>' +
            '</div>' +
            '<p class="ashclr">' + desc + '</p>' +
            '</div>' +
            '</div>' +
            '</div>';
    if (hasNext == 1) {
        html += "<hr>";
    }
    return html;
}
// REWARD FUNCTION
// LEARN METERIAL FUNCTIONS
function learnMeterialFunctions() {
    fetchCoachRecommendation();
}
function fetchCoachRecommendation() {
    $.ajax({
        url: BASE_URL + 'api/fetchLearningMaterial',
        type: 'POST',
        data: "todo=coach",
        dataType: 'JSON',
        success: function (data) {
             $("#coachRec").html("");
            console.log(JSON.stringify(data));
            for (var i = 0; i < data.length; i++) {
                $("#coachRec").append(constructLearning(i, data[i].cat_name, data[i].cat_title, data[i].cat_desc, data[i].created_on));
            }
            setTimeout(function(){
                fetchAllLearning(data.length+1);
            },3000);
        }
    });
}
function fetchAllLearning(length) {
    var l = length;
    $.ajax({
        url: BASE_URL + 'api/fetchLearningMaterial',
        type: 'POST',
        data: "todo=all",
        dataType: 'JSON',
        success: function (data) {
             $("#allRec").html("");
//            console.log(JSON.stringify(data));
            for (var i = 0; i < data.length; i++) {
                $("#allRec").append(constructLearning(l, data[i].cat_name, data[i].cat_title, data[i].cat_desc, data[i].created_on));
                l++;
            }
            
        }
    });
}
function constructLearning(loop, catName, catTitle, catDesc, catDate) {
    var cls = "collapse";
    var areaExpnd = "false";
    var style = "height: 0px;";
    if(loop == 0){
        cls = "collapse in";
        areaExpnd = true;
        style = "height: 284px;";
    }
    var html = '<div class="card card-underline panel">'+
            '<div data-target="#accordion7-'+loop+'" data-parent="#accordion7" data-toggle="collapse" class="card-head collapsed card-head-sm style-gray-bright rewardshead" aria-expanded="'+areaExpnd+'">'+
            '<header>'+catName+'<span style="display:inline-block; margin-left:40px; font-size:14px;">Recommended by: John Doe</span></header>'+
            '<div class="tools">'+
            '<a class="btn btn-icon-toggle"><i class="fa fa-plus"></i></a>'+
            '</div>'+
            '</div>'+
            
            ' <div class="'+cls+'" id="accordion7-'+loop+'" aria-expanded="'+areaExpnd+'" style="'+style+'">'+
            '<div class="card-body learn">'+
            '<h2 class="martop marbtm">'+catTitle+'</h2>'+
            '<div class="progress-section">'+
            '<span style="display:inline-block; text-align:center; width:100%;">Progress</span>'+
            '<div class="progress"><div style="width: 50%; line-height:15px;" class="progress-bar progress-bar-info"><strong>50%</strong></div></div>'+
            '</div>'+
            '<div class="text-default-light">Recommended on   '+catDate+'</div>'+
            '<p>'+catDesc+'</p>'+
            '<hr style="margin:0;">'+
            '<div class="options2">'+
            '<ul class="marbtm">'+
            ' <li><a title="" class="list" href="#"></a> </li>'+
            ' <li><a title="" class="music" href="#"></a> </li>'+
            ' <li><a title="" class="tv" href="#"></a> </li>'+
            ' <li><a title="" class="comment" href="#"></a> </li>'+
            ' </ul>'+
            '</div>'+
            '<hr style="margin:0 0 30px ;">'+
            ' <ul class="list-comments">'+
            '<li>'+
            '<div class="card">'+
            '<div class="comment-avatar martop"><img src="img/modules/avatar4.jpg" alt=""></div>'+
            '<div class="card-body">'+
            '<h4 class="comment-title">Jim Peters <small>20/06/2013 at 4:02 pm</small></h4>'+
            '<p style="margin-bottom:0;">Etiam dui libero, tempor quis congue in, interdum eget tortor. Vivamus aliquam dictum lacus quis tincidunt.  <a href="#" style="color:#0080db;">More...</a></p>'+
            '</div>'+
            '</div>'+
            '</li>'+
            '</ul>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<br>';
    return html;
}
// LEARN METERIAL FUNCTIONS
// IMAGE UPLOAD ON IOS
function getPictureFromCamera() {
// var imageData;
    navigator.camera.getPicture(function (data) {
        $("#imageGallery")
                .attr('src', 'data:image/jpeg;base64,' + data)
                .css("display", "block");
        $("#imageRaw").val(data);
    }, function (error) {
        console.log("Error " + error);
    }, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        targetWidth: 640,
        targetHeight: 426
    });
    return true;
}
function getPictureFromGallery() {
    navigator.camera.getPicture(function (data) {
        $("#imageGallery")
                .attr('src', 'data:image/jpeg;base64,' + data)
                .css("display", "block");
        $("#imageRaw").val(data);
    }, function (error) {
        console.log("Error " + error);
    }, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        targetWidth: 640,
        targetHeight: 426,
        mediaType: Camera.MediaType.PICTURE
    });
    return true;
}
function takePicutreforAvatar() {
    navigator.camera.getPicture(function (data) {
        $("#imageGallery")
                .attr('src', 'data:image/jpeg;base64,' + data)
                .css("display", "block");
        $("#imageRaw").val(data);
    }, function (error) {
        console.log("Error " + error);
    }, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        targetWidth: 130,
        targetHeight: 129
    });
    return true;
}
function chooseFromGalleryforAvatar() {
    navigator.camera.getPicture(function (data) {
        $("#imageGallery")
                .attr('src', 'data:image/jpeg;base64,' + data)
                .css("display", "block");
        $("#imageRaw").val(data);
    }, function (error) {
        console.log("Error " + error);
    }, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        targetWidth: 130,
        targetHeight: 129,
        mediaType: Camera.MediaType.PICTURE
    });
    return true;
}

// COMMON FUNCTIONS
function checkUserSession() {
    if (null != sessionStorage.getItem("uid")) {
        sessionStorage.setItem("login", "true");
    } else {
        location.href = "index.html";
    }
}
function logout() {
    sessionStorage.clear();
    location.href = "index.html";
}
function hideOptions(id) {
//    alert("bulb"+id);
    $('#options' + id).css('display', 'none');
    $('#newsfeed' + id).removeClass('padright');
//    $("#bulb" + id).removeAttr("onclick");
    $("#bulb" + id).attr("onclick", "showOptions('" + id + "')");
}
function showOptions(id) {
    $('#options' + id).css('display', 'block');
    $('#newsfeed' + id).addClass('padright');
    $("#bulb" + id).removeAttr("onclick");
    $("#bulb" + id).attr("onclick", "hideOptions(" + id + ")");
}
function checkUniqueEmail(email) {
    $.ajax({
        url: BASE_URL + 'api/checkUniqueEmail',
        type: 'POST',
        data: {email: email},
        success: function (resp) {
//            console.log(resp);
            if (resp == 0) {
                return true;
            } else {
                return false;
            }
        }
    });
}
function callPosts() {
    $("#posts").fadeOut("slow");
    setTimeout(function () {
        $("#postContent").slideDown("slow");
    }, 1000);
}
function callCancelPop() {
    $("#postContent").slideUp("slow");
    setTimeout(function () {
        $("#posts").fadeIn("slow");
    }, 1000);
}
function changeTab(tabno) {
//    alert();
    $("#groupsDisplay").html("");
    $("#groupsDisplayPrivate").html("");
    if (tabno == 1) {
// Remove class
        $("#publicgroup").removeAttr("class");
        $("#mygroup").removeAttr("class");
        $("#creategroup").removeAttr("class");
        // Remove class
        // 
        // Display third4 Tab
        $("#third4").removeClass("active");
        $("#first4").removeClass("active");
        $("#second4").addClass("active");
        // Add Class
        $("#publicgroup").addClass("active");
        $("#groupsDisplay").html(loading);
        setTimeout(function () {
            fetchPublicGroups();
        }, 2000);
    }
    if (tabno == 2) {
// Remove class
        $("#publicgroup").removeAttr("class");
        $("#mygroup").removeAttr("class");
        $("#creategroup").removeAttr("class");
        // Display third4 Tab
        $("#second4").removeClass("active");
        $("#first4").removeClass("active");
        $("#third4").addClass("active");
        // Add Class
        $("#mygroup").addClass("active");
        $("#groupsDisplayPrivate").html(loading);
        setTimeout(function () {
            fetchMyGroups();
        }, 2000);
    }
    if (tabno == 3) {
//        alert(tabno);
// Remove class
        $("#publicgroup").removeAttr("class");
        $("#mygroup").removeAttr("class");
        $("#creategroup").removeAttr("class");
        // Remove class
        // 
        // Display third4 Tab
        $("#third4").removeClass("active");
        $("#second4").removeClass("active");
        $("#first4").addClass("active");
        // Add Class
        $("#creategroup").addClass("active");
    }
}
function runMp4(link) {
//    alert(link);
    if (link != 0) {
        $("#video").html("");
        var html = '<video controls style="height: 100%; width: 100%;">' +
                '<source id="vid" src="' + link + '" type="video/mp4">' +
                '</video>';
//        $("#vid").attr("src", link);
//        $("#video video")[0].load();
        $("#video").html(html);
        setTimeout(function () {
            $("#video").dialog("open");
        }, 300);
    }
}
function runMp3(link) {
//    playAudio(link);
    if (link != 0) {
        $("#audio_position").html("");
        var html = "";
        html += '<audio controls style="height: 100%; width: 100%;">' +
                '<source id="aud" src="' + link + '" type="audio/mpeg">' +
                '</audio>';
        $("#audio_position").html(html);
//        setTimeout(function () {
//            $("#audio").dialog("open");
//        }, 300);
//        alert(link);
//        playAudio(link);
    }
}
function runText(link) {
//    $.ajax({
//        url: BASE_URL + 'api/readFile',
//        type: 'POST',
//        data: "link="+encodeURI(link),
//        success: function (resp) {
//            alert(resp);
//        }
//    });
}
function playAudio(src) {
// Create Media object from src
    my_media = new Media(src, onSuccess, onError);
    // Play audio
    my_media.play();
    // Update my_media position every second
    if (mediaTimer == null) {
        mediaTimer = setInterval(function () {
// get my_media position
            my_media.getCurrentPosition(
                    // success callback
                            function (position) {
                                if (position > -1) {
                                    setAudioPosition((position) + " sec");
                                }
                            },
                            // error callback
                                    function (e) {
                                        console.log("Error getting pos=" + e);
                                        setAudioPosition("Error: " + e);
                                    }
                            );
                        }, 1000);
            }
}
function pauseAudio() {
    if (my_media) {
        my_media.pause();
    }
}
function stopAudio() {
    if (my_media) {
        my_media.stop();
    }
    clearInterval(mediaTimer);
    mediaTimer = null;
}
function onSuccess() {
    console.log("playAudio():Audio Success");
}
function onError(error) {
    alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}
function setAudioPosition(position) {
    document.getElementById('audio_position').innerHTML = position;
}
function postOnDashboard() {
    callCancelPop();
    $.ajax({
        url: BASE_URL + 'api/postDashboardComment',
        type: 'POST',
        data: {
            post_title: $("#post_title").val(),
            post_content: $("#post_content").val(),
            user_id: sessionStorage.getItem("uid")
        },
        success: function (resp) {
            var data = $.parseJSON(resp);
            dashboardFunctions();
//            alert(data.message);
//            setTimeout(function(){
//                fetchDashboardPosts();
//            },1000);
        }
    });
}
function toggleMenu() {
    return (this.tog = !this.tog) ? dd() : cc();
}
function cc() {
    $("#menubar").show();
    $('#base').css('padding-left', '240px');
}
function dd() {
    $("#menubar").show();
    $('#base').css('padding-left', '64px');
}