var host = "http://localhost:3000";

function render(data)
{
    if (data)
    {      
        var parent = document.getElementById("table").getElementsByTagName("tbody")[0];

        while (parent.hasChildNodes())
        {
            parent.removeChild(parent.firstChild);
        }

        //next update table with data sent back.
        for (let i = 0; i < data.length; i++)
        {
            $('#table tbody').append("<tr><td contenteditable='false'>" + decodeURI(data[i].id) + "</td>" +
                "<td contenteditable='true'>" + decodeURI(data[i].name) + "</td>" +
                "<td contenteditable='true'>" + decodeURI(data[i].size) + "</td>" +
                "<td contenteditable='true'>" + decodeURI(data[i].manufacturer) + "</td>" +
                "<td contenteditable='true'>" + decodeURI(data[i].description) + "</td>" +
                "<td contenteditable='false'><button onclick='updateRecord(" + i + ")'>Update</button>" +
                "<button onclick='deleteRecord(" + i + ")'>Delete</button></td></tr>");
        }

        $('#table tbody').append("<tr><td contenteditable='false'>New</td>" +
            "<td contenteditable='true'></td>" +
            "<td contenteditable='true'></td>" +
            "<td contenteditable='true'></td>" +
            "<td contenteditable='true'></td>" +
            "<td contenteditable='false'><button onclick='createRecord(" + data.length + ")'>Add</button></td></td>");
    }
}

function createRecord(row)
{
    var url = host + "/create?";
    cells = $("#table").find("tbody tr").eq(row).children();
    url += "id=" + encodeURI(cells[0].textContent) + "&name=" + encodeURI(cells[1].textContent) + "&size=" + encodeURI(cells[2].textContent) + "&manufacturer=" + encodeURI(cells[3].textContent) + "&description=" + encodeURI(cells[4].textContent);
    $.ajax({
        type: 'GET',
        url: url,
        dataType: "json", //to parse string into JSON object,
        success: function (data)
        {
            render(data);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert('error: ' + textStatus + ': ' + errorThrown);
        }
    });
}

function retrieveRecords()
{
    $.ajax({
        type: 'GET',
        url: host + '/retrieve',
        dataType: "json", //to parse string into JSON object,
        success: function (data)
        {
            render(data);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert('error: ' + textStatus + ': ' + errorThrown);
        }
    });
}

function updateRecord(row)
{
    var url = host + "/update?";
    cells = $("#table").find("tbody tr").eq(row).children();
    url += "id=" + encodeURI(cells[0].textContent) + "&name=" + encodeURI(cells[1].textContent) + "&size=" + encodeURI(cells[2].textContent) + "&manufacturer=" + encodeURI(cells[3].textContent) + "&description=" + encodeURI(cells[4].textContent);
    $.ajax({
        type: 'GET',
        url: url,
        dataType: "json", //to parse string into JSON object,
        success: function (data)
        {
            render(data);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert('error: ' + textStatus + ': ' + errorThrown);
        }
    });
}

function deleteRecord(row)
{
    var url = host + "/delete?";
    cells = $("#table").find("tbody tr").eq(row).children();
    url += "id=" + encodeURI(cells[0].textContent);
    $.ajax({
        type: 'GET',
        url: url,
        dataType: "json", //to parse string into JSON object,
        success: function (data)
        {
            render(data);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert('error: ' + textStatus + ': ' + errorThrown);
        }
    });
}

retrieveRecords();