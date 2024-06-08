export function end_of_day() {
    const end_of_day = new Date();
    end_of_day.setHours(23, 59, 59, 999);
    return end_of_day
}