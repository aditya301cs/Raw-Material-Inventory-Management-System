# Raw Material Inventory Management System

## Description
This project is a web-based application designed to manage the inventory of raw materials in a manufacturing setting. It provides functionalities for item management, tracking inward and outward movements of materials, and generating inventory reports.

## Features
1. **Item Management**
   - Add new items to the inventory
   - Edit existing item details
   - Automatic validation of item existence

2. **Item Received (Inward)**
   - Record new material receipts
   - Automatically update inventory levels
   - Validate item existence before recording

3. **Item Issue (Outward)**
   - Record material issues for manufacturing
   - Prevent issuing more than available stock
   - Automatically update inventory levels

4. **Item Report**
   - Generate reports of current inventory levels
   - Filter reports by item ID range

5. **User-Friendly Interface**
   - Responsive design for various screen sizes
   - Intuitive navigation between different functionalities

## Technologies Used
- HTML5
- CSS3 (Bootstrap 5.1.3)
- JavaScript (jQuery 3.6.0)
- JsonPowerDB (Database)

## Setup Instructions
1. Clone the repository:
   ```
   git clone https://github.com/your-username/raw-material-inventory-management-system.git
   ```
2. Navigate to the project directory:
   ```
   cd raw-material-inventory-management-system
   ```
3. Open `index.html` in your web browser.

4. Set up JsonPowerDB:
   - Sign up for a JsonPowerDB account at [login2explore.com](http://login2explore.com)
   - Create a new database named "INVENTORY-DB"
   - Create relations: "ITEMS", "INWARD", and "OUTWARD"
   - Replace the `connToken` in `inventory.js` with your JsonPowerDB connection token

## Usage Guide
1. **Item Management**
   - Enter an Item ID to check if it exists
   - If new, fill in the details and click "Save"
   - If existing, modify details and click "Change"

2. **Item Received**
   - Enter Receipt No, Date, Item ID, and Quantity
   - Click "Save" to record the inward transaction

3. **Item Issue**
   - Enter Issue No, Date, Item ID, and Quantity
   - Click "Save" to record the outward transaction

4. **Item Report**
   - Enter the start and end Item ID range
   - Click "Generate Report" to view the inventory status

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is open source and available under the [MIT License](LICENSE).

## Contact
Your Name - kumaraditya81132@gmail.com

Project Link: [https://github.com/your-username/raw-material-inventory-management-system](https://github.com/your-username/raw-material-inventory-management-system)
