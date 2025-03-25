import * as vacanciesService from '../services/vacancies.service.js';

export const getVacancies = async (req, res, next) => {
    try {
        const vacancies = await vacanciesService.getVacanciesFromDB();
        res.json(vacancies);
    } catch (error) {
        logger.error('Error fetching vacancies:', error);
        next(error);
    }
};

export const searchVacancies = async (req, res, next) => {
    try {
        const { text, perPage, page } = req.body;
        const vacancies = await vacanciesService.searchExternalVacancies(
            text,
            perPage,
            page
        );
        res.json(vacancies);
    } catch (error) {
        logger.error('Error searching vacancies:', error);
        next(error);
    }
};