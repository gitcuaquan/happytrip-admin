
export class FilterOnParams {
    sortBy?: string;
    fields?: string;
    limit?: number;
    page?: number;
    constructor(initValue?: { sortBy?: string, fields?: string, limit?: number, page?: number }) {
        this.sortBy = initValue?.sortBy;
        this.fields = initValue?.fields;
        this.limit = initValue?.limit ?? 20;
        this.page = initValue?.page ?? 1;
    }
}
