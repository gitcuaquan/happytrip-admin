declare module 'quill-image-uploader' {
    export interface QuillImageUploaderOptions {
        path?: string;
        name?: string;
    }
    export function uploadImage(file: File, options?: QuillImageUploaderOptions): Promise<string>;
}