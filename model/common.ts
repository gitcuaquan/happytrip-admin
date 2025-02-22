
export interface IFilterOnParams {
    sortBy?: string;
    sort_by?: string;
    fields?: string;
    limit?: number;
    page?: number;
}

export class FilterOnParams implements IFilterOnParams {
    sortBy?: string;
    sort_by?: string;
    fields?: string;
    limit?: number;
    page?: number;
    constructor(initValue?: IFilterOnParams) {
        this.sortBy = initValue?.sortBy;
        this.fields = initValue?.fields;
        this.limit = initValue?.limit ?? 20;
        this.page = initValue?.page ?? 1;
    }
}
