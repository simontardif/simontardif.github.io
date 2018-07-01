/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/loader/csharploader.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/loader/csharploader.ts":
/*!************************************!*\
  !*** ./src/loader/csharploader.ts ***!
  \************************************/
/*! exports provided: CSharpLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CSharpLoader\", function() { return CSharpLoader; });\n/* harmony import */ var _reflection_assembly__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reflection/assembly */ \"./src/reflection/assembly.ts\");\n\r\nvar CSharpLoader = /** @class */ (function () {\r\n    function CSharpLoader() {\r\n        this._assemblies = {};\r\n        var browserSupportsNativeWebAssembly = typeof WebAssembly !== 'undefined' && WebAssembly.validate;\r\n        var monoRuntimeUrlBase = (browserSupportsNativeWebAssembly ? 'wasm' : 'asmjs');\r\n        this._monoRuntimeScriptUrl = \"./\" + monoRuntimeUrlBase + '/mono.js';\r\n        var loadBclAssemblies = [\r\n            'netstandard',\r\n            'mscorlib',\r\n            'System',\r\n            'System.Core',\r\n            'Newtonsoft.Json',\r\n            'JSharp'\r\n        ];\r\n        this._preloadedAssemblies = (loadBclAssemblies.map(function (name) { return './' + name + '.dll'; }));\r\n        for (var _i = 0, _a = this._preloadedAssemblies; _i < _a.length; _i++) {\r\n            var url = _a[_i];\r\n            var assembly = new _reflection_assembly__WEBPACK_IMPORTED_MODULE_0__[\"Assembly\"](url);\r\n            this._assemblies[url] = assembly;\r\n        }\r\n    }\r\n    CSharpLoader.prototype.initAssemblies = function () {\r\n        window.DotNet = {\r\n            jsCallDispatcher: {\r\n                findJSFunction: function (identifier) {\r\n                    return window[identifier];\r\n                }\r\n            }\r\n        };\r\n        // Create Browser instance\r\n        window.Browser = {\r\n            init: function () { },\r\n            asyncLoad: this.asyncLoad\r\n        };\r\n        var theThis = this;\r\n        //Create Module instance\r\n        window.Module = {\r\n            print: function (line) { console.log(line); },\r\n            printEr: function (line) { console.error(line); },\r\n            locateFile: function (fileName) {\r\n                switch (fileName) {\r\n                    case 'mono.wasm': return './wasm/mono.wasm';\r\n                    case 'mono.asm.js': return './asmjs/mono.asm.js';\r\n                    default: return fileName;\r\n                }\r\n            },\r\n            preloadPlugins: [],\r\n            preRun: [function () {\r\n                    theThis.preloadAssemblies();\r\n                }],\r\n            postRun: [function () {\r\n                    theThis.loadRuntime();\r\n                    for (var property in theThis._assemblies) {\r\n                        if (theThis._assemblies.hasOwnProperty(property)) {\r\n                            theThis._assemblies[property].init();\r\n                        }\r\n                    }\r\n                    if (theThis._onLoaded) {\r\n                        theThis._onLoaded();\r\n                    }\r\n                }]\r\n        };\r\n        var scriptElem = document.createElement('script');\r\n        scriptElem.src = this._monoRuntimeScriptUrl;\r\n        document.body.appendChild(scriptElem);\r\n    };\r\n    Object.defineProperty(CSharpLoader, \"instance\", {\r\n        //#region Public API\r\n        get: function () {\r\n            if (!this._cSharpLoader) {\r\n                this._cSharpLoader = new CSharpLoader();\r\n            }\r\n            return this._cSharpLoader;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    CSharpLoader.prototype.loadAssemblies = function (urls, onLoaded) {\r\n        this._onLoaded = onLoaded;\r\n        var assemblies = [];\r\n        for (var _i = 0, urls_1 = urls; _i < urls_1.length; _i++) {\r\n            var url = urls_1[_i];\r\n            var assembly = new _reflection_assembly__WEBPACK_IMPORTED_MODULE_0__[\"Assembly\"](url);\r\n            assemblies.push(assembly);\r\n            this._assemblies[url] = assembly;\r\n        }\r\n        this.initAssemblies();\r\n        return assemblies;\r\n    };\r\n    CSharpLoader.prototype.getJSharpAssembly = function () {\r\n        for (var property in this._assemblies) {\r\n            if (this._assemblies.hasOwnProperty(property)) {\r\n                var assemblyName = this._assemblies[property].name;\r\n                if (assemblyName === \"JSharp\") {\r\n                    return this._assemblies[property];\r\n                }\r\n            }\r\n        }\r\n        return null;\r\n    };\r\n    //#endregion\r\n    //#region Private Methods\r\n    CSharpLoader.prototype.loadRuntime = function () {\r\n        var load_runtime = Module.cwrap('mono_wasm_load_runtime', null, ['string']);\r\n        load_runtime('appBinDir');\r\n    };\r\n    CSharpLoader.prototype.asyncLoad = function (url, onload, onerror) {\r\n        var xhr = new XMLHttpRequest;\r\n        xhr.open('GET', url, /* async: */ true);\r\n        xhr.responseType = 'arraybuffer';\r\n        xhr.onload = function xhr_onload() {\r\n            if (xhr.status === 200 || xhr.status === 0 && xhr.response) {\r\n                var asm = new Uint8Array(xhr.response);\r\n                onload(asm);\r\n            }\r\n            else {\r\n                onerror(xhr);\r\n            }\r\n        };\r\n        xhr.onerror = onerror;\r\n        xhr.send(null);\r\n    };\r\n    CSharpLoader.prototype.preloadAssemblies = function () {\r\n        Module.FS_createPath('/', 'appBinDir', true, true);\r\n        for (var property in this._assemblies) {\r\n            if (this._assemblies.hasOwnProperty(property)) {\r\n                var assemblyName = this._assemblies[property].name;\r\n                var assemblyUrl = this._assemblies[property].url;\r\n                FS.createPreloadedFile('appBinDir', assemblyName + '.dll', assemblyUrl, true, false, function () {\r\n                }, function onError(err) {\r\n                    throw err;\r\n                });\r\n            }\r\n        }\r\n    };\r\n    return CSharpLoader;\r\n}());\r\n\r\n// Create a global variable in the window scope\r\nvar cSharpLoader = CSharpLoader.instance;\r\nwindow.jsharp = cSharpLoader;\r\n\n\n//# sourceURL=webpack:///./src/loader/csharploader.ts?");

