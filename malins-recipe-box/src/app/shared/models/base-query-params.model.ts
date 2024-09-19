/**
 * Interface for the base query parameters for an API request
 */

export interface BaseQueryParams {
    type: string;
    app_id: string;
    app_key: string;
    dishType: string[];
    imageSize: string;
    field: string[];
}
