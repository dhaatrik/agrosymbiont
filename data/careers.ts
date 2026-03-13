
export type JobCategory = 'all' | 'engineering' | 'science' | 'sales';

export interface Job {
    id: string;
    titleKey: string;
    locationKey: string;
    typeKey: string;
    category: JobCategory;
}

export interface Benefit {
    id: string;
    titleKey: string;
    descriptionKey: string;
}

export const jobCategories: { id: JobCategory; labelKey: string }[] = [
    { id: 'all', labelKey: 'car_cat_all' },
    { id: 'engineering', labelKey: 'car_cat_engineering' },
    { id: 'science', labelKey: 'car_cat_science' },
    { id: 'sales', labelKey: 'car_cat_sales' },
];

export const jobOpenings: Job[] = [
    {
        id: 'agronomist-lead',
        titleKey: 'car_job_agronomist',
        locationKey: 'car_loc_remote',
        typeKey: 'car_type_fulltime',
        category: 'science',
    },
    {
        id: 'biochemical-scientist',
        titleKey: 'car_job_scientist',
        locationKey: 'car_loc_sf',
        typeKey: 'car_type_fulltime',
        category: 'science',
    },
    {
        id: 'marketing-manager',
        titleKey: 'car_job_marketing',
        locationKey: 'car_loc_sf',
        typeKey: 'car_type_fulltime',
        category: 'sales',
    },
];

export const benefits: Benefit[] = [
    {
        id: 'benefit-1',
        titleKey: 'car_benefit_1_title',
        descriptionKey: 'car_benefit_1_desc',
    },
    {
        id: 'benefit-2',
        titleKey: 'car_benefit_2_title',
        descriptionKey: 'car_benefit_2_desc',
    },
    {
        id: 'benefit-3',
        titleKey: 'car_benefit_3_title',
        descriptionKey: 'car_benefit_3_desc',
    },
];
