class DumpLoader {
    constructor(getDumpFn, parseDumpFn) {
        this.getDumpFn = getDumpFn;
        this.parseDumpFn = parseDumpFn;
        this.lastVersion = '';
        this.data = {};
    }

    async reload(version) {
        if (version === this.lastVersion) {
            return;
        }
        const { data } = await this.getDumpFn();
        let delimiter = '\r\n';
        if (data.indexOf(delimiter) == -1) {
            delimiter = '\n';
        }
        data.split(delimiter).forEach((line) => {
            this.parseDumpFn(this.data, line);
        });
        this.lastVersion = version
    }

    getData() {
        return this.data;
    }
}

module.exports = DumpLoader;