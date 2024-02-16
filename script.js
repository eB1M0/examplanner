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
        const currentDate = new Date();
        const timeDifference = examDateTime.getTime() - currentDate.getTime();
        const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return remainingDays >= 0 ? remainingDays : 'Exam Over';
    }

    function generateTable() {
        let tableHTML = '<h2>Exam Schedule</h2>';
        tableHTML += '<table>';
        tableHTML += '<tr><th>Subject</th><th>Pre Board Date</th><th>Board Date</th><th>Actual Remaining Days (Pre Board)</th><th>Assumed Remaining Days (Pre Board)</th><th>Actual Remaining Days (Board)</th><th>Assumed Remaining Days (Board)</th></tr>';

        examSchedule.forEach(exam => {
            const preBoardDate = new Date(exam.preBoardDate);
            const boardDate = new Date(exam.boardDate);
            const currentDate = new Date();

            const assumedRemainingDaysPreBoard = Math.ceil((preBoardDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
            const assumedRemainingDaysBoard = Math.ceil((boardDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));

            const actualRemainingDaysPreBoard = calculateRemainingDays(exam.preBoardDate, 'preBoard');
            const actualRemainingDaysBoard = calculateRemainingDays(exam.boardDate, 'board');

            tableHTML += `<tr>
                            <td>${exam.subject}</td>
                            <td>${exam.preBoardDate}</td>
                            <td>${exam.boardDate}</td>
                            <td>${assumedRemainingDaysPreBoard}</td>
                            <td>${actualRemainingDaysPreBoard}</td>
                            <td>${assumedRemainingDaysBoard}</td>
                            <td>${actualRemainingDaysBoard}</td>
                        </tr>`;
        });

        tableHTML += '</table>';
        document.getElementById('examSchedule').innerHTML = tableHTML;
        //   remainingDaysForEachSubject(assumedRemainingDaysPreBoard, assumedRemainingDaysBoard);
        // return assumedRemainingDaysPreBoard, assumedRemainingDaysBoard;
    }



    // function calculateRemainingChapters() {
    //     let remainingChaptersHTML = '<h2>Remaining Days for Preparation of Chapters</h2> (Calculated based on Assumed remaining days!)<br>';

    //     examSchedule.forEach(exam => {
    //         const remainingDaysPreBoard = calculateRemainingDays(exam.preBoardDate, 'preBoard');
    //         const remainingDaysBoard = calculateRemainingDays(exam.boardDate, 'board');

    //         const remainingChaptersPreBoard = remainingDaysPreBoard === 'Exam Over' ? 'Exam Over' : Math.ceil(remainingDaysPreBoard / exam.chapters * 10) / 10;
    //         const remainingChaptersBoard = remainingDaysBoard === 'Exam Over' ? 'Exam Over' : Math.ceil(remainingDaysBoard / exam.chapters * 10) / 10;

    //         remainingChaptersHTML += `<p>For ${exam.subject}: ${remainingChaptersPreBoard} days per chapter (Pre Board), ${remainingChaptersBoard} days per chapter (Board)</p>`;
    //     });

    //     document.getElementById('remainingDays').innerHTML = remainingChaptersHTML;
    // }

    function calculateRemainingChapters() {
        let remainingChaptersHTML = '<h2>Remaining Days for Preparation of Chapters</h2>';
        remainingChaptersHTML += '<table>';
        remainingChaptersHTML += '<tr><th>Subject</th><th>Total Chapters</th><th>Remaining Days per Chapter (Pre Board)</th><th>Remaining Days per Chapter (Board)</th></tr>';

        examSchedule.forEach(exam => {
            const remainingDaysPreBoard = calculateRemainingDays(exam.preBoardDate, 'preBoard');
            const remainingDaysBoard = calculateRemainingDays(exam.boardDate, 'board');

            const remainingChaptersPreBoard = remainingDaysPreBoard === 'Exam Over' ? 'Exam Over' : Math.ceil(remainingDaysPreBoard / exam.chapters * 10) / 10;
            const remainingChaptersBoard = remainingDaysBoard === 'Exam Over' ? 'Exam Over' : Math.ceil(remainingDaysBoard / exam.chapters * 10) / 10;

            remainingChaptersHTML += `<tr>
                                        <td>${exam.subject}</td>
                                        <td>${exam.chapters}</td>
                                        <td>${remainingChaptersPreBoard}</td>
                                        <td>${remainingChaptersBoard}</td>
                                    </tr>`;
        });

        remainingChaptersHTML += '</table>';
        document.getElementById('remainingDays').innerHTML = remainingChaptersHTML;
    }

    // function remainingDaysForEachSubject(assumedRemainingDaysPreBoard, assumedRemainingDaysBoard) {
    //     const remainingDaysPreBoard = assumedRemainingDaysPreBoard / 5;
    //     const remainingDaysBoard = assumedRemainingDaysBoard / 5;
    //     console.log(remainingDaysPreBoard, remainingDaysBoard);
    //     var displayRemainingDaysForEachSubjectPreBoard = `<h3>Remaining days for each subject for Pre Board: ${remainingDaysPreBoard}</h3>`;
    //     var displayRemainingDaysForEachSubjectBoard = `<h3>Remaining days for each subject for Board: ${remainingDaysBoard}</h3>`;
    // }


    generateTable();
    calculateRemainingChapters();
    // remainingDaysForEachSubject();
});


