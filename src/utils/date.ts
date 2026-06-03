import dayjs from "dayjs";

export const getSessionDate = () => {
    const now = dayjs();

    return now.hour() < 4
        ? now.subtract(1, "day").format("YYYY-MM-DD")
        : now.format("YYYY-MM-DD");
};
