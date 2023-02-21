const { prompt } = require("inquirer");
const figlet = require("figlet");
const gradient = require("gradient-string");
const mysql = require("mysql2");
const db = require("./connection");
const table = require("console.table");

async function init (){
    const message = "Employee Manager";
    await figlet(ms, (err, data)=> {
        console.log(gradient.pastel.multiline(data))
    })
}
init ();

function mainMenu() {
  prompt([
    {type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
      {
        name: "View all employees",
        value: "VIEW_ALL_EMPLOYEES",
      },
      {
        name: "View all departments",
        value: "VIEW_ALL_DEPARTMENTS",
      },
      {
        name: "Add Employee",
        value: "ADD_EMPLOYEE",
      },
      {
        name: "Update employee role",
        value: "UPDATE_EMPLOYEE_ROLE",
      },
      {
        name: "View all roles",
        value: "VIEW_ALL_ROLES",
      },
      {
        name: "Add department",
        value: "ADD_DEPARTMENT",
      },
      {
        name: "Add role",
        value: "ADD_ROLE",
      },
      {
        name: "Quit",
        value: "QUIT",
      },
    ],
  },
]).then((res) => {
  let choice = res.choice;
  switch (choice) {
    case "View all employees":
      viewEmployees();
      break;
    case "View all departments":
      viewDepartment();
      break;
    case "Add Employee":
      addEmployee();
      break;
    case "Update employee role":
      updateEmployeeRole();
      break;
    case "View all roles":
      viewRole();
      break;
    case "Add role":
      addRole();
      break;
    case "Add department":
      addDepartment();
      break;
    case "QUIT":
      quit();
      break;
  }
});
}


function viewDepartment() {
  db.findDepartments()
}

function viewRole() {
  db.findRoles()
}

function viewEmployees() {
  db.findEmployees()

}

function addDepartment() {
  
}

function addRole() {
  db.findDepartments()
}

function addEmployee() {



  db.findRoles()
}

function updateEmployeeRole() {
  db.findEmployees()
}

function quit() {
    console.log("Goodbye!")
    return process.exit();
}
