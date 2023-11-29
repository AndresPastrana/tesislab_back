export var getMinioConfig = function() {
    var endPoint = process.env.MINIO_SERVER_URL;
    var port = process.env.MINIO_SERVER_PORT;
    var accessKey = process.env.MINIO_ACCESS_KEY;
    var secretKey = process.env.MINIO_SECRET_KEY;
    return {
        endPoint: endPoint,
        accessKey: accessKey,
        secretKey: secretKey,
        port: Number(port)
    };
};
export var generateDocUrl = function(param) {
    var bucket_name = param.bucket_name, file_name = param.file_name;
    var api_path = "api/docs-server";
    var host = "http://localhost:3000";
    return "".concat(host, "/").concat(api_path, "?bucket_name=").concat(bucket_name, "&file_name=").concat(file_name);
};
