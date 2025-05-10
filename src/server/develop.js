const econfig = {
    baseUrl:
        window.location.hostname === "localhost"
            ? "http://129.211.213.154:8000"
            : 'http://localhost:8000'
};

export default econfig;