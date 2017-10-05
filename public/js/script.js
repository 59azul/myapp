function addUser() {
    window.location.href = 'addCustomer.html';
}

function cancelAdd() {
    window.location.href = '/index.html';
}

function checkId() {
    var urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    if (urlParams.has('id')) {
        $.ajax({
            url: '/customer/listCustomer?id=' + urlParams.get('id'),
            error: function (data) {
                alert('Error Occured' + data);
            },
            success: function (data) {
                setField(data.data);
            }
        });
    }
}

function setField(customer) {
    document.customerForm.name.value = customer[0].name;
    document.customerForm.address.value = customer[0].address;
    document.customerForm.email.value = customer[0].email;
    document.customerForm.phone.value = customer[0].phone;
}

function displayCustomers(customers) {
    var table = document.getElementById('tableList');
    for (var i = 0; i < customers.length; i++) {
        var customer = customers[i];
        var row = table.insertRow(i + 1);
        var cellId = row.insertCell(0);
        var cellName = row.insertCell(1);
        var cellAddress = row.insertCell(2);
        var cellPhone = row.insertCell(3);
        var cellEmail = row.insertCell(4);
        var cellOption = row.insertCell(5);
        cellId.innerHTML = customer.id;
        cellName.innerHTML = customer.name;
        cellAddress.innerHTML = customer.address;
        cellPhone.innerHTML = customer.phone;
        cellEmail.innerHTML = customer.email;
        var editOption = '<a class="a-inside edit" href="addCustomer.html?id=' + customer.id + '">Edit</a>';
        var deleteOption = '<a class="a-inside delete" href="#" onclick="deleteCustomer(' + customer.id + '); return false;"> Delete</a>';
        cellOption.innerHTML = editOption + '&nbsp;' + deleteOption;
    }
}

function saveCustomer() {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        document.customerForm.action = '/customer/edit?id=' + urlParams.get('id');
        document.customerForm.submit();
    }
    else {
        document.customerForm.action = '/customer/add';
        document.customerForm.submit();
    }
}

function deleteCustomer(id) {
    $.post('/customer/delete?id=' + id);
    location.reload();
}
