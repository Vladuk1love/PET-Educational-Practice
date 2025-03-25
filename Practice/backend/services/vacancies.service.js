import Vacancies from '../schemas/Vacancies.js';
import searchVacancies from '../utils/search.js';

export const getVacanciesFromDB = async () => {
    try {
        return await Vacancies.find().limit(50).exec();
    } catch (error) {
        logger.error('Database error in getVacanciesFromDB:', error);
        throw error;
    }
};

export const searchExternalVacancies = async (text, perPage, page) => {
    try {
        return await searchVacancies(text, perPage, page);
    } catch (error) {
        logger.error('External API error in searchExternalVacancies:', error);
        throw error;
    }
};