const { prompt } = require("inquirer");
const figlet = require("figlet");
const gradient = require("gradient-string");
const mysql = require("mysql2");
const db = require("./db");
const table = require("console.table");

function init (){
    const message = "Employee Manager";
    figlet(message, (err, data)=> {
        console.log(gradient.pastel.multiline(data))
        mainMenu();
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
    case "VIEW_ALL_EMPLOYEES":
      viewEmployees();
      break;
    case "VIEW_ALL_DEPARTMENTS":
      viewDepartment();
      break;
    case "ADD_EMPLOYEE":
      addEmployee();
      break;
    case "UPDATE_EMPLOYEE_ROLE":
      updateEmployeeRole();
      break;
    case "VIEW_ALL_ROLES":
      viewRole();
      break;
    case "ADD_ROLE":
      addRole();
      break;
    case "ADD_DEPARTMENT":
      addDepartment();
      break;
    case "QUIT":
      quit();
      break;
  }
});
}


async function viewDepartment() {
  var Depts = await db.findDepartments()
  console.log(Depts)
  


}

async function viewRole() {
  var Roles = await db.findRoles()
  console.log(Roles)
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
