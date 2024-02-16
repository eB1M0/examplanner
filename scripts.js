document.addEventListener('DOMContentLoaded', function () {
    const examSchedule = [
        { subject: 'TOC', preBoardDate: 'March 1, 2024', boardDate: 'March 19, 2024', chapters: 7 },
        { subject: 'CN', preBoardDate: 'March 3, 2024', boardDate: 'March 22, 2024', chapters: 7 },
        { subject: 'OS', preBoardDate: 'March 5, 2024', boardDate: 'March 26, 2024', chapters: 7 },
        { subject: 'DBMS', preBoardDate: 'March 7, 2024', boardDate: 'March 29, 2024', chapters: 10 },
        { subject: 'AI', preBoardDate: 'March 10, 2024', boardDate: 'April 1, 2024', chapters: 6 }
    ];

    function calculateRemainingDays(examDate, examType) {
        let examDateTime;
        if (examType === 'preBoard') {
            examDateTime = new Date('February 28, 2024');
        } else {
            examDateTime = new Date('March 16, 2024');
        }
        const currentDate = Date.now();
        const timeDifference = examDateTime - currentDate;
        const remainingDays = (timeDifference / (1000 * 3600 * 24)).toFixed(1);
        return remainingDays >= 0 ? remainingDays : 'Exam Over';
    }

    function generateTable() {
        let tableHTML = '<h2>Exam Schedule</h2>';
        tableHTML += '<table>';
        tableHTML += '<tr><th>Subject</th><th>Pre Board Date</th><th>Board Date</th><th>Assumed Remaining Days (Pre Board)</th><th>Actual Remaining Days (Pre Board)</th><th>Assumed Remaining Days (Board)</th><th>Actual Remaining Days (Board)</th></tr>';

        examSchedule.forEach(exam => {
            const preBoardDate = new Date(exam.preBoardDate);
            const boardDate = new Date(exam.boardDate);
            const currentDate = Date.now();

            const assumedRemainingDaysPreBoard = ((preBoardDate - currentDate) / (1000 * 3600 * 24)).toFixed(1);
            const assumedRemainingDaysBoard = ((boardDate - currentDate) / (1000 * 3600 * 24)).toFixed(1);

            const actualRemainingDaysPreBoard = calculateRemainingDays(exam.preBoardDate, 'preBoard');
            const actualRemainingDaysBoard = calculateRemainingDays(exam.boardDate, 'board');

            // Check for negative values and replace with 'Exam Over'
            tableHTML += `<tr>
                            <td>${exam.subject}</td>
                            <td>${exam.preBoardDate}</td>
                            <td>${exam.boardDate}</td>
                            <td>${actualRemainingDaysPreBoard < 0 ? 'Exam Over' : actualRemainingDaysPreBoard}</td>
                            <td>${assumedRemainingDaysPreBoard < 0 ? 'Exam Over' : assumedRemainingDaysPreBoard}</td>
                            <td>${actualRemainingDaysBoard < 0 ? 'Exam Over' : actualRemainingDaysBoard}</td>
                            <td>${assumedRemainingDaysBoard < 0 ? 'Exam Over' : assumedRemainingDaysBoard}</td>
                        </tr>`;
        });

        const assumedRemainingDaysPreBoard = ((new Date('February 28, 2024') - Date.now()) / (1000 * 3600 * 24)).toFixed(1);
        const assumedRemainingDaysBoard = ((new Date('March 16, 2024') - Date.now()) / (1000 * 3600 * 24)).toFixed(1);

        const remainingDaysForEachSubjectPB = (assumedRemainingDaysPreBoard / examSchedule.length).toFixed(1);
        const remainingDaysForEachSubjectB = (assumedRemainingDaysBoard / examSchedule.length).toFixed(1);

        // Check for negative values and replace with 'Exam Over'
        tableHTML += `<tr>
            <td>Average Remaining Days per Subject (Pre Board)</td>
            <td>${remainingDaysForEachSubjectPB < 0 ? 'Exam Over' : remainingDaysForEachSubjectPB}</td>
            <td>Average Remaining Days per Subject (Board)</td>
            <td>${remainingDaysForEachSubjectB < 0 ? 'Exam Over' : remainingDaysForEachSubjectB}</td>
        </tr>`;

        tableHTML += '</table>';
        document.getElementById('examSchedule').innerHTML = tableHTML;
    }

    function calculateRemainingChapters() {
        let remainingChaptersHTML = '<h2>Remaining Days for Preparation of Chapters</h2>';
        remainingChaptersHTML += '<table>';
        remainingChaptersHTML += '<tr><th>Subject</th><th>Total Chapters</th><th>Remaining Days per Chapter (Pre Board)</th><th>Remaining Days per Chapter (Board)</th></tr>';

        examSchedule.forEach(exam => {
            const remainingDaysPreBoard = calculateRemainingDays(exam.preBoardDate, 'preBoard');
            const remainingDaysBoard = calculateRemainingDays(exam.boardDate, 'board');

            const remainingChaptersPreBoard = remainingDaysPreBoard === 'Exam Over' ? 'Exam Over' : (remainingDaysPreBoard / exam.chapters).toFixed(1);
            const remainingChaptersBoard = remainingDaysBoard === 'Exam Over' ? 'Exam Over' : (remainingDaysBoard / exam.chapters).toFixed(1);

            // Check for negative values and replace with 'Exam Over'
            remainingChaptersHTML += `<tr>
                                        <td>${exam.subject}</td>
                                        <td>${exam.chapters}</td>
                                        <td>${remainingChaptersPreBoard < 0 ? 'Exam Over' : remainingChaptersPreBoard}</td>
                                        <td>${remainingChaptersBoard < 0 ? 'Exam Over' : remainingChaptersBoard}</td>
                                    </tr>`;
        });

        remainingChaptersHTML += '</table>';
        document.getElementById('remainingDays').innerHTML = remainingChaptersHTML;
    }

    generateTable();
    calculateRemainingChapters();

});
