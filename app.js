document.addEventListener('DOMContentLoaded', () =>{
    const filtersContainer = document.querySelector('.filters');
    const jobListingContainer = document.querySelector('.job-listings');
    const clearFiltersButton = document.getElementById('clear-filters');

    let jobs =[];
    let filters = [];

    //Fetch job data
    fetch('data.json')
    .then(response => response.json())
    .then(data =>{
        jobs = data;
        displayJobs(jobs);
        // console.log(data)
    });

    //Display job listings
    function displayJobs(jobs) {
        jobListingContainer.innerHTML = '';
        jobs.forEach(job =>{
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');


            const jobDetails = document.createElement('div');
            jobDetails.classList.add('job-details');

            //labels
            let labels = '';
            if(job.new) labels += `<span class ="label new">New!</span>`;
            if(jobs.featured) labels +=  '<span class="label featured">Featured</span>';

            //logo
            const jobLogo = document.createElement('img');
            jobLogo.src = job.logo;
            jobLogo.alt = `${job.company} logo`;
            jobLogo.classList.add('company-logo');
            

            jobDetails.innerHTML = `
            <div>
                ${labels}
                <h2>${job.company}</h2>
            </div>
            <p>${job.position}</p>
            <p>${job.postedAt} • ${job.contract} • ${job.location}</p>
            <div class="job-tags">
                ${job.languages.map(lang => `<span class="tag">${lang}</span>`).join('')}
                ${job.tools.map(tool => `<span class="tag">${tool}</span>`).join('')}
            </div>
        `;

        jobCard.appendChild(jobLogo);
        jobCard.appendChild(jobDetails);
        jobListingContainer.appendChild(jobCard)
        });
    }
   //event listeners
   filtersContainer.addEventListener('click', (e) => {
    if(e.target.tagName === "BUTTON"){
        const filter = e.target.textContent;
        if(!filters.includes(filtersContainer)){
            filters.push(filter);
            updateFilters();
            displayJobs(jobs.filter(job => filters.every(filter => job.languages.includes(filter) || job.tools.includes(filter))));
        }
    }
   });

   //clear filters
   
})