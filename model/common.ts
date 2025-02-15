
export interface IFilterOnParams {
    sortBy?: string;
    fields?: string;
    limit?: number;
    page?: number;
}

export class FilterOnParams implements IFilterOnParams {
    sortBy?: string;
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
