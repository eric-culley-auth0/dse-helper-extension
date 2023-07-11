interface Req {
    method: 'GET' | 'POST',
    headers: {
        "Authorization": string,
        "Content-Type": 'application/json'
    }, 
    body?: string
}

export const checkForFolder = async (authToken: string): Promise<string | undefined> => {
    const request: Req = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        }
    };
    const queryString: string = encodeURIComponent('mimeType="application/vnd.google-apps.folder" and parents="root" and name="ESD Templates" and trashed=false');

    try {
        const res = await fetch(`https://www.googleapis.com/drive/v3/files?q=${queryString}`, request);
        const data = await res.json();

        if (data.files && data.files.length > 0 && data.files[0].name === 'ESD Templates') {
            return data.files[0].id;
        } else {
            return undefined;
        }
    } catch (err) {
        console.error(err);
     }
   
}

export const createFolder = async (authToken: string): Promise<string | Error> => {
    const request: Req = {
        method: 'POST',
        body: JSON.stringify({
            mimeType: 'application/vnd.google-apps.folder',
            name: 'ESD Templates',
            parents: ['root']
        }),
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await fetch('https://www.googleapis.com/drive/v3/files', request);
        const data = await res.json();

        if (data && data.id) {
            return data.id as string;
        } else {
            throw new Error(`Error: ${data}`);
        }
    } catch (err) {
        console.error(err);
        return err as Error;
     }
   
}

export const createFile = async (authToken: string, folder: string, fileName: string): Promise<string | Error> => {
    const request: Req = {
        method: 'POST',
        body: JSON.stringify({
            name: fileName,
            parents: [folder]
        }), 
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await fetch('https://www.googleapis.com/drive/v3/files/1QhUE0aoPeMmDTJJGVVkzA3ugHGWHeXmGtE1oKjpaO6I/copy?supportsAllDrives=true', request);
        const data = await res.json();
        if (data.id) {
            return data.id;
        } else {
            throw new Error(data);
        }
    } catch (err) {
       console.error(err);
       return err as Error;
    }
}