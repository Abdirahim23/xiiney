
const data = [
    {
        id: 1,
        name: "Jaamac",
        sales: [
          {
            id: 1,
            date: "2023-01-01",
          },
          {
            id: 2,
            date: "2023-02-01",
          },
          {
            id: 3,
            date: "2023-03-01",
          },
          {
            id: 4,
            date: "2023-04-01",
          },
          {
            id: 5,
            date: "2023-05-01",
          },
          {
            id: 6,
            date: "2023-06-01",
          },
          {
            id: 7,
            date: "2023-07-01",
          },
          {
            id: 8,
            date: "2023-08-01",
          },
          {
            id: 9,
            date: "2023-09-01",
          },
          {
            id: 10,
            date: "2023-10-01",
          },
          {
            id: 11,
            date: "2023-11-01",
          },
          {
            id: 12,
            date: "2023-12-01",
          },
        ],
      },
  ];
  
  const getSalesPersonById = (id) => data.find((item) => item.id === id);
  
  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
  
  const workingDaysInMonth = (year, month) => {
    let workingDaysCount = 0;
  
    for (let i = 1; i <= getDaysInMonth(year, month); i++) {
      let dayOfWeek = new Date(year, month - 1, i).getDay();
      if (dayOfWeek !== 5) {
        workingDaysCount++;
      }
    }
  
    return { workingDays: workingDaysCount };
  };
  
  const getSalesByDay = (yearlySales, from, to, id) => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const monthlyAmount = yearlySales / 12;
    const person = getSalesPersonById(id);
  
    if (!person) {
      throw new Error(`Sales person not found ${id}`);
    }
  
    const validated = person.sales.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= fromDate && itemDate <= toDate;
    });
  
    const daysWorkedExcludingFridays = daysWorkedExcludingFriday(fromDate, toDate);
  
    const workedTargets = [];
    const workingDaysExcludedFridays = [];
    let currentDate = new Date(fromDate);
  
    while (currentDate <= toDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const { workingDays } = workingDaysInMonth(year, month);
  
      if (workingDays > 0) {
        workedTargets.push(Number((monthlyAmount / workingDays).toFixed(2)));
        workingDaysExcludedFridays.push(workingDays);
      }
  
      currentDate.setMonth(currentDate.getMonth() + 1, 1);
    }
  
    return {
      workedTargets,
      totalTarget: validated.length * monthlyAmount,
      workingDaysExcludedFridays,
      daysWorkedExcludingFridays,
    };
  };
  
  const daysWorkedExcludingFriday = (from, to) => {
    let workingDaysCount = 0;
    let currentDate = new Date(from);
  
    while (currentDate <= to) {
      let dayOfWeek = currentDate.getDay();
  
      if (dayOfWeek !== 5) {
        workingDaysCount++;
      }
  
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return workingDaysCount;
  };
  
  console.log(getSalesByDay(5220, "2023-1-1", "2023-1-7", 1));