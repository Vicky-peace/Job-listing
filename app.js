document.addEventListener('DOMContentLoaded', () => {
    const filtersContainer = document.querySelector('.filters');
    const jobListingsContainer = document.querySelector('.job-listings');
    const clearFiltersButton = document.getElementById('clear-filters');
    
    let jobs = [];
    let filters = [];

    // Fetch job data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            jobs = data;
            displayJobs(jobs);
        });

    // Display job listings
    function displayJobs(jobs) {
        jobListingsContainer.innerHTML = '';
        jobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');
            
            // Job logo
            const jobLogo = document.createElement('img');
            jobLogo.src = job.logo;
            jobLogo.alt = `${job.company} logo`;
            jobLogo.classList.add('company-logo');
            
            const jobDetails = document.createElement('div');
            jobDetails.classList.add('job-details');

            // Labels for new and featured
            let labels = '';
            if (job.new) labels += '<span class="label new">New!</span>';
            if (job.featured) labels += '<span class="label featured">Featured</span>';

            jobDetails.innerHTML = `
                <div class="company-name">
                    ${labels}
                    <h2>${job.company}</h2>
                </div>
                <p>${job.position}</p>
                <p>${job.postedAt} • ${job.contract} • ${job.location}</p>
            `;

            const jobTags = document.createElement('div');
            jobTags.classList.add('job-tags');

            const allTags = [...job.languages, ...job.tools];
            allTags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.classList.add('tag');
                tagElement.textContent = tag;
                jobTags.appendChild(tagElement);
            });

            jobCard.appendChild(jobLogo);
            jobCard.appendChild(jobDetails);
            jobCard.appendChild(jobTags);
            jobListingsContainer.appendChild(jobCard);
        });
    }

    // Add event listeners for filters
    filtersContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const filter = e.target.textContent;
            if (!filters.includes(filter)) {
                filters.push(filter);
                updateFilters();
                displayJobs(jobs.filter(job => filters.every(filter => job.languages.includes(filter) || job.tools.includes(filter))));
            }
        }
    });

    // Clear filters
    clearFiltersButton.addEventListener('click', () => {
        filters = [];
        updateFilters();
        displayJobs(jobs);
    });

    // Update filters UI
    function updateFilters() {
        filtersContainer.innerHTML = '';
        filters.forEach(filter => {
            const filterButton = document.createElement('button');
            filterButton.textContent = filter;
            filtersContainer.appendChild(filterButton);
        });
    }
});
