const { prompt } = require("inquirer");
const figlet = require("figlet");
const gradient = require("gradient-string");
const mysql = require("mysql2");
const db = require("./db");
const table = require("console.table");

function init() {
  const message = "Employee Manager";
  figlet(message, (err, data) => {
    console.log(gradient.summer.multiline(data));
    mainMenu();
  });
}
init();

function mainMenu() {
  prompt([
    {
      type: "list",
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
  var [Depts] = await db.findDepartments();
  console.table(Depts);

  mainMenu();
}

async function viewRole() {
  var [Roles] = await db.findRoles();
  console.table(Roles);

  mainMenu();
}

async function viewEmployees() {
 var [Employees] = await db.findEmployees();
 console.table(Employees)

 mainMenu();

}

function addDepartment() {
  prompt([
    {
      name: "name",
      message: "What is the name of the department you would like to add?"
    }
  ])
    .then(res => {
      let name = res;
      db.createDepartment(name)
        .then(() => console.log(`Added ${name.name} to the database`))
        .then(() => mainMenu())
    })
}

function addRole() {
  db.findDepartments();
}

async function addEmployee() {
  const [roleChoices] = await db.findRoles()

  prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    },
    {
      type: "list",
      name:"role_id",
      message: "What is the role of the employee?",
      choices: roleChoices.map((role)=>{
        return {
          name: role.title,
          value: role.id
        }
      })
    }
  ])
  
  .then (res => {
    let roleId = res.role_id;
    db.findEmployees()
      .then(([data])=> {
        let employees = data;
        const managerSelect = employees.map(({id, first_name, last_name}) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));

        prompt ({
          type: "list",
          name: "manager_id",
          message: "Who's the employee's manager?",
          choices: managerSelect
        })
          .then(res => {
            let employee = {
              manager_id: res.manager_id,
              role_id: roleId,
              first_name: res.first_name,
              last_name: res.last_name
            }
            db.createEmployee(employee)
            .then(()=> console.log(employee))
            .then(() => console.log(`Added ${firstName} ${lastName} to the database`))
            .then(() => mainMenu())

          })
      })
   
  } )

}

function updateEmployeeRole() {
  
  db.findEmployees();
}

function quit() {
  console.log("Goodbye!");
  return process.exit();
}
