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
            $('#table tbody').append("<tr><td class='align-middle' scope='row' contenteditable='false'>" + decodeURI(data[i].id) + "</td>" +
                "<td class='align-middle' contenteditable='true'>" + (data[i].image == null ? decodeURI(data[i].image) : "<img src='" + decodeURI(data[i].image) + "' width='100' height='100'>") + "</td>" +
                "<td class='align-middle' contenteditable='true'>" + decodeURI(data[i].name) + "</td>" +
                "<td class='align-middle' contenteditable='true'>" + decodeURI(data[i].size) + "</td>" +
                "<td class='align-middle' contenteditable='true'>" + decodeURI(data[i].manufacturer) + "</td>" +
                "<td class='align-middle' contenteditable='true'>" + decodeURI(data[i].description) + "</td>" +
                "<td class='align-middle' contenteditable='false'><button onclick='updateRecord(" + i + ")'>Update</button>" +
                "<button onclick='deleteRecord(" + i + ")'>Delete</button></td></tr>");
        }

        $('#table tbody').append("<tr><td class='align-middle' scope='row' contenteditable='false'>New</td>" +
            "<td class='align-middle' contenteditable='true'></td>" +
            "<td class='align-middle' contenteditable='true'></td>" +
            "<td class='align-middle' contenteditable='true'></td>" +
            "<td class='align-middle' contenteditable='true'></td>" +
            "<td class='align-middle' contenteditable='true'></td>" +            
            "<td class='align-middle' contenteditable='false'><button onclick='createRecord(" + data.length + ")'>Add</button></td></td>");
    }
}

function createRecord(row)
{
    var url = host + "/create?";
    cells = $("#table").find("tbody tr").eq(row).children();
    url += "id=" + encodeURI(cells[0].textContent) + "&image=" + encodeURI(cells[1].textContent) + "&name=" + encodeURI(cells[2].textContent) + "&size=" + encodeURI(cells[3].textContent) + "&manufacturer=" + encodeURI(cells[4].textContent) + "&description=" + encodeURI(cells[5].textContent);
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
    url += "id=" + encodeURI(cells[0].textContent) + "&image=" + encodeURI(cells[1].textContent) + "&name=" + encodeURI(cells[2].textContent) + "&size=" + encodeURI(cells[3].textContent) + "&manufacturer=" + encodeURI(cells[4].textContent) + "&description=" + encodeURI(cells[5].textContent);
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