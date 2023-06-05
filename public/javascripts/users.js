
$(document).ready(function() {
    // Add a click event listener to all .username-td elements
    $('.username-td').on('click', function() {
        // Get the clicked username
        var username = $(this).text();

        // Set the value of the input field to the clicked username
        $('input[name="username"]').val(username);
    });
});
