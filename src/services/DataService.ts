
const xhr = new XMLHttpRequest();

class DataService {
    request(method: string, url: string) {
        return new Promise(function (resolve, reject) {
            xhr.open(method, url);
            xhr.onload = resolve;
            xhr.onerror = reject;
            xhr.send();
        });
    }
}

export default new DataService();