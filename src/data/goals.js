var financial = [{
    title: "Tabung Kahwin",
    target: 1000,
    current: 750,
    percentage:75,
    dueDate:'20 April 2022',
    transactions: [
        { details: 'January Income', amount: 200, type: 'Credit', date: "20 April 2020" },
        { details: 'February Income', amount: 200, type: 'Credit', date: "20 April 2020" },
        { details: 'Emergency', amount: 150, type: 'Debit', date: "20 April 2020" },
        { details: 'Mac Income', amount: 300, type: 'Credit', date: "20 April 2020" },
        { details: 'April Income', amount: 400, type: 'Credit', date: "20 April 2020" }
    ]
},
{
    title: "Tabung Kebajikan",
    target: 2000,
    current: 1000,
    percentage:50,
    dueDate:'20 April 2022',
    transactions: [
        { details: 'January Income', amount: 20, type: 'Credit', date: "20 April 2020" },
        { details: 'February Income', amount: 20, type: 'Credit', date: "20 April 2020" },
        { details: 'Emergency', amount: 15, type: 'Debit', date: "20 April 2020" },
        { details: 'Mac Income', amount: 30, type: 'Credit', date: "20 April 2020" },
        { details: 'April Income', amount: 40, type: 'Credit', date: "20 April 2020" }
    ]
}]

var work = [{
    title: "Web Programming",
    percentage : 40,
    dueDate:'20 April 2022',
    pendingTasks : [
        { task: 'Figma design', due: "20 April 2020" }, 
        { task: 'Start coding', due: "20 April 2020" },
        { task: 'Presentation', due: "20 April 2020" }],
    finishedTasks : [
        { task: 'Task delegation', due: "20 April 2020" }, 
        { task: 'User research', due: "20 April 2020" }, 
    ]
},
{
    title: "Software Modelling",
    percentage : 50,
    dueDate:'20 April 2022',
    pendingTasks : [
        { task: 'Create use case', due: "20 April 2020" }, 
        { task: 'Start designing', due: "20 April 2020" },
        { task: 'Presentation', due: "20 April 2020" }],
    finishedTasks : [
        { task: 'task delegation', due: "20 April 2020" }, 
        { task: 'user research', due: "20 April 2020" }, 
        { task: 'requirement research', due: "20 April 2020" }, 
    ]
}]

export { financial,work }

