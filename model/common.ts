export class FilterOnParams {
    sortBy?: string;
    fields?: string;
    limit?: number;
    page?: number;
    constructor(sortBy?: string, fields?: string, limit?: number, page?: number) {
        this.sortBy = sortBy;
        this.fields = fields;
        this.limit = limit ?? 250;
        this.page = page ?? 1;
    }
}