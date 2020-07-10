$(function() {
    // Function to update the total number of incomplete tasks.
    function updateCounter() {
        var items = $("ul#taskList li:not('.complete')").length;
        $("span#counter").text(items);
        console.log(items);
        $("h2 span#info").empty();
        if (items > 1) {
            $("h2 span#info").prepend("Number of tasks: ");
        } else {
            $("h2 span#info").prepend("Number of task: ");
        }
    };
    updateCounter();

    // Adding new task.
    $("form.taskHeader").on("submit", function(e) {
        e.preventDefault();
        var text = $("input:text#taskDescription").val();
        if (text) {
            $("ul#taskList").append('<li>' + text + '<span class="delete"><i class="fa fa-trash"></i></span></li>');
            $("li:last").animate({opacity: 1}, 300);
            $("input:text#taskDescription").val("");
            $("input#taskDescription").attr("placeholder", "Add task...");
            updateCounter();
        } else {
            $("input#taskDescription").attr("placeholder", "Please enter something...");
        }
    });
    
    // Complete a task.
    $("ul#taskList").on("click", "li", function() {
        $(this).toggleClass("complete");
        updateCounter();
    });

    // Remove a task.
    $("ul#taskList").on("click", "span", function(e) {
        $(this).parent().animate({opacity: 0, paddingLeft: '+=100'}, 300, function() {
            $(this).remove();
            updateCounter();
        });
        e.stopPropagation();
    });
});