/***/ }),

/***/ "./src/reflection/assembly.ts":
/*!************************************!*\
  !*** ./src/reflection/assembly.ts ***!
  \************************************/
/*! exports provided: Assembly */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Assembly\", function() { return Assembly; });\n/* harmony import */ var _utilities_wasmutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/wasmutils */ \"./src/utilities/wasmutils.ts\");\n/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type */ \"./src/reflection/type.ts\");\n/* harmony import */ var _utilities_reflectionhelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/reflectionhelper */ \"./src/utilities/reflectionhelper.ts\");\n\r\n\r\n\r\nvar Assembly = /** @class */ (function () {\r\n    function Assembly(url) {\r\n        this._url = url;\r\n        this._assemblyName = _utilities_wasmutils__WEBPACK_IMPORTED_MODULE_0__[\"WasmUtils\"].getAssemblyNameFromUrl(url);\r\n        this._isLoaded = false;\r\n    }\r\n    Object.defineProperty(Assembly.prototype, \"name\", {\r\n        get: function () {\r\n            return this._assemblyName;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Assembly.prototype, \"url\", {\r\n        get: function () {\r\n            return this._url;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Assembly.prototype, \"internalAssembly\", {\r\n        get: function () {\r\n            return this._internalAssembly;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Assembly.prototype, \"isLoaded\", {\r\n        get: function () {\r\n            return this._isLoaded;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Assembly.prototype, \"isValid\", {\r\n        get: function () {\r\n            return this._internalAssembly !== 0;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Assembly.prototype.getTypes = function () {\r\n        var types = [];\r\n        var typesString = _utilities_reflectionhelper__WEBPACK_IMPORTED_MODULE_2__[\"ReflectionHelper\"].getAssemblyTypes(this._assemblyName);\r\n        var typesStr = JSON.parse(typesString);\r\n        for (var _i = 0, typesStr_1 = typesStr; _i < typesStr_1.length; _i++) {\r\n            var type = typesStr_1[_i];\r\n            types.push(this.getType(type));\r\n        }\r\n        return types;\r\n    };\r\n    Assembly.prototype.getType = function (typePath) {\r\n        var namespace;\r\n        var typeName;\r\n        var lastDot = typePath.lastIndexOf(\".\");\r\n        if (lastDot !== -1) {\r\n            namespace = typePath.substr(0, lastDot);\r\n            typeName = typePath.substr(lastDot + 1);\r\n        }\r\n        var find_class = Module.cwrap('mono_wasm_assembly_find_class', 'number', ['number', 'string', 'string']);\r\n        var internalType = find_class(this._internalAssembly, namespace, typeName);\r\n        if (internalType === 0) {\r\n            throw new Error(\"Cannot find type '\" + typePath + \"'!\");\r\n        }\r\n        return new _type__WEBPACK_IMPORTED_MODULE_1__[\"Type\"](this, internalType, namespace, typeName, typePath);\r\n    };\r\n    Assembly.prototype.init = function () {\r\n        this._isLoaded = true;\r\n        this._assembly_load = Module.cwrap('mono_wasm_assembly_load', 'number', ['string']);\r\n        this._internalAssembly = this._assembly_load(this._assemblyName);\r\n        if (!this.isValid) {\r\n            throw new Error(\"Invalid Assembly '\" + this._assemblyName + \"'!\");\r\n        }\r\n    };\r\n    return Assembly;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/reflection/assembly.ts?");

