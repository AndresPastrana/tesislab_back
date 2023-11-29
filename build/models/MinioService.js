function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import { allowed_formats } from "../const.js";
import { getMinioConfig } from "../helpers/minio.js";
import { Client } from "minio";
import { Readable } from "stream";
import * as zlib from "zlib";
var MinioService = /*#__PURE__*/ function() {
    "use strict";
    function MinioService(config) {
        _class_call_check(this, MinioService);
        _define_property(this, "minioClient", void 0);
        var defaultConfig = _object_spread_props(_object_spread({}, getMinioConfig()), {
            useSSL: false
        });
        this.minioClient = new Client(_object_spread({}, defaultConfig, config));
    }
    _create_class(MinioService, [
        {
            key: "handleError",
            value: function handleError(operation, error) {
                var err = error;
                throw new Error("Error ".concat(operation, ": ").concat(err.message));
            }
        },
        {
            key: "validateDocumentFormat",
            value: // Function to validate the docs format
            function validateDocumentFormat(fileName) {
                var _fileName_split_pop;
                var fileExtension = (_fileName_split_pop = fileName.split(".").pop()) === null || _fileName_split_pop === void 0 ? void 0 : _fileName_split_pop.toLowerCase();
                if (!fileExtension || !allowed_formats.includes(fileExtension)) {
                    throw new Error("Invalid document format. Allowed formats: ".concat(allowed_formats.join(", ")));
                }
            }
        },
        {
            key: "readFile",
            value: // Convert a File object to a buufer
            function readFile(file) {
                var _this = this;
                return _async_to_generator(function() {
                    var arrayBuffer, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    file.arrayBuffer()
                                ];
                            case 1:
                                arrayBuffer = _state.sent();
                                return [
                                    2,
                                    Buffer.from(arrayBuffer)
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    _this.handleError("reading file content", error)
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "compressDocument",
            value: // Function to compress a buffer
            function compressDocument(buffer) {
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            new Promise(function(resolve, reject) {
                                var zlibStream = zlib.createDeflate();
                                var readable = Readable.from([
                                    buffer
                                ]);
                                readable.pipe(zlibStream);
                                var chunks = [];
                                zlibStream.on("data", function(chunk) {
                                    return chunks.push(chunk);
                                });
                                zlibStream.on("end", function() {
                                    return resolve(Buffer.concat(chunks));
                                });
                                zlibStream.on("error", function(error) {
                                    return reject(new Error("Error compressing document: ".concat(error.message)));
                                });
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "insertDocument",
            value: // Functioo to updload a document
            function insertDocument(bucketName, fileName, file, metadata) {
                var _this = this;
                return _async_to_generator(function() {
                    var fileBuffer, metadata, _getMinioConfig, endPoint, useSSL, port, fileURL, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    3,
                                    ,
                                    4
                                ]);
                                // Validate the document format
                                _this.validateDocumentFormat(file.name);
                                return [
                                    4,
                                    _this.readFile(file)
                                ];
                            case 1:
                                fileBuffer = _state.sent();
                                //Create Metadata
                                metadata = {
                                    "Content-Type": file.type
                                };
                                // Compress the document using zlib
                                // const compressedBuffer = await this.compressDocument(fileBuffer);
                                // Upload the document
                                return [
                                    4,
                                    _this.minioClient.putObject(bucketName, fileName, fileBuffer, metadata)
                                ];
                            case 2:
                                _state.sent();
                                _getMinioConfig = getMinioConfig(), endPoint = _getMinioConfig.endPoint, useSSL = _getMinioConfig.useSSL, port = _getMinioConfig.port;
                                // Generate and return the download URL
                                fileURL = "".concat(useSSL ? "https" : "http", "//").concat(endPoint, ":").concat(port, "/").concat(bucketName, "/").concat(fileName);
                                return [
                                    2,
                                    fileURL
                                ];
                            case 3:
                                error = _state.sent();
                                _this.handleError("inserting document", error);
                                return [
                                    3,
                                    4
                                ];
                            case 4:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "listBuckets",
            value: function listBuckets() {
                var _this = this;
                return _async_to_generator(function() {
                    var buckets, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.minioClient.listBuckets()
                                ];
                            case 1:
                                buckets = _state.sent();
                                return [
                                    2,
                                    buckets.map(function(bucket) {
                                        return bucket.name;
                                    })
                                ];
                            case 2:
                                error = _state.sent();
                                _this.handleError("listing buckets", error);
                                return [
                                    3,
                                    3
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "uploadFile",
            value: function uploadFile(bucketName, fileName, filePath) {
                var _this = this;
                return _async_to_generator(function() {
                    var error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.minioClient.fPutObject(bucketName, fileName, filePath, {})
                                ];
                            case 1:
                                _state.sent();
                                return [
                                    3,
                                    3
                                ];
                            case 2:
                                error = _state.sent();
                                _this.handleError("uploading file", error);
                                return [
                                    3,
                                    3
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getFile",
            value: function getFile(bucketName, fileName) {
                var _this = this;
                return _async_to_generator(function() {
                    var fileStream, chunks, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.minioClient.getObject(bucketName, fileName)
                                ];
                            case 1:
                                fileStream = _state.sent();
                                chunks = [];
                                return [
                                    2,
                                    new Promise(function(resolve, reject) {
                                        fileStream.on("data", function(chunk) {
                                            return chunks.push(chunk);
                                        });
                                        fileStream.on("end", function() {
                                            return resolve(Buffer.concat(chunks));
                                        });
                                        fileStream.on("error", function(error) {
                                            return reject(error);
                                        });
                                    })
                                ];
                            case 2:
                                error = _state.sent();
                                _this.handleError("getting file", error);
                                return [
                                    3,
                                    3
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getFiles",
            value: function getFiles(bucketName) {
                var _this = this;
                return _async_to_generator(function() {
                    var files;
                    return _ts_generator(this, function(_state) {
                        try {
                            files = _this.minioClient.listObjects(bucketName, "", true);
                            return [
                                2,
                                files
                            ];
                        } catch (error) {
                            _this.handleError("getting files", error);
                        }
                        return [
                            2
                        ];
                    });
                })();
            }
        }
    ], [
        {
            key: "getInstance",
            value: function getInstance(config) {
                if (!MinioService.instance) {
                    MinioService.instance = new MinioService(config);
                }
                return MinioService.instance;
            }
        }
    ]);
    return MinioService;
}();
_define_property(MinioService, "instance", void 0);
export { MinioService as default };
