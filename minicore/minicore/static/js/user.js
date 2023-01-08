var tot = 0;
const getUsers = () => {

    let us=false;
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
  
        let art=``;
        let perc=``;

        labels.forEach((y,index)=>{
        if ((data[index]) > valst)
        {
            console.log(data[index])
            us = true;

        }
        });
        if (us == true)
        {
            console.log("hola")
            tot = tot + 1;
        }
        
        console.log(tot)
        console.log(us)
        art = `
        <p> La cantidad de usuarios que sobrepasan el presupuesto son: ${tot}</p>
        `;
        user.innerHTML += art;
      });
  };
  
  document.onload = getUsers();