/***/ }),

/***/ "./src/reflection/method.ts":
/*!**********************************!*\
  !*** ./src/reflection/method.ts ***!
  \**********************************/
/*! exports provided: Method */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Method\", function() { return Method; });\n/* harmony import */ var _utilities_wasmutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/wasmutils */ \"./src/utilities/wasmutils.ts\");\n\r\nvar Method = /** @class */ (function () {\r\n    function Method(type, internalMethod, name) {\r\n        this._type = type;\r\n        this._name = name;\r\n        this._internalMethod = internalMethod;\r\n    }\r\n    Method.prototype.invoke = function (args) {\r\n        if (args === void 0) { args = null; }\r\n        var stack = Module.stackSave();\r\n        try {\r\n            var resultPtr = this.callMethod(this._internalMethod, null, args);\r\n            return _utilities_wasmutils__WEBPACK_IMPORTED_MODULE_0__[\"WasmUtils\"].dotnetStringToJavaScriptString(resultPtr);\r\n        }\r\n        finally {\r\n            Module.stackRestore(stack);\r\n        }\r\n    };\r\n    Method.prototype.callMethod = function (method, target, args) {\r\n        if (args == null) {\r\n            args = [];\r\n        }\r\n        var stack = Module.stackSave();\r\n        var invoke_method = Module.cwrap('mono_wasm_invoke_method', 'number', ['number', 'number', 'number']);\r\n        try {\r\n            var argsBuffer = Module.stackAlloc(args.length);\r\n            var exceptionFlagManagedInt = Module.stackAlloc(4);\r\n            for (var i = 0; i < args.length; ++i) {\r\n                var argVal = args[i];\r\n                if (typeof argVal === 'number') {\r\n                    var managedInt = Module.stackAlloc(4);\r\n                    Module.setValue(managedInt, argVal, 'i32');\r\n                    Module.setValue(argsBuffer + i * 4, managedInt, 'i32');\r\n                }\r\n                else if (typeof argVal === 'string') {\r\n                    var managedString = _utilities_wasmutils__WEBPACK_IMPORTED_MODULE_0__[\"WasmUtils\"].javaScriptStringToDotNetString(argVal);\r\n                    Module.setValue(argsBuffer + i * 4, managedString, 'i32');\r\n                }\r\n                else {\r\n                    throw new Error('Unsupported arg type: ' + typeof argVal);\r\n                }\r\n            }\r\n            Module.setValue(exceptionFlagManagedInt, 0, 'i32');\r\n            var res = invoke_method(method, target, argsBuffer, exceptionFlagManagedInt);\r\n            if (Module.getValue(exceptionFlagManagedInt, 'i32') !== 0) {\r\n                throw new Error(_utilities_wasmutils__WEBPACK_IMPORTED_MODULE_0__[\"WasmUtils\"].dotnetStringToJavaScriptString(res));\r\n            }\r\n            return res;\r\n        }\r\n        finally {\r\n            Module.stackRestore(stack);\r\n        }\r\n    };\r\n    return Method;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/reflection/method.ts?");

