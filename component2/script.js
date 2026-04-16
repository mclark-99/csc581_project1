fetch('/api')
  .then(res => res.json())
  .then(data => {
      document.getElementById("name").innerText = data.name;
      document.getElementById("bio").innerText = data.bio;

      const expList = document.getElementById("experience");

      data.experience.forEach(job => {
        const li = document.createElement("li");

        li.innerHTML = `
          <div class="job">
            <div class="job-title">${job.title} ${job.company ? "– " + job.company : ""}</div>
            <div class="job-desc">${job.description}</div>
          </div>
          `;

        expList.appendChild(li);
      });

      const eduList = document.getElementById("education");

      data.education.forEach(edu => {
        const li = document.createElement("li");

        let detailsHTML = "";
        edu.details.forEach(item => {
          detailsHTML += `<li>${item}</li>`;
        });

        li.innerHTML = `
          <div class="edu">
            <div class="edu-header">
              <span class="edu-school">${edu.school} | ${edu.location}</span>
              <span class="edu-dates">${edu.dates}</span>
            </div>
            <div class="edu-degree">${edu.degree}</div>
            <ul class="edu-details">${detailsHTML}</ul>
          </div>
        `;

        eduList.appendChild(li);
      });
  })
  .catch(err => console.error(err));
