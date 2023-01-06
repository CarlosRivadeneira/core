const renderChart = (data, labels) => {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Last 6 months expenses",
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Expenses per category",
      },
    },
  });
};

const getChartData = () => {
  console.log("fetching");
  fetch("/expense_category_summary")
    .then((res) => res.json())
    .then((results) => {
      console.log("results", results);
      const category_data = results.expense_category_data;
      const [labels, data] = [
        Object.keys(category_data),
        Object.values(category_data),
      ];

      console.log(results.expense_category_data);
      console.log(category_data);

      renderChart(data, labels);

      let div=``;
      let av=``;
      labels.forEach((y,index)=>{
        console.log(data[index])
        if (data[index] > 4)
          av+=`
          <div class="feature col">
          <p>Sobrepasa el presupuesto</p>
          </div>
          `;
        else
          av+=`
          <div class="feature col">
          <p>Se encuentra dentro del presupuesto
          </div>
          `;
        div+=`
        <div class="feature col">
          <div class="feature-icon bg-primary bg-gradient">
            <svg class="bi" width="1em" height="1em"><use xlink:href="#collection"></use></svg>
          </div>
          <h2>${y}</h2>
          <p>${data[index]}</p>
        </div>
        `;
      });
      cbcb.innerHTML = av;
      cbocategory.innerHTML = div;
    });
};

document.onload = getChartData();