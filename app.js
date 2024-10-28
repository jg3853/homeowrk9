console.log('Hello World!');

const ownerName = 'Becky Sue';

function showGreeting(name) { 
    return `Hello, my name is ${name}! Welcome to my portfolio!`;
}

document.getElementById('greeting-message').textContent = showGreeting(ownerName);

function daysUntilDeadline(deadline) {
    const today = new Date();
    const [month, day, year] = deadline.split('-');
    const targetDate = new Date(`${year}-${month}-${day}`);
    const timeDifference = targetDate - today;
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysRemaining;
}

const deadlineDate = '12-31-2024';
document.getElementById('days-until-deadline').textContent = daysUntilDeadline(deadlineDate);
console.log(`Days until deadline: ${daysUntilDeadline(deadlineDate)}`);

let hasDownloadedResume = false;
let downloadCount = 0;

document.getElementById('download-resume-btn').addEventListener('click', function () {
    if (!hasDownloadedResume) {
        alert('Your resume downloaded successfully!');
        hasDownloadedResume = true;
        downloadCount++;
        document.getElementById('download-count').textContent = downloadCount;
    }
});

const skills = ['Spinal Adjustments', 'Physical Therapy', 'Sports Injury Rehabilitation', 'Patient Assessment'];
const skillsList = $('#skills-list');

function renderSkills() {
    skillsList.empty();
    skills.forEach((skill, index) => {
        const skillItem = $(`<li class="list-group-item">${skill}</li>`);
        const deleteButton = $('<button class="btn btn-danger btn-sm ml-2">Delete</button>');
        
        deleteButton.click(function() {
            skills.splice(index, 1);
            skillItem.slideUp(() => renderSkills());
        });
        
        skillItem.append(deleteButton).click(function() {
            const newSkill = prompt('Edit Skill:', skill);
            if (newSkill) {
                skills[index] = newSkill.trim();
                renderSkills();
            }
        }).hide().fadeIn();

        skillsList.append(skillItem);
    });
}

renderSkills();

$('#add-skill-btn').click(function() {
    const newSkill = $('#new-skill-input').val().trim();

    if (newSkill && !skills.includes(newSkill)) {
        skills.push(newSkill);
        renderSkills();
        $('#new-skill-input').val('').focus();
    } else if (skills.includes(newSkill)) {
        alert('Skill already exists!');
    } else {
        alert('Please enter a skill.');
    }
});

$('#new-skill-input').keydown(function(event) {
    if (event.key === 'Enter') {
        $('#add-skill-btn').click();
    } else if (event.key === 'Escape') {
        $(this).val('');
    }
});

const projects = [
    {
        title: 'Sport Injury Rehabilitation',
        description: 'Helping athletes recover and prevent injuries.',
        deadline: new Date("12/31/2024"),
        imageURL: 'pexels-pixabay-2346.jpg'
    },
    {
        title: 'Patient Education Initiatives',
        description: 'Educational resources for patients.',
        deadline: new Date("12/31/2024"),
        imageURL: 'pexels-karolina-grabowska-4506109.jpg'
    },
    {
        title: 'Align the Spine, Body, and Mind',
        description: 'Body and mental health program.',
        deadline: new Date("01/01/2023"),
        imageURL: 'pexels-pixabay-355863.jpg'
    }
];

const projectsGrid = $('.projects-grid');

function renderProjects() {
    projectsGrid.empty();
    projects.forEach(project => {
        const projectCard = $(`
            <div class="col-md-6">
                <div class="card mb-3">
                    <img src="${project.imageURL}" class="card-img-top" alt="${project.title}">
                    <div class="card-body">
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text">${project.description}</p>
                        <p class="card-text">Deadline: ${project.deadline.toDateString()}</p>
                    </div>
                </div>
            </div>
        `);
        projectsGrid.append(projectCard);
    });
}

renderProjects();

$('#sort-deadline').click(function() {
    projects.sort((a, b) => a.deadline - b.deadline);
    renderProjects();
});

const experiences = [
    {
        position: "Intern",
        company: "XYZ Chiropractic Clinic",
        start: "2010",
        end: "2011",
        description: "Assisted in helping patients under the supervision of a higher-up."
    },
    {
        position: "Associate Chiropractor",
        company: "ABC Chiropractic Center",
        start: "2011",
        end: "2014",
        description: "Worked with my own patients such as athletes and older people."
    },
    {
        position: "Chiropractor",
        company: "Becky Sue's Chiropractic Clinic",
        start: "2014",
        end: "Present",
        description: "Opened my own clinic, specializing in athlete care."
    }
];

const education = [
    {
        institution: "Abraham Lincoln High School",
        degree: "High School Diploma",
        duration: "4 years",
        start: "2002",
        end: "2006"
    },
    {
        institution: "Palmer College of Chiropractic, Iowa",
        degree: "Doctorate",
        duration: "8 years",
        start: "2006",
        end: "2014"
    }
];

function generateTableRows(data) {
    return data.map(item => `
        <tr>
            <td>${item.position || item.degree}</td>
            <td>${item.company || item.institution}</td>
            <td>${item.start} - ${item.end}</td>
            <td>${item.description || item.duration}</td>
        </tr>
    `).join('');
}

function createTable(sectionId, tableData, headers) {
    const tableHTML = `
        <table class="table">
            <thead>
                <tr>
                    ${headers.map(header => `<th>${header}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${generateTableRows(tableData)}
            </tbody>
        </table>
    `;
    document.getElementById(sectionId).innerHTML = tableHTML;
}

createTable('experience-section', experiences, ['Position', 'Company', 'Duration', 'Description']);
createTable('education-section', education, ['Degree', 'Institution', 'Start-End', 'Duration']);
