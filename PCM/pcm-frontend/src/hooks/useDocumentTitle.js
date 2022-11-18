import { useEffect } from "react";
export const useDocumentTitle = (titleSub, titlePre) => {

    useEffect(() => {
        document.title = `${titleSub ? `${titleSub} | ` : ''} PCM ${titlePre ? ` | ${titlePre}` : ''}`;
    }, [titleSub, titlePre]);

    return null;
}