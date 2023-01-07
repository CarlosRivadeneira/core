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
        text: "Gastos por categoria",
      },
    },
  });
};


const getChartData = () => {
  let valst;
  let budg=0;
  let valu;
  fetch("/inicio-bdg")
  .then((rest) => rest.json())
  .then((values) => {
    valu=values
    console.log("values", values);
    const [vals] = [Object.values(values)];
      console.log(vals[0].amount);
      valst=vals[0].amount
  });

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
      console.log([labels, data])

      console.log(results.expense_category_data);
      console.log(category_data);

      renderChart(data, labels);

      let art=``;
      let div=``;
      let perc=``;
      let tot;
      labels.forEach((y,index)=>{
        tot = valst - data[index] 
        console.log(data[index]);
        console.log(valst);
        perc = (data[index] * 100) / valst;
        console.log(perc)
        if (valu.length === 0){
          vbocategory.innerHTML = art;
          }
        else 
          if ((data[index]) < valst)
            art=`
            <h5> Presupuesto excedente </h5>
            <p> El porcentaje que ocupa el gasto es del: ${perc.toFixed(2)}%</p>
            `;
          else if ((data[index]) > valst)
          art=`
          <h5> Limite superado </h5>
          <p> El porcentaje que sobrepasa al presupuesto fijado es de: ${(perc-100).toFixed(2)}%</p>
          `;  
          else
          art=`
          <h5> Valor limite de presupuesto </h5>
          <p> El valor de la cantidad de gastos sumados y el presupuestado es el mismo</p>
          `;
        div+=`
        <div class="feature col">
          <div class="feature-icon bg-primary bg-gradient">
            <svg class="bi" width="1em" height="1em"><use xlink:href="#collection"></use></svg>
          </div>
          <h2>${y}</h2>
          <p>La suma total de gastos en esta categoria es: ${data[index]}</p>
          ${art}
        </div>
        `;
      });
      cbocategory.innerHTML += div;
      art=` `;
      console.log(art)
      renderCharts(tot)
    });
};

document.onload = getChartData();