const econfig = {
    baseUrl:
        window.location.hostname === "localhost"
            ? "http://129.211.213.154:8000"
            : window.location.protocol + '//' + window.location.host
};

export default econfig;