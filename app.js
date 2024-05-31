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
  
})