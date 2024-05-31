document.addEventListener('DOMContentLoaded', () => {
    const filtersContainer = document.querySelector('.filters');
    const jobListingsContainer = document.querySelector('.job-listings');
    const clearFiltersButton = document.getElementById('clear-filters');
    
    let jobs = [];
    let filters = new Set();

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
            if (isFiltered(job)) {
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
    
                const allTags = [job.role, job.level, ...job.languages, ...job.tools];
                allTags.forEach(tag => {
                    const tagElement = document.createElement('span');
                    tagElement.classList.add('tag');
                    tagElement.textContent = tag;
                    jobTags.appendChild(tagElement);
                    tagElement.addEventListener('click', () => addFilter(tag));
                });
    
                jobCard.appendChild(jobLogo);
                jobCard.appendChild(jobDetails);
                jobCard.appendChild(jobTags);
                jobListingsContainer.appendChild(jobCard);
            }
        });
    }

    function isFiltered(job) {
        if (filters.size === 0) return true;
        const tags = [job.role, job.level, ...job.languages, ...job.tools];
        return Array.from(filters).every(filter => tags.includes(filter));
    }

    function addFilter(tag) {
        filters.add(tag);
        renderFilters();
        displayJobs(jobs);
    }

    function removeFilter(tag) {
        filters.delete(tag);
        renderFilters();
        displayJobs(jobs);
    }

    function renderFilters() {
        filtersContainer.innerHTML = '';
        filters.forEach(filter => {
            const filterElement = document.createElement('div');
            filterElement.className = 'filter-tag';
            filterElement.innerText = filter;
            const removeButton = document.createElement('button');
            removeButton.innerText = 'x';
            removeButton.addEventListener('click', () => removeFilter(filter));
            filterElement.appendChild(removeButton);
            filtersContainer.appendChild(filterElement);
        });
    }

    clearFiltersButton.addEventListener('click', () => {
        filters.clear();
        renderFilters();
        displayJobs(jobs);
    });

    renderFilters();
});