/***/ }),

/***/ "./src/reflection/type.ts":
/*!********************************!*\
  !*** ./src/reflection/type.ts ***!
  \********************************/
/*! exports provided: Type */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Type\", function() { return Type; });\n/* harmony import */ var _method__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./method */ \"./src/reflection/method.ts\");\n\r\nvar Type = /** @class */ (function () {\r\n    function Type(assembly, internalType, namespace, typeName, typePath) {\r\n        this._assembly = assembly;\r\n        this._typePath = typePath;\r\n        this._namespace = namespace;\r\n        this._typeName = typeName;\r\n        this._internalType = internalType;\r\n    }\r\n    Type.prototype.getMethod = function (name) {\r\n        var find_method = Module.cwrap('mono_wasm_assembly_find_method', 'number', ['number', 'string', 'number']);\r\n        var internalMethod = find_method(this._internalType, name, -1);\r\n        if (internalMethod === 0) {\r\n            throw new Error(\"Cannot find method '\" + name + \"'!\");\r\n        }\r\n        return new _method__WEBPACK_IMPORTED_MODULE_0__[\"Method\"](this, internalMethod, name);\r\n    };\r\n    Object.defineProperty(Type.prototype, \"internalType\", {\r\n        get: function () {\r\n            return this._internalType;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Type.prototype, \"isValid\", {\r\n        get: function () {\r\n            return this._internalType !== 0;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    return Type;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/reflection/type.ts?");

/***/ }),

/***/ "./src/utilities/reflectionhelper.ts":
/*!*******************************************!*\
  !*** ./src/utilities/reflectionhelper.ts ***!
  \*******************************************/
/*! exports provided: ReflectionHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ReflectionHelper\", function() { return ReflectionHelper; });\n/* harmony import */ var _loader_csharploader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../loader/csharploader */ \"./src/loader/csharploader.ts\");\n\r\nvar ReflectionHelper = /** @class */ (function () {\r\n    function ReflectionHelper() {\r\n    }\r\n    ReflectionHelper.getAssemblyTypes = function (assemblyName) {\r\n        var jSharpAssembly = _loader_csharploader__WEBPACK_IMPORTED_MODULE_0__[\"CSharpLoader\"].instance.getJSharpAssembly();\r\n        var reflectionType = jSharpAssembly.getType(\"JSharp.Reflection\");\r\n        var assemblyTypesMethod = reflectionType.getMethod(\"GetAssemblyTypes\");\r\n        var types = assemblyTypesMethod.invoke([assemblyName]);\r\n        return types;\r\n    };\r\n    return ReflectionHelper;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/utilities/reflectionhelper.ts?");

/***/ }),

/***/ "./src/utilities/wasmutils.ts":
/*!************************************!*\
  !*** ./src/utilities/wasmutils.ts ***!
  \************************************/
/*! exports provided: WasmUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WasmUtils\", function() { return WasmUtils; });\nvar WasmUtils = /** @class */ (function () {\r\n    function WasmUtils() {\r\n    }\r\n    WasmUtils.getAssemblyNameFromUrl = function (url) {\r\n        var lastSegment = url.substring(url.lastIndexOf('/') + 1);\r\n        var queryStringStartPos = lastSegment.indexOf('?');\r\n        var filename = queryStringStartPos < 0 ? lastSegment : lastSegment.substring(0, queryStringStartPos);\r\n        return filename.replace(/\\.dll$/, '');\r\n    };\r\n    WasmUtils.javaScriptStringToDotNetString = function (javaScriptString) {\r\n        var mono_string = Module.cwrap('mono_wasm_string_from_js', 'number', ['string']);\r\n        return mono_string(javaScriptString);\r\n    };\r\n    ;\r\n    WasmUtils.dotnetStringToJavaScriptString = function (mono_obj) {\r\n        if (mono_obj === 0)\r\n            return null;\r\n        var mono_string_get_utf8 = Module.cwrap('mono_wasm_string_get_utf8', 'number', ['number']);\r\n        var raw = mono_string_get_utf8(mono_obj);\r\n        var res = Module.UTF8ToString(raw);\r\n        Module._free(raw);\r\n        return res;\r\n    };\r\n    ;\r\n    return WasmUtils;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack:///./src/utilities/wasmutils.ts?");

/***/ })

/******/ });