fetch('/api')
  .then(res => res.json())
  .then(data => {
      document.getElementById("name").innerText = data.name;
      document.getElementById("bio").innerText = data.bio;

      const expList = document.getElementById("experience");

      data.experience.forEach(job => {
        const li = document.createElement("li");
        li.inerText = job;
        expList.appendChild(li);
      });
  })
  .catch(err => console.error(err));
