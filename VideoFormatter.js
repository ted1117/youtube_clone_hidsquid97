// 조회수 단위 변경
function adjustUnit(views) {
    if (views > 10000) {
        const result = (views / 10000).toFixed(1);
        return result.endsWith('.0') ? result.slice(0, -2) + "만" : result + "만";
    } else if (views > 1000) {
        const result = (views / 1000).toFixed(1);
        return result.endsWith('.0') ? result.slice(0, -2) + "천" : result + "천";
    } else {
        return views;
    }
}


// 업로드 일자 기간 계산
function calcDateDiff(date) {
    const inputDate = new Date(date);
    const currentDate = new Date();

    // 두 날짜의 차이 (ms)
    const msDiff = currentDate - inputDate;

    // 두 날짜의 차이 (일)
    const daysDiff = msDiff / (1000 * 60 * 60 * 24);

    // 날짜 계산
    if (daysDiff >= 365) {
        const yearsDiff = Math.floor(daysDiff / 365);
        return `${yearsDiff}년 전`;
    } else if (daysDiff >= 30) {
        const monthsDiff = Math.floor(daysDiff / 30);
        return `${monthsDiff}달 전`;
    } else if (daysDiff >= 7) {
        const weeksDiff = Math.floor(daysDiff / 7);
        return `${weeksDiff}주 전`;
    } else {
        return `${Math.floor(daysDiff)}일 전`;
    }
}