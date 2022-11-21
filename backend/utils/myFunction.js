import { unlink } from 'fs';

export function deleteTempImg(img) {
    if (img !== undefined || img !== null) {
        if (Array.isArray(img)) {
            img.forEach(e => {
                unlink(e.tempFilePath, (err) => {
                    if (err !== null) { console.error(err); }
                });
            });
        } else {
            unlink(img.tempFilePath, (err) => {
                if (err !== null) { console.error(err); }
            });
            return true;
        } 
    } else {
        return false;
    }
}