
export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));

    if (date.toDateString() === new Date().toDateString()) {
        return "Opublikowana: Dzisiaj";
    } else if (date.toDateString() === yesterday.toDateString()) {
        return "Opublikowana: Wczoraj";
    } else {
        const day = date.getDate();
        const months = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"];
        const month = months[date.getMonth()];
        return `Opublikowana: ${day} ${month}`;
    }
};
