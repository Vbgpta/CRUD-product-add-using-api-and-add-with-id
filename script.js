let productList = []; // Array to store the product list

// Function to fetch data from JSON file
async function fetchData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        productList = data.products;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function addProductToTable(product) {
    const tableBody = document.querySelector('#productList tbody');
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${product.id}</td>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        </td>
    `;
}

// Function to handle form submission
async function onFormSubmit(event) {
    event.preventDefault(); // Prevent form submission
    const productIdInput = document.getElementById('productId');
    const productId = parseInt(productIdInput.value); // Get entered product ID

    try {
        const response = await fetch('data.json');
        const data = await response.json();
        const product = data.products.find(item => item.id === productId); // Find product based on ID
        if (product) {
            addProductToTable(product); // Add product to the table
            productIdInput.value = ''; // Clear input field
        } else {
            alert('Product not found!'); // Show alert if product not found
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to delete product
function deleteProduct(productId) {
    const tableBody = document.querySelector('#productList tbody');
    const rows = tableBody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        if (parseInt(rows[i].cells[0].innerText) === productId) {
            tableBody.deleteRow(i);
            break;
        }
    }
}

// Fetch data when the page loads
fetchData();
